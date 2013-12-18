$(function() {
	var map;
    var citymap = {};
    var cityCircle;
  
    var heatmapData = [];
    
	var socket = io.connect(window.location.hostname);
    socket.on('data', function(data) {
        
        //heatmapData = [];
        //heatmapData.push(val);
       
       
        console.log(data);
        if(data) {
	         addSingleCircle(data);
        }
       
        /*
        var total = data.total;
        for (var i=0;i<data.symbols.length;i++) {
            var val = data.symbols[i];
           heatmapData.push(val);
           addCircles();
        }*/
     
    });
    
    
    function initialize() {
    	
      var myOptions = {
      center: new google.maps.LatLng(53.82320, -1.57702),
      zoom: 9,
      styles: [
        {featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},
        {featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},
        {featureType:"road.highway",stylers:[{saturation:-100},{lightness:70},{visibility:"simplified"}]},
        {featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},
        {featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},
        {featureType:"transit",stylers:[{saturation:-100}]},
        {featureType:"road.local",elementType:"labels", stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},
        {featureType:"water",elementType:"labels", stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},
        {featureType:"water",elementType:"geometry", stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}
        ],
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
       
       map = new google.maps.Map(document.getElementById("map"), myOptions);
              
     }
     window.onload= initialize;
     
     function addSingleCircle(coords) {
	     
	    var latLng = new google.maps.LatLng(coords[0],coords[1]);
	    var marker = new google.maps.Marker({
	      position: latLng,
	      animation: google.maps.Animation.DROP,
	      map: map,
	      icon: 'blue-marker.png'
	    });
		 
     }
     
     function addCircles() {
     	
	     for (var i = 0; i < heatmapData.length; i++) {
		    var latLng = new google.maps.LatLng(heatmapData[i][0],heatmapData[i][1]);
		    var marker = new google.maps.Marker({
		      position: latLng,
		      animation: google.maps.Animation.DROP,
		      map: map,
		      icon: 'blue-marker.png'
		      /*icon: getCircle(0.1)*/
		    });
		  }
     }
     
     function getCircle(magnitude) {
	  return {
	    path: google.maps.SymbolPath.CIRCLE,
	    fillColor: 'red',
	    fillOpacity: .02,
	    scale: 10,
	    strokeColor: 'red',
	    strokeWeight: .5
	  };
	}
     
     function setHeatMap() {
	    var heatmap = new google.maps.visualization.HeatmapLayer({
		  data: heatmapData,
		  radius: 20
		});
		heatmap.setMap(map);
     }
     
     function addCircle() {
	   for (var city in citymap) {
        var populationOptions = {
	      strokeColor: '#FF0000',
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: '#FF0000',
	      fillOpacity: 0.35,
	      map: map,
	      center: citymap[city].center,
	      radius: 2000
	    };
	    cityCircle = new google.maps.Circle(populationOptions);
	  }
     }
     	
})