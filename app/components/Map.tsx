"use client"

import L from "leaflet"
import { MapContainer,Marker,TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import marketShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl : markerIcon.src,
    iconRetinaUrl:markerIcon2x.src,
    shadowUrl:marketShadow.src
})

interface MapProps{
    center?:number[]
}

function Map({center} : MapProps) {
  return (
    <MapContainer center={center as L.LatLngExpression || [51,-0.09]} className="h-[35vh] rounded-lg"
    scrollWheelZoom={false} zoom={center ? 4 : 2}>
       <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {center && (
          <Marker position={center as L.LatLngExpression}></Marker>)}
    </MapContainer>
  )
}

export default Map
