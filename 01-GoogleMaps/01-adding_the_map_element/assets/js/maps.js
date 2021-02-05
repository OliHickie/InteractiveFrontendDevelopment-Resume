function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3, // set what zoom level for the map
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    var locations = [
        { lat: 40.785091, lng: -73.968285 }, // Objects for each
        { lat: 41.084045, lng: -73.874245 }, // destination marker, in an
        { lat: 40.754932, lng: -73.984016 }  // array
    ];

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        }); // labels ref the string above. i % labels.length means that once we get to z it will loop back to A again.
    });

    new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // Code taken from google maps docs to create markers and a cluster if they are close together.
    });
}
