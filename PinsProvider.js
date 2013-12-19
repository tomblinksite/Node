PinsProvider = function(databaseUrl, collections) {
	this.db = require("mongojs").connect(databaseUrl, collections);
};

PinsProvider.prototype.findAll = function(callback) {
	
	this.db.pins.find().limit(10).sort({ time:-1 }, function(err, pins) {
	  if( err || !pins) console.log("No pins found");
	  callback(null, pins)
	});
	
};

PinsProvider.prototype.save = function(coords, callback) {
   
   console.log('Saving this object: '+coords.longCord);
   
   this.db.pins.save({longCord: coords.longCord, latCord: coords.latCord, live: "true"}, function(err, coords) {
   		if( err || !coords ) console.log("Pin not saved");
   		else callback(null, coords) console.log("Pin saved")
    });
   
};

exports.PinsProvider = PinsProvider;