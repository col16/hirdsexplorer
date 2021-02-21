import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function LeafletMap() {
  return (
    <MapContainer center={[-40.5, 173]} zoom={5} scrollWheelZoom={false} className="leaflet-map">
      <TileLayer
        attribution='<a href="https://www.linz.govt.nz/data/linz-data/linz-basemaps/data-attribution">LINZ CC BY 4.0 © Imagery Basemap contributors</a>'
        url='https://basemaps.linz.govt.nz/v1/tiles/aerial/EPSG:3857/{z}/{x}/{y}.webp?api=c01ex52jg5zg9mg8m5ar85vbm6t'
      />
      <Marker position={[-40.5, 173]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;
