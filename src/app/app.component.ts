import { Component, OnInit } from '@angular/core';
declare const L:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const LatLong = [coords.latitude,coords.longitude];
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      let mymap = L.map('map').setView(LatLong,13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiYW1hbGFyIiwiYSI6ImNrejJheTFzazBtaWoycHBxNHM1NnU5MWwifQ.UiAMDyQHq4Wt16OkRybDug}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
let marker = L.marker(LatLong).addTo(mymap);
  marker.bindPopup("<b>Current Location </b>").openPopup();
//   let littleton:any = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
//   let denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
//   let aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
//   let golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
//   var cities = L.layerGroup([littleton, denver, aurora, golden]);


//    let grayscale = L.tileLayer( {id: 'MapID', tileSize: 512, zoomOffset: -1, });
//   let   streets   = L.tileLayer( {id: 'MapID', tileSize: 512, zoomOffset: -1,});

// var map = L.map('map', {
//     center: [39.73, -104.99],
//     zoom: 10,
//     layers: [grayscale, cities]
// });
// var baseMaps:any = {
//   "Grayscale": grayscale,
//   "Streets": streets
// };

// var overlayMaps = {
//   "Cities": cities
// };
// L.control.layers(baseMaps, overlayMaps).addTo(map);
    })

    this.watchPosition();
  }
  watchPosition() {
    navigator.geolocation.watchPosition((position) => {
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`)
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0
    })
  }
}
