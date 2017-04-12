var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

app.use('/mongo_express', mongo_express(mongo_express_config));

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());

// Support receiving JSON in HTTP request bodies
// app.use(bodyParser.json());

app.use(express.static('../client/build'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/CrimsonEagle';

MongoClient.connect(url, function (err, db){
	if(err){
		console.log('Cannot connect: ', err);
	}else{
		console.log('Connected to database', url);

		function getTotalWritesLifetime(server, callback){
			db.collection(server).find({}, {from : 1, to : 1, totalWriteIOsHistVlun : 1}, function (err, data){
				if(err){
					return callback(err)
				}else if(data === null){
					return callback(null,null)
				}
				data.toArray().then(function (data){
					callback(null, data)
				}).catch(function(err){
					callback(null, err)
				})
			})
		}



		app.get('/squidboy/totalWrites', function(req, res){//Doesn't resolve server name because there's only one server :^)
				getTotalWritesLifetime('squidboy',function(err, data){
					if(err){
						res.status(500).send('Database error: ' + err)
					}else if(data === null){
						res.status(400).send('Couldn\'t find squidboy')
					}
					res.send(data);
				})
		})

		app.listen(3000, function() {
				console.log('Listening on port 3000!');
		})
	}
});
