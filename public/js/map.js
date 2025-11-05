let map;
let marker;
let geocoder;

document.addEventListener("shown.bs.modal", (event) => {
  if (event.target.id === "mapModal") {
    const mapAddressDiv = document.getElementById("mapAddressDiv");

    // If the map hasn't been created yet, make it using the address and implement the marker
    if (!map) {
      map = new google.maps.Map(mapAddressDiv, {
        zoom: 14,
        center: { lat: 51.5072, lng: -0.1276 }, // fallback: London
      });

      marker = new google.maps.Marker({
        map: map,
      });
    }

    // Creates geocoder 
    if (!geocoder) geocoder = new google.maps.Geocoder();
    const address = mapAddressDiv.dataset.address;
    // Now geocode the address to get its coordinates
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        marker.setPosition(location);
      } else {
        console.error("Geocode failed:", status);
        alert("Could not find location for this address.");
      }
    });

    // Force resize and recenter when modal opens
    google.maps.event.trigger(map, "resize");
  }
});
