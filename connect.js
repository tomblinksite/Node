var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:8080', function(err, db) {
  if(err) throw err;
  console.log("Connected to Database");
})