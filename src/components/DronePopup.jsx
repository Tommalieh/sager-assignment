// Component to display details about a drone in a popup.

export const DronePopup = ({ droneName, droneAltitude, droneFlightTime = '00:25:45' }) => {
  return (
    <div className='flex flex-col justify-center items-start gap-y-2'>
      <h5 className='text-white font-bold'>{droneName}</h5>
      <div className='flex justify-center items-center gap-x-8 ps-1'>
        <div className='flex flex-col justify-center items-start gap-y-1'>
          <span className='text-[#CCCCCC] text-xs'>Altitude</span>
          <span className='text-white text-sm'>{droneAltitude} m</span>
        </div>
        <div className='flex flex-col justify-center items-start gap-y-1'>
          <span className='text-[#CCCCCC] text-xs'>Flight Time</span>
          <span className='text-white text-sm'>{droneFlightTime}</span>
        </div>
      </div>
    </div>
  );
};
