// SelectLocationMap.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SelectLocationMap = ({ onLocationSelect, initialCenter = [29.0469, 41.0082], zoom = 11, radius }) => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = '';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: initialCenter,
      zoom: zoom,
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }

      if (radius) {
      }

      if (onLocationSelect) {
        onLocationSelect({ longitude: lng, latitude: lat });
      }
    });

    return () => map.remove();
  }, [initialCenter, zoom, radius, onLocationSelect]);

  return <div ref={mapContainerRef} style={{ height: '200px' }} />;
};

export default SelectLocationMap;
