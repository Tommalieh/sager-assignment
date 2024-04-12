import { useState, useEffect } from 'react';
import { socket } from './socket'; // Import socket connection setup
import MapBox from './components/MapBox';
import NavBar from './components/NavBar';
import { SidePanel } from './components/SidePanel';
import { MapMenu } from './components/MapMenu';
import { DashboardMenu } from './components/DashboardMenu';
import { DronesCounter } from './components/DronesCounter';

import './App.css';

export default function App() {
  // State to hold all drones data received via websocket
  const [dronesData, setDronesData] = useState([]);
  // State to keep track of the currently selected drone
  const [selectedDrone, setSelectedDrone] = useState();
  // State to store coordinates entered in the dashboard for panning the map
  const [enteredCoordinates, setEnteredCoordinates] = useState();
  // State to count the number of drones with a "red" status
  const [redDronesCount, setRedDronesCount] = useState(0);
  // State to manage the visibility of the burger menu (true by default)
  const [openBurgerMenu, setOpenBurgerMenu] = useState(true);
  // State to control which nested menu is open
  const [openNestedMenu, setOpenNestedMenu] = useState('');

  // Function to extract and clean drone data from the raw data received
  const cleanDronesData = (newDroneData) => {
    const droneDetailsData = newDroneData?.properties;
    const droneGeometryData = newDroneData?.geometry?.coordinates;
    const cleanedDroneData = {
      details: { ...droneDetailsData },
      geometry: {
        longitude: droneGeometryData[0],
        latitude: droneGeometryData[1],
      },
    };
    return cleanedDroneData;
  };

  // Function to increment red drone count if a drone is red
  const addToRedDrones = (droneData) => {
    const droneRegNum = droneData?.details?.registration;
    const isDroneRed = !droneRegNum.split('-')[1].startsWith('B');
    if (isDroneRed) setRedDronesCount((previous) => previous + 1);
  };

  // Function to handle the side menu based on the viewport size
  const showSideMenu = (menu) => {
    if (window.innerWidth < 640) {
      setOpenBurgerMenu(false);
    }
    setOpenNestedMenu(menu);
  };

  // Effect to listen for new drone data messages and process them
  useEffect(() => {
    function onMessageEvent(value) {
      value?.features.forEach((value) => {
        const cleanedDroneData = cleanDronesData(value);
        setDronesData((previous) => [...previous, cleanedDroneData]);
        addToRedDrones(cleanedDroneData);
      });
    }

    socket.on('message', onMessageEvent);

    // Clean up by removing event listener on component unmount
    return () => {
      socket.off('message', onMessageEvent);
    };
  }, []);

  return (
    <div className='h-screen bg-gray-500 flex flex-col'>
      <NavBar toggleBurgerMenu={() => setOpenBurgerMenu(!openBurgerMenu)} />
      <DronesCounter dronesCount={redDronesCount} />
      <div className='w-full flex flex-row flex-grow'>
        <SidePanel selectedMenu={openNestedMenu} openSelectedMenu={showSideMenu} isBurgerMenuOpen={openBurgerMenu} />
        <MapMenu
          drones={dronesData}
          activeMenu={openNestedMenu}
          setActiveMenu={showSideMenu}
          selectDrone={(drone) => setSelectedDrone(drone)}
          selectedDrone={selectedDrone}
        />
        <DashboardMenu
          activeMenu={openNestedMenu}
          setActiveMenu={showSideMenu}
          enterPanCoordinates={setEnteredCoordinates}
        />
        <div className='flex flex-grow'>
          <MapBox
            drones={dronesData}
            selectDrone={(drone) => setSelectedDrone(drone)}
            selectedDrone={selectedDrone}
            enteredPanToCoordinates={enteredCoordinates}
          />
        </div>
      </div>
    </div>
  );
}
