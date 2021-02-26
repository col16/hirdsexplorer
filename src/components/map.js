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
  return '/private/var/cameron/hirdsexplorer/build/'+a+'yr/'+d+'hr/{z}/{x}/{y}.png';
}

function Map({duration_hours, ARI_years}) {
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
      console.log("rendered map");

      valueDisplayRef.current = addValueDisplay(map);

      const basemapTiles = L.tileLayer(
        'https://basemaps.linz.govt.nz/v1/tiles/aerial/EPSG:3857/{z}/{x}/{y}.webp?api=c01ex52jg5zg9mg8m5ar85vbm6t',
        {
          attribution: '<a href="https://www.linz.govt.nz/data/linz-data/linz-basemaps/data-attribution">LINZ CC BY 4.0 © Imagery Basemap contributors</a>'
        }
      ).addTo(map);

      const tileURL = getTileURL(duration_hours, ARI_years);
      const tilelayer = new GLOperations({
        url: tileURL,
        colorScale: [
          { offset: min, color: 'rgb(255, 0, 0)' },
          { offset: max, color: 'rgb(0, 0, 255)' },
        ],
        nodataValue: -10000,
        minNativeZoom: 5,
        maxNativeZoom: 5,
        onmousemove: updateValueDisplay,
        tileFormat: 'dem',
        transitions: false,
      }).addTo(map);
      console.log(tileURL, min, max);
      setGLLayer(tilelayer);

    }
  }, [map]);


  useEffect(() => {
    if (GLLayer) {
      console.log("update tile layer");
      const tileURL = getTileURL(duration_hours, ARI_years);
      GLLayer.updateOptions({
        url: tileURL,
        colorScale: [
          { offset: min, color: 'rgb(255, 0, 0)' },
          { offset: max, color: 'rgb(0, 0, 255)' },
        ],
      });
      console.log(tileURL, min, max);
    } else {
      console.log("no GL layer yet");
    }
  }, [GLLayer, duration_hours, ARI_years, min, max]);

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
  };
};

export default connect(
  mapStateToProps,
  {  }
)(Map);
