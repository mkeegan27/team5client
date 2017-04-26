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

		function getTotalDataLifetime(server, property, callback){
			var query = {};
			query["from"] =1;
			query["to"] =1;
			query[property] =1;
			db.collection(server).find({}, query, function (err, data){
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

		function resolveCompanyServers(name, callback){
			var query = {};
			query["system_companyName"] = name;
			db.collection("summary").find({}, query, function (err, data){
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

		app.get('/', function(req, res){
			res.sendFile('index.html', { root: __dirname + "/../../client/build" } );
		});


		app.get('/company/:name', function (req, res)){
			var name = req.params.name;
			resolveCompanyServers(name, function(err, data){
				if(err){
					res.status(500).send('Database error: ' + err)
				}else if(data === null){
					res.status(400).send('Couldn\'t find ' + name)
				}
				res.send(data);
			})
		}


		app.get('/sys/:sysid/prop/:propid', function(req, res){//Doesn't resolve server name because there's only one server :^)
				var sysid = req.params.sysid;
				var propid = req.params.propid;
							//  W :)
				getTotalDataLifetime(sysid, propid, function(err, data){
					if(err){
						res.status(500).send('Database error: ' + err)
					}else if(data === null){
						res.status(400).send('Couldn\'t find squidboy')
					}
					res.send(data);
				})
		})

		app.listen(80, function() {
				console.log('Listening on port 80!');
		})
	}
});
