import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers } from 'react-icons/fa';

const DashBoard = ({ overView, candidate, isOverviewActive, isCandidatesActive }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='relative max-sm:hidden bg-amber-100'>
      <div className={` bg-green-800 h-screen py-10 px-7 space-y-4 sticky top-0 transition-transform duration-300 ${isVisible ? 'transform translate-x-0 w-60' : 'transform -translate-x-[250px] w-0'}`}>
        <p className='text-white py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer' onClick={toggleVisibility}>DashBoard</p>
        <p className={`py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer ${isOverviewActive ? 'bg-white text-black' : 'text-white hover:bg-white hover:text-black'}`} onClick={overView}>
          <FaTachometerAlt className='inline-block mr-2' /> Overview
        </p>
        <p className={`py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer ${isCandidatesActive ? 'bg-white text-black' : 'text-white hover:bg-white hover:text-black'}`} onClick={candidate}>
          <FaUsers className='inline-block mr-2' /> Candidates
        </p>
        {/* <p className='text-white py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer'>Pending</p> */}
      </div>
      {!isVisible && (
        <div className='flex flex-col fixed top-0 left-0 h-screen gap-3 items-center  bg-green-800 text-white px-2 pt-5 max-sm:px- max-sm:py'>
          <div  onClick={toggleVisibility}>1</div>
          <FaTachometerAlt className='inline-block mr-2 text-2xl'  onClick={overView}/>
          <FaUsers className='inline-block mr-2 text-2xl' onClick={candidate}/>
        </div>
      )}
    </div>
  );
};

export default DashBoard;