fs = require('fs')
var csv = require('csv')


var ObjectID = require('mongodb').ObjectID;
var databaseName = "CrimsonEagle";


if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;


  MongoClient.connect(url, function(err, db) {
      if (err) {
          throw new Error("Could not connect to database: " + err);
      } else {
          fs.readFile('./summary.csv', function (err, data) {
              if (err) {
                  return console.error(err);
              }
              csv.parse(data, function(err, objects){
                  if (err) {
                      return console.error(err);
                  }
                  db.collection("summary").insert(objects, function(err){
                      console.log("Reset!");
                      db.close()
                  });
              });
          });
      }
  });


} else {
    // require()'d.  Export the function.
    module.exports = resetDatabase;
}
