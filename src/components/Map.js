import "leaflet/dist/leaflet.css";
import "./Map.css";

import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux'
import L from "leaflet";
import GLOperations from 'leaflet.tilelayer.gloperations';
import { addValueDisplay } from '../leaflet/valuedisplay.js';
import '../leaflet/messagebox.js';

import minMaxList from './minmax.js'

let minMaxLookup = {};
minMaxList.forEach(function (element) {
  const ari = element[0];
  const duration = element[1];
  const min = element[2];
  const max = element[3];

  if (minMaxLookup[ari]) {
    minMaxLookup[ari][duration] = [min, max];
  } else {
    minMaxLookup[ari] = {}
    minMaxLookup[ari][duration] = [min, max];
  }
});

function createMap(element) {
  const map = L.map(element, {
    center: [-40.5, 173],
    zoom: 5,
  });
  const southWest = new L.LatLng(-46.7, 166.5);
  const northEast = new L.LatLng(-34.6, 178.2);
  const bounds = new L.LatLngBounds(southWest, northEast);
  map.fitBounds(bounds);

  return map;
}

function getTileURL(duration_hours, ARI_years) {
  let a = '', d = '';
  if (ARI_years >= 2) {
    a = ARI_years.toFixed(1);
  } else {
    a = ARI_years.toFixed(2);
  }
  if (duration_hours >= 0.5) {
    d = duration_hours.toFixed(1);
  } else {
    d = duration_hours.toPrecision(6);
  }
  return 'https://{s}.hirdsexplorer.nz/2km/'+a+'yr/'+d+'hr/{z}/{x}/{y}.png';
  //return '/private/var/cameron/hirdsexplorer/build/'+a+'yr/'+d+'hr/{z}/{x}/{y}.png';
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbaToHex(r, g, b, a) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(Math.floor(a*255));
}

function colourMapGenerator2(min, max, alpha) {
  if (alpha===undefined) { alpha = 1.0; }
  const colours = [
    [8,8,255],
    [36,50,255],
    [54,94,255],
    [59,140,255],
    [54,191,255],
    [23,243,255],
    [97,255,221],
    [153,255,173],
    [185,255,138],
    [220,255,92],
    [248,255,38],
    [255,225,0],
    [255,183,0],
    [255,136,0],
    [255,89,0],
    [255,47,0],
  ];
  let arr = [];
  const step = (max - min) / (16 - 1);
  for (var i = 0; i < 16; i++) {
    const val = min + (step * i);
    const r = colours[i][0];
    const g = colours[i][1];
    const b = colours[i][2];
    const rgba = rgbaToHex(r, g, b, alpha);
    arr.push({ offset: val, color: rgba });
  }
  return arr;
}


function Map({duration_hours, ARI_years, transparency}) {
  const [map, setMap] = useState();
  const [GLLayer, setGLLayer] = useState();
  const [min, max] = minMaxLookup[ARI_years][duration_hours];

  //initial setup of map
  const mapRef = useRef(null);
  useEffect(() => {
    if (!map) {
      let a = createMap(mapRef.current);
      setMap(a);
    }

    return () => { //"clean up" function
      if (map && map.remove) {
        map.remove();
      }
    };
  }, [map]);

  const valueDisplayRef = useRef(null);
  useEffect(() => {
    if (map) {

      valueDisplayRef.current = addValueDisplay(map);

      L.tileLayer(
        'https://basemaps.linz.govt.nz/v1/tiles/aerial/EPSG:3857/{z}/{x}/{y}.webp?api=c01gc8g89smfmkv3d6txzxnj4je',
        {
          attribution: '<a href="https://www.linz.govt.nz/data/linz-data/linz-basemaps/data-attribution">LINZ CC BY 4.0 © Imagery Basemap contributors</a>'
        }
      ).addTo(map);

      const tileURL = getTileURL(duration_hours, ARI_years);
      const tilelayer = new GLOperations({
        url: tileURL,
        colorScale: colourMapGenerator2(min, max),
        nodataValue: -10000,
        minNativeZoom: 6,
        maxNativeZoom: 6,
        onmousemove: updateValueDisplay,
        tileFormat: 'dem',
        transitions: false,
        //debug: true,
      }).addTo(map);
      setGLLayer(tilelayer);

      L.control.scale().addTo(map);
    }
  }, [map]);

  useEffect(() => {
    if (GLLayer) {
      const tileURL = getTileURL(duration_hours, ARI_years);
      GLLayer.updateOptions({
        url: tileURL,
        colorScale: colourMapGenerator2(min, max, transparency),
      });
    }
  }, [GLLayer, duration_hours, ARI_years, min, max, transparency]);

  // function to update the value display when the mouse hovers over pixels
  function updateValueDisplay(mouseEvent, VALUE_DISPLAY_PRECISION=1) {
    var pixelValue = mouseEvent.pixelValues.pixelValue;
    let text = ''
    // if no-data pixel, pixelValue will be `undefined`
    if (pixelValue === undefined) {
      text = '';
    } else if (typeof pixelValue === 'number') {
      text = 'Approx. ' + pixelValue.toFixed(VALUE_DISPLAY_PRECISION) + ' mm';
    } else {
        text = pixelValue.label;
    }
    valueDisplayRef.current.update(text);
  }

  return (
    <div id="map" ref={mapRef}></div>
  );
}

const mapStateToProps = state => {
  return {
    duration_hours: state.core.duration_hours,
    ARI_years: state.core.ARI_years,
    transparency: state.core.transparency,
  };
};

export default connect(
  mapStateToProps,
  {  }
)(Map);
