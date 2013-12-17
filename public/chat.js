$(function() {
    
    var socket = io.connect(window.location.hostname);
    socket.on('data', function(data) {
        
        var total = data.total;
        for (var i=0;i<data.symbols.length;i++) {
            var val = data.symbols[i];
            $('#map').append(val+'<br/>');
        }
     
    });
    
        
    
   /* var citymap = {};
	citymap['chicago'] = {
	  center: new google.maps.LatLng(41.878113, -87.629798),
	  population: 100
	};
	citymap['amsterdam'] = {
	  center: new google.maps.LatLng(52.878113, 5.629798),
	  population: 40
	};
	citymap['paris'] = {
	  center: new google.maps.LatLng(48.9021449, 2.4699208),
	  population: 100
	};
	citymap['moscow'] = {
	  center: new google.maps.LatLng(56.021369, 37.9650909),
	  population: 100
	};
	citymap['newyork'] = {
	  center: new google.maps.LatLng(40.9152414, -73.70027209999999),
	  population: 80
	};
	citymap['losangeles'] = {
	  center: new google.maps.LatLng(34.3373061, -118.1552891),
	  population: 65
	}
	
	for (var city in citymap) {
	    var populationOptions = {
	        strokeColor: "#900057",
	        strokeOpacity: 1,
	        strokeWeight: 1,
	        fillColor: "#900057",
	        fillOpacity: 0.35,
	        map: map,
	        clickable: false,
	        center: citymap[city].center,
	        radius: citymap[city].population * 2000
	    };
	    cityCircle = new google.maps.Circle(populationOptions);
	}*/
    
})