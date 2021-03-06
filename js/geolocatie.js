var currentLocation;
var directionsDisplay;
var directionsService;
var map;
var school = new google.maps.LatLng(52.384981, 4.905202);

google.maps.event.addDomListener(window, 'load', onLoad);

function onLoad() {
	document.addEventListener("deviceready", deviceReady, false);
}

function deviceReady() {
	var options = { enableHighAccuracy: true }
	
	directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
	
	var mapOptions = {
    	zoom:14,
    	center: school
  	};
  	map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  	directionsDisplay.setMap(map);
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}// end deviceReady();

function onSuccess(position) {
	//setCurrentPosition(position.coords.latitude, position.coords.longitude);
	currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	calcRoute();
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function setCurrentPosition(lat, lon) {
	currentLocation = new google.maps.LatLng(lat, lon);
	calcRoute();
}

function calcRoute() {
  	var start = currentLocation;
  	var end = school;
  	var request = {
      	origin:start,
      	destination:end,
      	travelMode: google.maps.TravelMode.BICYCLING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
    	}
  	});
}