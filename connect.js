var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('grandepart', new mongo.Server(host, port, {}), {});

db.createCollection("test", function(err, collection){
    collection.insert({"test":"value"});
});

/*MongoClient.connect('mongodb://localhost:8080', function(err, db) {
  if(err) throw err;
  console.log("Connected to Database");
})

var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, {}), {});

db.open(function(err,db) {
  db.collection('users', function(err,collection) {
    collection.insert({username:'Bilbo',firstname:'Shilbo'}, function(err, docs) {
      console.log(docs);
      db.close();
    });
  });
})*/