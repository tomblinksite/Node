$(function() {
	var map;
    var citymap = {};
    var cityCircle;
    var heatmapData = [];
    
	var socket = io.connect(window.location.hostname);
    socket.on('data', function(data) {
        
        var total = data.total;
        heatmapData = [];
        for (var i=0;i<data.symbols.length;i++) {
            var val = data.symbols[i];
            //$('#content').append(val+'<br/>');
           // heatmapData.push({location: new google.maps.LatLng(val[0], val[1]), weight: 0.5});
           // setHeatMap();
           heatmapData.push(val);
           addCircles();
        }
     
    });
    
    
    function initialize() {
    	
      var myOptions = {
      center: new google.maps.LatLng(53.82320, -1.57702),
      zoom: 8,
      styles: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            stylers: [{
                visibility: "on"
            }, {
                color: "#bfbfbf"
            }]
        }, {
            featureType: "landscape",
            stylers: [{
                visibility: "on"
            }, {
                color: "#e5e3df"
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
       
       map = new google.maps.Map(document.getElementById("map"), myOptions);
              
     }
     window.onload= initialize;
     
     function addCircles() {
     	
	     for (var i = 0; i < heatmapData.length; i++) {
		    var latLng = new google.maps.LatLng(heatmapData[i][0],heatmapData[i][1]);
		    var marker = new google.maps.Marker({
		      position: latLng,
		      map: map,
		      icon: getCircle(0.1)
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