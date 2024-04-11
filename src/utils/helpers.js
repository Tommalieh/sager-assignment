// Helper function to move a marker smoothly
export const moveMarker = (marker, currentPos, newPos, duration = 1000) => {
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