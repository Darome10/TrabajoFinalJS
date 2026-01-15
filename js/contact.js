// ************************************************************************************************************************* MAPA *****************************************************************************************************************************//

let options ={
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options);
} else{
    alert("Los servicios de geolocalización no están disponibles");
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map').setView([latitude, longitude], 14);  

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'By David Rodriguez © OpenStreetMap contributors'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(41.655760, -0.910178)
        ],
        language: 'es',
    }).addTo(map);

    L.marker([41.655760, -0.910178]).addTo(map)
    .bindPopup('Nos puedes encontrar en Avenida de Navarra 93, Zaragoza.')
    
}

function error(error){
    let map = L.map('map').setView([41.655760, -0.910178], 14);  

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'By David Rodriguez © OpenStreetMap contributors'
    }).addTo(map);
    console.log(error.code, error.message);
}

