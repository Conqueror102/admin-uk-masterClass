import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaBars, FaClipboardList } from 'react-icons/fa';

const DashBoard = ({ overView, candidate, isOverviewActive, isCandidatesActive }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='relative max-sm:hidden '>
      <div className={`bg-green-800 h-screen py-10 px-7 space-y-4 sticky top-0 transition-transform duration-300 ${isVisible ? 'transform translate-x-0 w-60' : 'transform -translate-x-[250px] w-0'}`}>
        
        <div className='flex items-center gap-3 text-white font-medium   mb-8 cursor-pointer' onClick={toggleVisibility}>
        < FaClipboardList  />
        <span >Dashboard</span>
        </div>

        <p
          className={`py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer  ${
            isOverviewActive ? 'bg-white text-black' : 'text-white'
          }`}
          onClick={overView}
        >
          <FaTachometerAlt className='inline-block mr-2' /> Overview
        </p>

        <p
          className={`py-3 px-3 hover:bg-white hover:text-black rounded-md font-medium cursor-pointer ${
            isCandidatesActive ? 'bg-white text-black' : 'text-white'
          }`}
          onClick={candidate}
        >
          <FaUsers className='inline-block mr-2' /> Candidates
        </p>

      </div>

      {!isVisible && (
        <div className='flex flex-col fixed top-0 left-0 h-screen gap-6 items-center bg-green-800 text-white px-2 pt-5'>
          <FaClipboardList className='text-2xl cursor-pointer' onClick={toggleVisibility} />
          <FaTachometerAlt className='text-2xl cursor-pointer' onClick={overView} />
          <FaUsers className='text-2xl cursor-pointer' onClick={candidate} />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
