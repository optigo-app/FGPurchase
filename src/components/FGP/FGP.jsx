// import React from 'react'
// import UserData from '../UserDetail/UserData';
// import HomePage from '../HomePage/HomePage';
// import "../globalCss/GlobalCssClasses.css";
// import "./fgp.css"

// const FGP = () => {
  
//   return (
//     <>
//         <div className='center_fgp align-items-start'>
//             <span className='userdiv'><UserData /></span>
//             <span className='homediv'><HomePage /></span>
//         </div>
//     </>
//   )
// }

// export default FGP;

import React, { useState } from 'react';
import UserData from '../UserDetail/UserData';
import HomePage from '../HomePage/HomePage';
import "../globalCss/GlobalCssClasses.css";
import "./fgp.css";
import { useSelector } from 'react-redux';

const FGP = () => {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);

    
  };

  return (
    <div className='center_fgp align-items-start justify-content-start container_fgp'>
      {/* Button to toggle sidebar */}
      {/* <button 
        className="toggle-btn"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button> */}

      {/* Conditionally render UserData component based on the state */}
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

