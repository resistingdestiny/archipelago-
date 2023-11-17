// MapComponent.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ locations }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = '';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [28.9784, 41.0082],
      zoom: 6,
    });

    locations.forEach(location => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);

      marker.getElement().addEventListener('click', () => {
        const popupContent = `
          <h3>${location.title}</h3>
          <img src="${location.streetViewImageUrl}" alt="Street View Image" />
          <p>${location.description}</p>
        `;

        new mapboxgl.Popup()
          .setLngLat(marker.getLngLat())
          .setHTML(popupContent)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [locations]);

  return <div ref={mapContainerRef} style={{ height: '400px' }} />;
};

export default MapComponent;
