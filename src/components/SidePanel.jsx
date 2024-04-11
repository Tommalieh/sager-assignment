import Dashboard from './svg/Dashboard';
import Location from './svg/Location';

// Component for the sidebar panel which includes navigation buttons
export const SidePanel = ({ selectedMenu, openSelectedMenu, isBurgerMenuOpen }) => {
  // Function to handle clicking on a menu item
  const handleMenuClick = (menu) => {
    openSelectedMenu(menu); // Callback to set the active menu item
  };

  return (
    <div
      className={`min-w-[130px] bg-[#111111] -translate-x-full ${
        isBurgerMenuOpen ? 'translate-x-0' : ''
      } md:relative md:translate-x-0 transition duration-200 ease-in-out flex flex-col justify-start items-center gap-y-4 pt-[136px] z-10`}
    >
      <button
        onClick={() => handleMenuClick('dashboard')}
        className='flex flex-col justify-center items-center gap-y-2'
      >
        <Dashboard fill={selectedMenu === 'dashboard' ? '#ffffff' : '#65717C'} />
        <p className='transition' style={{ color: selectedMenu === 'dashboard' ? '#ffffff' : '#65717C' }}>
          DASHBOARD
        </p>
      </button>
      <div>
        <img src='/v-separator.svg' alt='vertical separator element' />
      </div>
      <button onClick={() => handleMenuClick('map')} className='flex flex-col justify-center items-center gap-y-2'>
        <Location fill={selectedMenu === 'map' ? '#ffffff' : '#65717C'} />
        <p className='transition' style={{ color: selectedMenu === 'map' ? '#ffffff' : '#65717C' }}>
          MAP
        </p>
      </button>
    </div>
  );
};
