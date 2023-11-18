import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SelectLocationMap = ({ onLocationSelect, initialCenter = [29.0469, 41.0082], zoom = 11 }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Ref to store the map instance
  const markerRef = useRef(null); // Ref to store the marker

  // Initialize map only once
  useEffect(() => {
    if (mapRef.current) return; // Initialize the map only if it's not already initialized

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: initialCenter,
      zoom: zoom,
    });

    mapRef.current = map; // Store the map instance in the ref

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }

      if (onLocationSelect) {
        onLocationSelect({ longitude: lng, latitude: lat });
      }
    });

    // Cleanup function to remove map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect only runs once

  // No need to have a separate effect for radius unless you're adding/updating a layer for it

  return <div ref={mapContainerRef} style={{ height: '200px' }} />;
};

export default SelectLocationMap;
