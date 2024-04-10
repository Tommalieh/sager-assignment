/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';


// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tbWFsaWVoIiwiYSI6ImNsdXR1bjlmMjAxaXUya3BqemV4ZzUzdzQifQ.49mZs7y4duQ6gWGwk9i0bA';

const MapBox = ({ drones, selectedDrone }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // To store the map instance
    const markersRef = useRef({}); // To store current markers

    console.log('drones', drones);
    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Helper function to move a marker smoothly
    const moveMarker = (marker, currentPos, newPos, duration = 1000) => {
        const startTime = performance.now();
        const animate = (currentTime) => {
            // Calculate the elapsed time since the animation started
            const elapsedTime = currentTime - startTime;
            // Calculate how far along the duration we are (0 to 1)
            const progress = Math.min(elapsedTime / duration, 1);
            // Calculate the current position based on the progress
            const lat = currentPos.lat + (newPos.lat - currentPos.lat) * progress;
            const lng = currentPos.lng + (newPos.lng - currentPos.lng) * progress;
            // Update the marker's position
            marker.setLngLat([lng, lat]);

            if (progress < 1) {
                // If the animation hasn't finished, continue animating
                requestAnimationFrame(animate);
            }
        };
        // Start the animation
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Initialize the map only once
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [35.9106, 31.9539], // Initial position
            zoom: 11, // Initial zoom
        })

        return () => {
            mapRef.current.remove();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        const updateMarkers = debounce(() => {
            drones.forEach(drone => {
                const { serial, registration, yaw } = drone.details;
                const { longitude, latitude } = drone.geometry;

                // Check if drone marker already exists
                if (!markersRef.current[serial]) {
                    const el = document.createElement('div');
                    const imgEl = new Image()

                    if (registration.split('-')[1].startsWith('B')) {
                        imgEl.src = '/green-drone.svg'
                    } else {
                        imgEl.src = '/red-drone.svg'

                    }
                    el.appendChild(imgEl)

                    // Create a new marker and add it to the map
                    markersRef.current[serial] = new mapboxgl.Marker(el, { anchor: 'center', rotation: yaw })
                        .setLngLat([longitude, latitude])
                        .addTo(mapRef.current);
                } else {
                    // Update position for existing marker
                    const newPos = { lat: latitude, lng: longitude };
                    const currentPos = markersRef.current[serial].getLngLat();
                    markersRef.current[serial].setRotation(yaw)
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
                        }
                    });

                    // Add a layer to display the path
                    mapRef.current.addLayer({
                        id: `route-${serial}`,
                        type: 'line',
                        source: `route-${serial}`,
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-width': 5,
                            'line-color': registration.split('-')[1].startsWith('B') ? 'green' : 'red', // Customize the path color
                            'line-opacity': 0.8
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
                                coordinates: [...sourceCoordinates, [longitude, latitude]]
                            }
                        });
                    }
                }
            });
        });

        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            updateMarkers();
        } else {
            // Handle the case where the map is not yet ready
            mapRef.current.on('style.load', updateMarkers);
        }
    }, [drones]); // Depend on drones array to trigger updates

    useEffect(() => {
        if (selectedDrone) {
            const panToCoordinates = [selectedDrone.geometry.longitude, selectedDrone.geometry.latitude]
            mapRef.current.panTo(panToCoordinates)
        }
    }, [selectedDrone])


    return <div ref={mapContainerRef} style={{ width: '100%', minHeight: '100vh' }} />;
};

export default MapBox;
