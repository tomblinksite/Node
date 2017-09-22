var express = require('express'),
	io = require('socket.io'),
	http = require('http'),
	twitter = require('ntwitter'),
	cronJob = require('cron').CronJob,
	_ = require('underscore'),
	path = require('path'),
	gm = require('googlemaps'),
	util = require('util'),
	app = express(),
	server = http.createServer(app),
	sockets = io.listen(server),
	PinsProvider = require('./PinsProvider').PinsProvider;

var coordID = 0;

var pinsProvider = new PinsProvider('localhost:27017/pins', ["pins"]);


var t = new twitter ({
	consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});


var watchSymbols = ['#yorkshire', '#Leeds', '#Sheffield', '#york', '#UK', '#England','#huddersfield','#harrogate','#hull','#ripon','#Northern','#christmas','#xmas','#weather','#win'];


var watchList = {
	total:0,
	symbols: []
};


var watchListNew = [];

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'components')));
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', function(request, response) {
	
	pinsProvider.findAll(function(error, pins){
		watchListNew = pins;
		console.log('Found: '+pins.length+' pins');
	    response.render('page',{data:pins});
	});

});

app.get('/delete', function(request, response) {

	pinsProvider.deleteAll(function(error, pins){
		watchListNew = pins;
		console.log('Found: '+pins.length+' pins');
	    response.render('delete',{data:pins});
	});
	
});

sockets.sockets.on('connection', function(socket) {
	socket.emit('data', watchListNew);
});

					      
t.stream('statuses/filter', { track: watchSymbols}, function(stream) {
	stream.on('data', function(tweet) {
				
		if(tweet.geo) {
						
			var claimed = false;
			
			//if(checkCoords(tweet) == 1) {
				
				console.log('FOUND TWEET '+tweet.text);
				
				if(tweet.text !== undefined) {
					var text = tweet.text.toLowerCase();
					
					_.each(watchSymbols, function(v) {
				          if (text.indexOf(v.toLowerCase()) !== -1) {
				            
				            var newCoordOjb = {
					            coordID: coordID,
					            longCord: tweet.geo.coordinates[0],
					            latCord: tweet.geo.coordinates[1]
				            }
				           
				            pinsProvider.update(newCoordOjb, function( error, coordObj) {
						        watchListNew = [];
						        watchListNew.push(coordObj);
						        sockets.sockets.emit('data', watchListNew);
						        console.log('Updated coordID: '+coordObj.coordID);
						        if(coordID>20) { coordID = 0; } else { coordID ++; }
						    });
						    
						    /*
						    pinsProvider.save(newCoordOjb, function( error, coordObj) {
						        watchListNew = [];
						        watchListNew.push(coordObj);
						        sockets.sockets.emit('data', watchListNew);
						        console.log('Saving coordID: '+coordObj.coordID);
						        if(coordID>20) { coordID = 0; } else { coordID ++; }
						    });
						   */
				          }
				     });
				      
				}
			//}
					
		}
		
	});
});

function checkCoords(tweet) {
	console.log(tweet.geo.coordinates);
	var x = tweet.geo.coordinates[0];
	var y = tweet.geo.coordinates[1];
	if( 53.3439 <= x && x <= 54.5582 && -2.9823 <= y && y <= 0.2471 ) {
	    return 1;
	}
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
