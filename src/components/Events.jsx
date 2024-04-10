/* eslint-disable react/prop-types */

import { useEffect } from 'react';

export function Events({ events }) {

    useEffect(() => {
        if (
            events
        )
            console.log('events', events);


    }, [events])

    return (
        <ul className="flex flex-col justify-center items-center">
            {
                events.map((event, index) =>
                    <div key={index} className='flex justify-center items-center bg-white border border-black px-2 py-4 mb-2 rounded'>
                        <li >{`X-${event?.features[0]?.geometry?.coordinates[0]}, `}</li>
                        <li >{`Y-${event?.features[0]?.geometry?.coordinates[1]}`}</li>
                    </div>
                )
            }
        </ul>
    );
}