import "leaflet/dist/leaflet.css";
import "./Map.css";

import React, {useEffect, useRef, useState} from 'react';
import L from "leaflet";
import GLOperations from 'leaflet.tilelayer.gloperations';
import { addValueDisplay } from '../leaflet/valuedisplay.js';
import '../leaflet/messagebox.js';

function createMap(element) {
  const map = L.map(element, {
    center: [-40.5, 173],
    zoom: 5,
  });
  return map;
}

function Map({}) {
  const [map, setMap] = useState();

  //initial setup of map
  const mapRef = useRef(null);
  useEffect(() => {
    let a = createMap(mapRef.current);
    setMap(a);
  }, []);

  const valueDisplayRef = useRef(null);
  useEffect(() => {
    if (map) {

      valueDisplayRef.current = addValueDisplay(map);

      const basemapTiles = L.tileLayer(
        'https://basemaps.linz.govt.nz/v1/tiles/aerial/EPSG:3857/{z}/{x}/{y}.webp?api=c01ex52jg5zg9mg8m5ar85vbm6t',
        {
          attribution: '<a href="https://www.linz.govt.nz/data/linz-data/linz-basemaps/data-attribution">LINZ CC BY 4.0 © Imagery Basemap contributors</a>'
        }
      ).addTo(map);

      const tilelayer = new GLOperations({
        url: '/private/var/cameron/hirdsexplorer/build/{z}/{x}/{y}.png',
        colorScale: [
          { offset: 0, color: 'rgb(255, 0, 0)' },
          { offset: 950, color: 'rgb(0, 0, 255)' },
        ],
        nodataValue: 0,
        minNativeZoom: 5,
        maxNativeZoom: 5,
        onmousemove: updateValueDisplay,
      }).addTo(map);
      //setTilelayer(tilelayer);
      //window.tilelayer = tilelayer;

      // set up messagebox
      //const hsAdvLoadingMessage = L.control.messagebox({
      //  position: 'topleft',
      //  timeout: 1200000,
      //}).addTo(map);

      //map.on("calcHsAdvanced", function(data) {
      //  if (data.status) {
      //    hsAdvLoadingMessage.options.timeout = 1200000;
      //    hsAdvLoadingMessage.show('Calculating hillshading...');
      //  } else {
      //    hsAdvLoadingMessage.options.timeout = 2000;
      //    hsAdvLoadingMessage.show('Calculating hillshading...done');
      //  }
      //});
    }
  }, [map]);

  // function to update the value display when the mouse hovers over pixels
  function updateValueDisplay(mouseEvent, VALUE_DISPLAY_PRECISION=2) {
    var pixelValue = mouseEvent.pixelValues.pixelValue;
    let text = '';
    let valueLen = Object.keys(mouseEvent.pixelValues).length;
    if (valueLen === 1) {
      // if no-data pixel, pixelValue will be `undefined`
      if (pixelValue === undefined) {
        text = '(undefined)';
      } else if (typeof pixelValue === 'number') {
        text = pixelValue.toFixed(VALUE_DISPLAY_PRECISION);
      } else {
          text = pixelValue.label;
      }
    } else if (valueLen === 3) {
      text = pixelValue === undefined ? '' : 'Difference: ' + pixelValue.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>Pressure year 2000: ' + mouseEvent.pixelValues.pixelValueA.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>Pressure year 2003: ' + mouseEvent.pixelValues.pixelValueB.toFixed(VALUE_DISPLAY_PRECISION);
    } else if (valueLen === 5) {
      text = pixelValue === undefined ? '' : 'Result: ' + pixelValue.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>Oil-thickness: ' + mouseEvent.pixelValues.pixelValueA.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>STOIIP: ' + mouseEvent.pixelValues.pixelValueB.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>Porosity: ' + mouseEvent.pixelValues.pixelValueC.toFixed(VALUE_DISPLAY_PRECISION)
                                          + '<br>Permeability: ' + mouseEvent.pixelValues.pixelValueD.toFixed(VALUE_DISPLAY_PRECISION);
    }
    valueDisplayRef.current.update(text);
  }

  return (
    <div id="map" ref={mapRef}></div>
  );
}

export default Map;
