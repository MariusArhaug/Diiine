import { useState, useEffect } from "react";
import { User } from '../types';
import client from '../feathers-client'
import { Container } from '@material-ui/core';
import { Dinner } from '../types';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//const L = require('leaflet');


export default function Map() {

  //const [map, setMap] = useState();

  // const initialMap = () => {
  //   const mapOptions = {
  //     center: [59.911491, 10.757933],
  //     zoom: 15,
  //   }
  //   const newMap = new L.map('map', mapOptions);
  //   const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  //   newMap.addLayer(layer);
  //   setMap(newMap);
  // }

  //useEffect(() => initialMap(), [])
  return (
    <Container maxWidth="sm">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  )
}
