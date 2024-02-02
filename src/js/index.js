import '../styles/style.css';
import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../images/icon-location-2.svg";

import { getAddress, addOffSet, addTileLayer, validateIp } from "./helpers";

document.querySelector("#app").innerHTML = `
<div class="finder">
<h1 class="title">IP Tracker</h1>
<div class="search-bar">
  <input
    type="text"
    class="search-bar__input"
    placeholder="Search for any IP address"
  />
  <button class="search-bar__btn"></button>
</div>

<div class="info">
  <div class="info__block">
    <div class="info__block-subtitle">IP Address</div>
    <div class="info__block-title" id="ip"></div>
  </div>
  <div class="info__block">
    <div class="info__block-subtitle">Location</div>
    <div class="info__block-title" id="location"></div>
  </div>
  <div class="info__block">
    <div class="info__block-subtitle">Timezone</div>
    <div class="info__block-title"><span id="timezone"></span></div>
  </div>
  <div class="info__block">
    <div class="info__block-subtitle">ISP</div>
    <div class="info__block-title" id="isp"></div>
  </div>
</div>
</div>
<div class="map"></div>
`;

//global variables
const idInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

//events
btn.addEventListener("click", getData);
idInput.addEventListener("keydown", handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [48.5, 2.2],
  zoom: 13,
});

addTileLayer(map);

L.marker([48.5, 2.2], { icon: markerIcon }).addTo(map);

function getData() {
  if (validateIp(idInput.value)) {
    getAddress(idInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = "UTC " + timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffSet(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("163.197.192.104").then(setInfo);
});
