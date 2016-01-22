
var map = L.map('map').setView([51.5, 10.5], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3JsZXNzIiwiYSI6ImNpaXg4cGt2cTAwMGh2Mm01ZDlqYnk5N28ifQ.EDKxdytV0xTiHyI16K0zsg', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(map);

var markers = L.markerClusterGroup();

map.addLayer(markers);


$.get("datasets/reisezentren/VSRz201601.csv", function(text) {
	csv2geojson.csv2geojson(text, {
		latfield: 'Lat',
		lonfield: 'Lon',
		delimiter: ';'
	}, function(err, data) {
		var features = data.features;

	for (var index = 0; index < features.length; index++)
	{
		var feature = features[index];
		if (feature.geometry)
		{
			var popupText = feature.properties["Name 1"];
			var icon = L.AwesomeMarkers.icon({ prefix: 'fa', icon: 'train', markerColor: 'red'});
			var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {icon: icon}).bindPopup(popupText);
			markers.addLayer(marker);
		}
	}

	});
});



/*
$.getJSON("http://api.aufzugswaechter.org/facilities", function(features) {
});

var showSubscribeModal = function(equipmentnumber)
{
	$.getJSON("http://api.aufzugswaechter.org/facilities/" + equipmentnumber, function(feature) {
		$("#subscribe-stationName").text(feature.properties.stationname);
		$("#subscribe-facilityDescription").text(feature.properties.facilityDescription);
		$("#subscribe-facilityEquipmentnumber").val(feature.properties.facilityEquipmentnumber);
	});

	$("#subscribeModal").modal("show");
	//$(".navbar-collapse.in").collapse("hide");
	return false;
}

var subscribe = function()
{
	var equipmentnumber = $("#subscribe-facilityEquipmentnumber").val();
	var email = $("#subscribe-email").val();
	var grecaptchaResponse = grecaptcha.getResponse();
	grecaptcha.reset();
	$.ajax({
		type: "PUT",
		url: "http://api.aufzugswaechter.org/facilities/" + equipmentnumber + "/subscriptions/email/" + encodeURIComponent(email) + "/?token=" + encodeURIComponent(grecaptchaResponse),
		contentType: "application/json"});
	$("#subscribeModal").modal("hide");
	return false;
}

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
*/