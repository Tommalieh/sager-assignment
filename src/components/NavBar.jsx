// Function component for the navigation bar at the top of the application

export default function NavBar({ toggleBurgerMenu }) {
  return (
    <div className='w-full h-[72px] flex justify-between items-center bg-black fixed px-4 z-20'>
      <div className='flex items-center justify-start gapx-2'>
        <button onClick={toggleBurgerMenu}>
          <img src='/burger-menu.svg' alt='burger menu icon' className='block md:hidden' />
        </button>
        <img src='/sager-logo.svg' alt='sager logo' />
      </div>
      <div className='flex justify-center items-center gap-x-4'>
        <div className='flex justify-center items-center gap-x-4'>
          <img src='/capture.svg' alt='capture icon' />
          <img src='/language.svg' alt='language swicher icon' />
          <img src='/notification.svg' alt='notification icon' />
        </div>
        <div className='hidden md:flex md:justify-center md:items-center'>
          <img src='/h-separator.svg' alt='horizantal separator element' />
        </div>
        <div className='hidden md:flex md:flex-col md:justify-center md:items-start'>
          <p className='text-white'>
            Hello, <span className='font-bold'>Mohammed Omar</span>
          </p>
          <p className='text-[#748AA1]'>Technical Support</p>
        </div>
      </div>
    </div>
  );
}
