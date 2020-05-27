import React from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//import "leaflet/dist/leaflet.css";

export default function MapInfos() {
  const position = [44.859407, -0.584425];
  return (
    <Map style={{ width: "70%", height: "300px" }} center={position} zoom={15}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}
