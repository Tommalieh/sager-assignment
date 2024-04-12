# Drone Tracking App

## Overview

This project is a front-end application built with React and Mapbox GL JS. It is designed to track and display the real-time positions and paths of drones on a map. The application highlights active drones, displays their flight paths, and provides detailed information through interactive popups.

[Watch the Demo Video](https://drive.google.com/file/d/1k4ak2NNCvxadKdR5DolibBTA2JniKKgu/view?usp=drive_link)

## Features

- **Real-Time Tracking**: Shows all drones currently in the sky in real-time.
- **Drone Paths**: Displays the path of each drone from the time the app is opened.
- **Color-Coded Markers**: Drones with registration numbers starting with 'B' are shown in green (active), while others are shown in red (inactive).
- **Interactive Popups**: Displays a popup with the flight time and altitude when a drone is hovered over.
- **Dynamic Path Drawing**: Continuously updates the path of each drone as it moves across the map.
- **Orientation Indication**: Displays the orientation of the drone on the map with an arrow on the drone icon.
- **Responsive Design**: Adapts to different screen sizes for optimal viewing on desktops and mobile devices.

## Technologies Used

- **React**: For building the user interface.
- **Mapbox GL JS**: Used for rendering the interactive map.
- **WebSocket**: For real-time communication with the backend to receive drone data.
- **Tailwind CSS && CSS**: For styling components.

## Setup

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository**
   ```
   git clone https://your-repository-url.git
   cd drone-tracking-app
   npm i
   npm run dev
   
This will run the app in development mode. Open http://localhost:5173 to view it in the browser. The page will reload if you make edits.

## Usage

- **Viewing Drones**: Open the application in a web browser to see the drones displayed on the map.
- **Interacting with Drones**: Hover over a drone marker to see detailed information such as flight time and altitude. Click on a drone in the side panel to center the map on that drone.

## Contact

Muhammed Tommalieh - [muhammedtommalieh@gmail.com](mailto:muhammedtommalieh@gmail.com)

Project Link: [https://github.com/Tommalieh/sager-assignment](https://github.com/Tommalieh/sager-assignment)

