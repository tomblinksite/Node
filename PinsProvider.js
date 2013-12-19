PinsProvider = function(databaseUrl, collections) {
	this.db = require("mongojs").connect(databaseUrl, collections);
};

PinsProvider.prototype.findAll = function(callback) {
	
	this.db.pins.find().sort({ time:-1 }, function(err, pins) {
	  if( err ) console.log('ERROR: '+err);
	  else callback(null, pins)
	});
	
};

PinsProvider.prototype.save = function(coords, callback) {
   
   console.log('saving THIS RECORD: '+coords.coordID);
   
   this.db.pins.save({coordID: coords.coordID, longCord: coords.longCord, latCord: coords.latCord, live: "false"}, function(err, coords) {
   		if( err ) console.log('ERROR: '+err);
   		else callback(null, coords)
    });
   
};

PinsProvider.prototype.update = function(coords, callback) {
	
	console.log('Updating THIS RECORD: '+coords.coordID);
	
	this.db.pins.update( { coordID: coords.coordID }, { longCord: coords.longCord, latCord: coords.latCord, live: "false" }, true, function(err, coords){
		if( err ) console.log('ERROR: '+err);
		else callback(null, coords); console.log('cords id: '+coords.coordID)
	});

};

PinsProvider.prototype.deleteAll = function(callback) {
	
	this.db.pins.remove()
	
};


exports.PinsProvider = PinsProvider;