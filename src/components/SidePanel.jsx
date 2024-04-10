/* eslint-disable react/prop-types */
import { useState } from 'react'
import Dashboard from './svg/Dashboard'
import Location from './svg/Location'

export const SidePanel = ({ openSelectedMenu }) => {
    const [selectedMenu, setSelectedMenu] = useState('location')
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu)
        openSelectedMenu(menu)
    }

    return (
        <div className='w-[130px] h-screen bg-[#111111] absolute left-0 top-0 flex flex-col justify-start items-center gap-y-4  pt-[136px] z-10'>
            <button onClick={() => handleMenuClick('dashboard')} className='flex flex-col justify-center items-center gap-y-2'>
                <Dashboard fill={selectedMenu === 'dashboard' ? '#ffffff' : '#65717C'} />
                <p className='transition' style={{ color: selectedMenu === 'dashboard' ? '#ffffff' : '#65717C' }}>DASHBOARD</p>
            </button>
            <div>
                <img src="/v-separator.svg" alt="" />
            </div>
            <button onClick={() => handleMenuClick('location')} className='flex flex-col justify-center items-center gap-y-2'>
                <Location fill={selectedMenu === 'location' ? '#ffffff' : '#65717C'} />
                <p className='transition' style={{ color: selectedMenu === 'location' ? '#ffffff' : '#65717C' }}>MAP</p>
            </button>

        </div>
    )
}
