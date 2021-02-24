import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import GLOperations from 'leaflet.tilelayer.gloperations';


const GLTileLayer = ({}) => {
  const map = useMap();

  useEffect(() => {
    const tilelayer = new GLOperations({
      url: '/private/var/cameron/hirdsexplorer/build/{z}/{x}/{y}.png',
      colorScale: [
        { offset: 0, color: 'rgb(255, 0, 0)' },
        { offset: 950, color: 'rgb(0, 0, 255)' },
      ],
      nodataValue: 0,
      minNativeZoom: 5,
      maxNativeZoom: 5,
    });
    tilelayer.addTo(map);

    return () => tilelayer.remove();
  }, [map]);
  return null;
};

GLTileLayer.propTypes = {
//  title: PropTypes.string,
//  description: PropTypes.string,
};

export default GLTileLayer;
