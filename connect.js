//var databaseUrl = "localhost:27017/pins";
//var collections = ["pins"];
//var db = require("mongojs").connect(databaseUrl, collections);


pinsProvider = function(databaseUrl, collections) {
	this.db = require("mongojs").connect(databaseUrl, collections);
};


pinsProvider.prototype.findAll = function(callback) {
	
	this.db.pins.find().limit(10).sort({ time:-1 }, function(err, pins) {
	  if( err || !pins) console.log("No pins found");
	  console.log(pins);
	  callback(null, pins)
	  /*else pins.forEach( function(pin) {
	    var cords = [];
	    cords.push(pin.longCord);
	    cords.push(pin.latCord);
	    watchListNew.push(cords);
	  });*/
	});
	
};


/*
db.pins.find().limit(10).sort({ time:-1 }, function(err, pins) {
  if( err || !pins) console.log("No pins found");
  else pins.forEach( function(pin) {
    var cords = [];
    cords.push(pin.longCord);
    cords.push(pin.latCord);
    watchListNew.push(cords);
  });
});
*/

exports.pinsProvider = pinsProvider;