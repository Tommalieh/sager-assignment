/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState.jsx';
import { ConnectionManager } from './components/ConnectionManager.jsx';
import { Events } from "./components/Events.jsx";
import MapBox from './components/MapBox';
import NavBar from './components/NavBar';
import { SidePanel } from './components/SidePanel';
import { MapMenu } from './components/MapMenu';
import { DashboardMenu } from './components/DashboardMenu';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [dronesData, setDronesData] = useState([])
  const [dronesTestData, setTestDronesData] = useState(
    [
      {
        "details":
        {
          "serial": "ABBDCDACCA",
          "registration": "SD-AC",
          "Name": "Dji Mavic",
          "altitude": 31,
          "pilot": "Besher",
          "organization": " Sager Drone",
          "yaw": 124
        },
        "geometry": {
          "longitude": 35.918220573123264,
          "latitude": 31.911930354690654
        }
      },

      {
        "details": {
          "serial": "ABDCDBDCCA",
          "registration": "SD-CB",
          "Name": "Dji Mavic",
          "altitude": 63,
          "pilot": "Besher",
          "organization": " Sager Drone",
          "yaw": 127
        },
        "geometry": {
          "longitude": 35.948342718946705,
          "latitude": 31.988561648653047
        }
      }
    ]
  )

  const [openMenu, setOpenMenu] = useState('location')
  const [selectedDrone, setSelectedDrone] = useState()

  const cleanDronesData = (newDroneData) => {
    const droneDetailsData = newDroneData?.features[0]?.properties
    const droneGeometryData = newDroneData?.features[0]?.geometry?.coordinates
    const cleanedDroneData = {
      "details": { ...droneDetailsData },
      "geometry": {
        "longitude": droneGeometryData[0],
        "latitude": droneGeometryData[1],
      }
    }
    console.log("cleanedDroneData", cleanedDroneData);
    return cleanedDroneData
  }

  const showSideMenu = (menu) => {
    setOpenMenu(menu)
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value) {
      console.log(value);
      const cleanedDroneData = cleanDronesData(value)
      setDronesData(previous => [...previous, cleanedDroneData]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-500 flex flex-col justify-center items-center relative">
      <NavBar />
      <SidePanel openSelectedMenu={showSideMenu} />
      {openMenu === 'location' && <MapMenu drones={dronesData} selectDrone={(drone) => setSelectedDrone(drone)} />}
      {openMenu === 'dashboard' && <DashboardMenu />}
      <MapBox drones={dronesData} selectedDrone={selectedDrone} />
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <ConnectionManager /> */}
      {/* <Events events={messageEvents} /> */}
    </div>
  );
}