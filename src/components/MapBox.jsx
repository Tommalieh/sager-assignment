import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import { DronePopup } from './DronePopup';

import { moveMarker } from '../utils/helpers';

// Mapbox access token
// Currently keeping the public token exposed here, but in real life scenario this wouldn't be the case
mapboxgl.accessToken =
  import.meta.env.MAP_BOX_TOKEN ||
  'pk.eyJ1IjoidG9tbWFsaWVoIiwiYSI6ImNsdXR1bjlmMjAxaXUya3BqemV4ZzUzdzQifQ.49mZs7y4duQ6gWGwk9i0bA';

const MapBox = ({ drones, selectDrone, selectedDrone, enteredPanToCoordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // To store the map instance
  const markersRef = useRef({}); // To store current markers

  // To initialize the map
  useEffect(() => {
    // Initialize the map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [35.9106, 31.9539], // Initial position
      zoom: 11, // Initial zoom
    });

    return () => {
      mapRef.current.remove();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const updateMarkers = () => {
      drones.forEach((drone) => {
        const { serial, registration, yaw } = drone.details;
        const { longitude, latitude } = drone.geometry;

        // Check if drone marker already exists
        if (!markersRef.current[serial]) {
          const el = document.createElement('div');
          const imgEl = new Image();

          if (registration.split('-')[1].startsWith('B')) {
            imgEl.src = '/green-drone.svg';
          } else {
            imgEl.src = '/red-drone.svg';
          }
          el.appendChild(imgEl);

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 15, // Offset the popup to not overlap with the marker
          });

          el.addEventListener('click', () => {
            selectDrone(drone);
          });

          // When the mouse enters the element
          el.addEventListener('mouseenter', () => {
            // Create a popupNode div for the popup content
            const popupNode = document.createElement('div');

            // Render the React component to the popupNode
            ReactDOM.createRoot(popupNode).render(
              <DronePopup
                droneName={drone?.details?.Name}
                droneFlightTime={drone?.details?.flightTime}
                droneAltitude={drone?.details?.altitude}
              />
            );

            // Set the popupNode as the content of the popup
            popup.setLngLat(markersRef.current[serial].getLngLat()).setDOMContent(popupNode).addTo(mapRef.current);
          });

          //   Remove popup on mouse leave
          el.addEventListener('mouseleave', () => {
            popup.remove();
          });

          // Create a new marker and add it to the map
          markersRef.current[serial] = new mapboxgl.Marker(el, { rotation: yaw })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        } else {
          // Update position for existing marker
          const newPos = { lat: latitude, lng: longitude };
          const currentPos = markersRef.current[serial].getLngLat();
          markersRef.current[serial].setRotation(yaw);
          moveMarker(markersRef.current[serial], currentPos, newPos);
        }

        if (!mapRef.current.getSource(`route-${serial}`)) {
          // Initialize the source with the first coordinate
          mapRef.current.addSource(`route-${serial}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [[longitude, latitude]],
              },
            },
          });

          // Add a layer to display the path
          mapRef.current.addLayer({
            id: `route-${serial}`,
            type: 'line',
            source: `route-${serial}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-width': 5,
              'line-color': registration.split('-')[1].startsWith('B') ? 'green' : 'red', // Customize the path color
              'line-opacity': 0.8,
            },
          });
        } else {
          // Path exists, update it with the new position
          const source = mapRef.current.getSource(`route-${serial}`);
          const sourceCoordinates = source._data.geometry.coordinates;

          // Check if the new coordinate is already included in the path coordinates
          if (!sourceCoordinates.some(([lng, lat]) => lng === longitude && lat === latitude)) {
            mapRef.current.getSource(`route-${serial}`).setData({
              ...source._data,
              geometry: {
                ...source._data.geometry,
                coordinates: [...sourceCoordinates, [longitude, latitude]],
              },
            });
          }
        }
      });
    };

    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      updateMarkers();
    } else {
      // Handle the case where the map is not yet ready
      mapRef.current.on('style.load', updateMarkers);
    }
  }, [drones]); // Depend on drones array to trigger updates

  // Pan to selected drone
  useEffect(() => {
    if (selectedDrone && mapRef.current) {
      const panToCoordinates = [selectedDrone?.geometry?.longitude, selectedDrone?.geometry?.latitude];
      mapRef.current.panTo(panToCoordinates);
    }
  }, [selectedDrone]);

  // Pan to entered coordinates
  useEffect(() => {
    if (enteredPanToCoordinates?.length && mapRef.current) {
      mapRef.current.panTo(enteredPanToCoordinates);
    }
  }, [enteredPanToCoordinates]);

  return <div ref={mapContainerRef} className='absolute top-0 left-0 right-0 bottom-0' />;
};

export default MapBox;
