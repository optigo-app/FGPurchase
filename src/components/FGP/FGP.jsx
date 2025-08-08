import React, { useState } from 'react';
import UserData from '../UserDetail/UserData';
import HomePage from '../HomePage/HomePage';
import "../globalCss/GlobalCssClasses.css";
import "./fgp.css";
import { useSelector } from 'react-redux';

const FGP = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className='center_fgp align-items-start justify-content-start container_fgp'>
      <span className={`userdiv ${isSidebarOpen ? `open ${MoreJobDetailsFlag ? 'w-100' : ''}` : 'closed'}`}>
        <UserData />
      </span>

      {/* HomePage takes the remaining width */}
      <span className={`homediv ${isSidebarOpen ? `expanded ${MoreJobDetailsFlag ? 'd-none' : ''}` : ''}`}>
        <HomePage toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </span>
    </div>
  );
}

export default FGP;

