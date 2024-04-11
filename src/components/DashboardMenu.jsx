import { useState, useEffect } from 'react';
import { socket } from '../socket';

export const DashboardMenu = ({ activeMenu, setActiveMenu, enterPanCoordinates }) => {
  // State to track connection status to the socket
  const [isConnected, setIsConnected] = useState(socket.connected);
  // State for longitude input
  const [longitude, setLongitude] = useState('');
  // State for latitude input
  const [latitude, setLatitude] = useState('');
  // State for longitude input validation error
  const [longitudeError, setLongitudeError] = useState('');
  // State for latitude input validation error
  const [latitudeError, setLatitudeError] = useState('');

  // Class names for styling the dashboard panel
  const panelClassNames =
    'h-full max-h-screen bg-[#070707a3] md:bg-[#070707] flex flex-col items-center justify-start gap-y-4 z-[5] pt-[72px] pb-8 overflow-scroll px-8 transition-transform duration-500 ease-in-out';

  // Styles for desktop version of the dashboard
  const panelStyleDesktop = {
    transform: activeMenu === 'dashboard' ? 'translateX(27%)' : 'translateX(-400%)',
  };

  // Styles for mobile version of the dashboard (modal appearance)
  const panelStyleMobile = {
    transform: activeMenu === 'dashboard' ? 'translateY(0)' : 'translateY(100vh)',
  };

  // Function to validate the coordinates input by the user
  const validateCoordinates = () => {
    let valid = true;

    // Validate longitude within the acceptable range
    if (!longitude || isNaN(longitude) || longitude < -180 || longitude > 180) {
      setLongitudeError('Please enter a valid longitude');
      valid = false;
    } else {
      setLongitudeError('');
    }

    // Validate latitude within the acceptable range
    if (!latitude || isNaN(latitude) || latitude < -90 || latitude > 90) {
      setLatitudeError('Please enter a valid latitude');
      valid = false;
    } else {
      setLatitudeError('');
    }

    return valid;
  };

  // Handle form submission for panning to coordinates
  const handleGoClick = (event) => {
    event.preventDefault();
    const isValid = validateCoordinates();
    if (isValid) {
      // Send valid coordinates to the map component
      enterPanCoordinates([longitude, latitude]);
    }
  };

  // Function to initiate socket connection
  function connect() {
    socket.connect();
  }

  // Function to disconnect from the socket
  function disconnect() {
    socket.disconnect();
  }

  // Effect to manage socket connection status
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Cleanup by removing event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div
      className={`${panelClassNames} ${window.innerWidth < 640 ? 'fixed bottom-0 left-0 right-0' : 'absolute'}`} // Use Tailwind's `fixed` for mobile to make it a modal
      style={window.innerWidth < 640 ? panelStyleMobile : panelStyleDesktop}
    >
      <div className='w-full flex justify-between items-center mt-4'>
        <h3 className='text-white font-bold '>Dashboard</h3>
        <button onClick={() => setActiveMenu('')}>
          <img src='/close.svg' alt='close icon' />
        </button>
      </div>
      <div className='w-full flex items-center justify-between self-start mt-10 '>
        <h4 className='text-[#CCCCCC] self-start'>Connection Status</h4>
        {isConnected ? (
          <img src='/green-circle.svg' alt='connected' />
        ) : (
          <img src='/red-circle.svg' alt='disconnected' />
        )}
      </div>
      <div className='w-full flex justify-start items-center gap-x-4'>
        <button
          className='bg-white text-black w-[140px] h-[40px] flex items-center justify-center rounded transition'
          style={{ backgroundColor: isConnected ? '#CCCCCC' : '#FFFFFF' }}
          onClick={connect}
          disabled={isConnected}
        >
          Connect
        </button>
        <button
          className='bg-white text-black w-[140px] h-[40px] flex items-center justify-center rounded transition'
          style={{ backgroundColor: !isConnected ? '#CCCCCC' : '#FFFFFF' }}
          onClick={disconnect}
          disabled={!isConnected}
        >
          Disconnect
        </button>
      </div>
      <div className='w-full mt-10'>
        <h4 className='text-[#CCCCCC] self-start mb-2'>Pan To Location</h4>
        <div className='flex justify-start items-center gap-x-4'>
          <form
            className='w-full flex flex-col justify-start items-center gap-y-2 md:flex-row md:justify-center md:items-start gap-x-4'
            onSubmit={handleGoClick}
          >
            <div className='w-full flex flex-col items-start justify-center'>
              <input
                type='text'
                placeholder='Longitude'
                className={`w-full px-2 py-1 rounded ${longitudeError ? 'border-red-500' : ''}`}
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              {longitudeError && <p className='text-red-500 text-xs'>{longitudeError}</p>}
            </div>
            <div className='w-full flex flex-col items-start justify-center'>
              <input
                type='text'
                placeholder='Latitude'
                className={`w-full px-2 py-1 rounded ${latitudeError ? 'border-red-500' : ''}`}
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              {latitudeError && <p className='text-red-500 text-xs'>{latitudeError}</p>}
            </div>
            <button
              type='submit'
              className='w-full bg-white text-black flex items-center justify-center uppercase px-12 md:px-4 py-1 rounded'
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
