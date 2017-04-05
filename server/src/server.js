var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/CrimsonEagle';

MongoClient.connect(url, function (err, db){
	if(err){
		console.log('Cannot connect: ', err);
	}else{
		console.log('We\'re in like sin', url);




		db.close();
	}
});
