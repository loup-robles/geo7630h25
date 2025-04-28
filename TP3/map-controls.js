// map-controls.js 
var nav = new maplibregl.NavigationControl({
    showCompass: true,
    showZoom: true,
    visualizePitch: true
});
map.addControl(nav, 'top-right');

// Control de geolocalisation
var geolocateControl = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
});
map.addControl(geolocateControl, 'bottom-right');

// Control de l'échelle
var scale = new maplibregl.ScaleControl({ unit: 'metric' });
map.addControl(scale);