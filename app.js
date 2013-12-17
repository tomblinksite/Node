var express = require('express'),
	io = require('socket.io'),
	http = require('http'),
	twitter = require('ntwitter'),
	cronJob = require('cron').CronJob,
	_ = require('underscore'),
	path = require('path');
var app = express();
var server = http.createServer(app);
var sockets = io.listen(server);
var watchSymbols = ['#yorkshire', '#Leeds', '#Sheffield', '#york', '#UK', '#England','#huddersfield','#harrogate','#hull','#ripon','#Northern'];
var watchList = {
	total:0,
	symbols: []
};



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
	response.render('index.html',{data:watchList});
});



sockets.sockets.on('connection', function(socket) {
	socket.emit('data', watchList);
});




var t = new twitter ({
	consumer_key: 'sZYUfMsDlUMmRfwDPkhIw',
    consumer_secret: 'tBxylNtEY39PJ2pzKJg563V8S8qs7QsdCd8x4Ic0',
    access_token_key: '25178393-gONIDJnHioZmdRde8cr4TdP7RBaeaWQ1sSewDOJTa',
    access_token_secret: 'TSF3xIMpbMkLr6q1mY9ygvxOaqM0Bbpyfe9Ih9Cfa7mpi'
});


function checkCoords(tweet) {
	console.log(tweet.geo.coordinates);
	var x = tweet.geo.coordinates[0];
	var y = tweet.geo.coordinates[1];
	if( 53.3439 <= x && x <= 54.5582 && -2.9823 <= y && y <= 0.2471 ) {
	    return 1;
	}
}
					      
//t.stream('statuses/filter', {locations:'-3.070,53.30,0.30,54.58'},function(stream) {
t.stream('statuses/filter', { track: watchSymbols}, function(stream) {
	stream.on('data', function(tweet) {
		
		console.log(tweet.created_at);
		
		if(tweet.geo) {
						
			var claimed = false;
			
			if(checkCoords(tweet) == 1) {
				console.log('FOUND TWEET '+tweet.text);
				if(tweet.text !== undefined) {
					var text = tweet.text.toLowerCase();
					
					_.each(watchSymbols, function(v) {
				          if (text.indexOf(v.toLowerCase()) !== -1) {
				              watchList.symbols.push(tweet.geo.coordinates);
				              claimed = true;
				          }
				      });
				      
				      if (claimed) {
				          watchList.total++;
				          sockets.sockets.emit('data', watchList);
				      }
				}
			}
					
		}
		
	});
});
 


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});