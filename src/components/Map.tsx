import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  route?: [number, number][];
}

const Map = ({ route }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.5946, 12.9716], // Bangalore
      zoom: 11
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up function
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !route || route.length < 2) return;

    const coordinates = route;

    // Function to add route to map
    const addRoute = () => {
      if (!map.current) return;

      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord as [number, number]);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      map.current.fitBounds(bounds, {
        padding: 50,
        duration: 1000
      });

      // Check if the source already exists
      if (map.current.getSource('route')) {
        (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        });
      } else {
        // Wait for the style to be loaded before adding source and layer
        if (!map.current.isStyleLoaded()) {
          map.current.once('style.load', addRoute);
          return;
        }

        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#10b981',
            'line-width': 4
          }
        });
      }
    };

    // Add route when the style is loaded
    if (map.current.isStyleLoaded()) {
      addRoute();
    } else {
      map.current.once('style.load', addRoute);
    }

    // Cleanup
    return () => {
      if (map.current?.getLayer('route')) {
        map.current.removeLayer('route');
      }
      if (map.current?.getSource('route')) {
        map.current.removeSource('route');
      }
    };
  }, [route]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;