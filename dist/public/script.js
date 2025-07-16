const socket = io();
const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=kkXA2icqeH8jsEhb4cQp",
  center: [78, 20],
  zoom: 5,
});
const userMarkers = {};
navigator.geolocation.watchPosition(
  (position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    if (!userMarkers["self"]) {
      const img = document.createElement("img");
      img.src = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
      img.style.width = "30px";
      img.style.height = "30px";
      userMarkers["self"] = new maplibregl.Marker(img)
        .setLngLat([coords.lng, coords.lat])
        .addTo(map);
      map.setCenter([coords.lng, coords.lat]);
      map.setZoom(15);
    } else {
      userMarkers["self"].setLngLat([coords.lng, coords.lat]).addTo(map);
    }
    socket.emit("location-update", coords);
  },
  (error) => {
    console.error("Location error:", error);
    alert("Please allow location access.");
  },
  { enableHighAccuracy: true }
);
socket.on("user-moved", ({ id, coords }) => {
  if (!userMarkers[id]) {
    const img = document.createElement("img");
    img.src = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
    img.style.width = "30px";
    img.style.height = "30px";
    userMarkers[id] = new maplibregl.Marker(img)
      .setLngLat([coords.lng, coords.lat])
      .setPopup(new maplibregl.Popup().setText(`User ${id}`))
      .addTo(map);
  } else {
    userMarkers[id].setLngLat([coords.lng, coords.lat]);
  }
});
socket.on("user-disconnected", (id) => {
  if (userMarkers[id]) {
    userMarkers[id].remove();
    delete userMarkers[id];
  }
});
