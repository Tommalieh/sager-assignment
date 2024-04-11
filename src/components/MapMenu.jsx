import { useEffect, useRef } from 'react';

// Component to display a side menu with a list of drones and their statuses
export const MapMenu = ({ drones, selectDrone, selectedDrone, activeMenu, setActiveMenu }) => {
  const selectedDroneRef = useRef(null); // Reference to the currently selected drone element for scrolling into view

  // Function to determine the color state of the drone based on its registration number
  const getDroneState = (droneRegNum) => {
    return droneRegNum.split('-')[1].startsWith('B') ? 'green' : 'red';
  };

  // CSS classes for the overall panel
  const panelClassNames =
    'h-full max-h-screen bg-[#070707a3] md:bg-[#070707] flex flex-col items-center justify-start gap-y-4 z-[5] pt-[72px] pb-8 overflow-scroll transition-transform duration-500 ease-in-out';

  // Style adjustments for desktop view
  const panelStyleDesktop = {
    transform: activeMenu === 'map' ? 'translateX(60%)' : 'translateX(-400%)',
  };

  // Style adjustments for mobile view, making the panel act like a modal
  const panelStyleMobile = {
    transform: activeMenu === 'map' ? 'translateY(0)' : 'translateY(100vh)',
  };

  // Effect to automatically scroll to the selected drone in the list
  useEffect(() => {
    if (selectedDrone) {
      const node = selectedDroneRef?.current;
      node?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      // Apply a hover effect class to indicate selection
      node.classList.add('hovered');

      // Remove the hover effect after a set duration
      setTimeout(() => {
        node.classList.remove('hovered');
      }, 2000); // Adjust time based on user experience requirements
    }
  }, [selectedDrone]);

  return (
    <div
      className={`${panelClassNames} ${window.innerWidth < 640 ? 'fixed bottom-0 left-0 right-0' : 'absolute'}`}
      style={window.innerWidth < 640 ? panelStyleMobile : panelStyleDesktop}
    >
      <div className='w-full flex justify-between items-center ps-6 pe-4 mt-4 mb-4'>
        <h3 className='text-white font-bold '>DRONE FLYING</h3>
        <button onClick={() => setActiveMenu('')}>
          <img src='/close.svg' alt='close icon' />
        </button>
      </div>
      <div className='w-full flex items-start justify-start gap-x-10 ps-6'>
        <div className='flex flex-col items-start justify-center'>
          <p className='text-white mb-2'>Drones</p>
          <div className='w-full h-[6px] bg-[#F9000E]'></div>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <p className='text-[#65717C]'>Flights History</p>
        </div>
      </div>{' '}
      {drones?.map((drone) => {
        const droneState = getDroneState(drone.details.registration);
        const dronSerial = drone.details.serial;
        return (
          <div
            key={drone.details.serial}
            ref={dronSerial === selectedDrone?.details?.serial ? selectedDroneRef : null}
            onClick={() => selectDrone(drone)}
            className='w-full hover:bg-[#272727] hover:cursor-pointer px-6 py-2'
          >
            <h4 className='text-white mb-4 font-bold'>{drone.details.Name}</h4>
            <div className='w-full flex justify-center items-center gap-x-4 text-[#CCCCCC]'>
              <div className='flex flex-col items-start justify-center gap-y-2'>
                <div>
                  <p className='text-[11px]'>Serial #</p>
                  <p className='text-[11px] font-bold'>{drone.details.serial}</p>
                </div>
                <div>
                  <p className='text-[11px]'>Pilot</p>
                  <p className='text-[11px] font-bold'>{drone.details.pilot}</p>
                </div>
              </div>
              <div className='flex flex-col items-start justify-center gap-y-2'>
                <div>
                  <p className='text-[11px]'>Registration #</p>
                  <p className='text-[11px] font-bold'>{drone.details.registration}</p>
                </div>
                <div>
                  <p className='text-[11px]'>Organization</p>
                  <p className='text-[11px] font-bold'>{drone.details.organization}</p>
                </div>
              </div>
              <div>
                {droneState === 'red' && <img src='/red-circle.svg' alt='drone status: not flying' />}
                {droneState === 'green' && <img src='/green-circle.svg' alt='drone status: flying' />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
