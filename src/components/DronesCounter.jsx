// Component to display the count of drones currently flying.

export const DronesCounter = ({ dronesCount = 0 }) => {
  return (
    <div className='bg-white text-black w-[140px] h-[40px] flex items-center justify-center absolute  left-2 bottom-2 md:left-auto md:right-10 md:bottom-10 rounded-[10px] z-10'>
      <p className='flex justify-center items-center gap-x-1'>
        <span className='bg-[#1F2327] flex justify-center items-center text-white font-bold px-2 py-0.5 rounded-full'>
          {dronesCount}
        </span>
        <span className='font-light'>Drone Flying</span>
      </p>
    </div>
  );
};
