var fs = require('fs')
var csv = require('csvtojson')


var ObjectID = require('mongodb').ObjectID;
var databaseName = 'CrimsonEagle';

var paths = ['./squidboy.csv', './summary.csv']
var names = ['squidboy', 'summary']


if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://localhost:27017/' + databaseName

  function addCSV(path, name, db, cb){
      fs.readFile(path, function(err, data){
          if (err) {
              return console.error(err)
          }
          csv().fromFile(path).on('json',(objects)=>{
              db.collection(name).insert(objects, function(){
                  console.log("inserted  " + name)
              })
          }).on('done',(err)=>{
              if (err) {
                  return console.error(err)
              }
              cb()
          })
      })
  }

  function loadFiles(paths, names, db, cb){
      var i = 0;

      function processNextCSV() {
          if (i < paths.length) {
              // This is SO DIRTY Tim Richards.
              addCSV(paths[i], names[i], db, processNextCSV)
              i++
          }else{
              cb()
          }
      }
      
      processNextCSV()
  }


  MongoClient.connect(url, function(err, db) {
      db.dropDatabase(function(err){
          if (err) {
              return console.error(err)
          }
          db.close()
          MongoClient.connect(url, function(err, db) {
              if (err) {
                  throw new Error('Could not connect to database: ' + err)
              } else {
                  loadFiles(paths, names, db, function(){
                      console.log('loaded all files into database.')
                      db.close()
                  })
              }
          })
      })
  })


} else {
    // require()'d.  Export the function.
    module.exports = reset
}
