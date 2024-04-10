/* eslint-disable react/prop-types */

export const MapMenu = ({ drones, selectDrone }) => {
    const getDroneState = (droneRegistrationNumber) => {
        return droneRegistrationNumber.split('-')[1].startsWith('B') ? 'green' : 'red';
    }
    return (
        <div className='h-full bg-[#070707] flex flex-col items-center justify-start gap-y-4 absolute left-[135px] top-0 z-10 pt-[72px] pb-8 overflow-scroll transition'>
            {drones?.map((drone, index) => {
                const droneState = getDroneState(drone.details.registration)
                return <div key={index} onClick={() => selectDrone(drone)} className='w-full hover:bg-[#272727] hover:cursor-pointer px-10 py-2'>
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
                            {droneState === 'red' && <img src="/red-circle.svg" alt="" />}
                            {droneState === 'green' && <img src="/green-circle.svg" alt="" />}
                        </div>
                    </div>
                </div>
            }
            )}
        </div>
    )
}
