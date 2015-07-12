var currentLocation;
var directionsDisplay;
var directionsService;
var map;
var school = new google.maps.LatLng(52.384981, 4.905202);

function onLoad() {
	document.addEventListener("deviceready", deviceReady, false);
}

function deviceReady() {
	
	var options = { enableHighAccuracy: true };
	
	directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	
	var mapOptions = {
    	zoom:14,
    	center: school
  	};
  	map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  	directionsDisplay.setMap(map);
	
	alert("In deviceReady() \n current location: " + currentLocation + "\n" + 
		  "destination: " 	   + school);
	
	calcRoute();
}// end deviceReady();

function onSuccess(position) {
	alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
	
	setCurrentPosition(position.coords.latitude, position.coords.longitude);
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function setCurrentPosition(lat, lon) {
	currentLocation = new google.maps.LatLng(lat, lon);
	
	alert("In set \n current location: " + currentLocation + "\n" + 
		  "destination: " 	   + school);
}

function calcRoute() {
	alert("in calcRoute \n current location: " + currentLocation + "\n" + 
		  "destination: " 	   + school);
	
  	var start = currentLocation;
  	var end = school;
  	var request = {
      	origin:start,
      	destination:end,
      	travelMode: google.maps.TravelMode.BICYCLING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
    		directionsDisplay.setPanel(document.getElementById("mapCanvas"));
      		directionsDisplay.setDirections(response);
    	}
  	});
}