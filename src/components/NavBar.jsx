export default function NavBar() {
    return (
        <div className='w-full h-[72px] flex justify-between items-center bg-black absolute top-0 left-0 right-0 px-4 z-20'>
            <div>
                <img src="/sager-logo.svg" alt="sager logo" />
            </div>
            <div className='flex justify-center items-center gap-x-4'>
                <div className='flex justify-center items-center gap-x-4'>
                    <img src="/capture.svg" alt="" />
                    <img src="/language.svg" alt="" />
                    <img src="/notification.svg" alt="" />
                </div>
                <div className='flex justify-center items-center'>
                    <img src="/h-separator.svg" alt="" />
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <p className='text-white'>Hello, <span className='font-bold'>Mohammed Omar</span></p>
                    <p className='text-[#748AA1]'>Technical Support</p>
                </div>
            </div>
        </div>
    )
}
