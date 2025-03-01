import React from 'react';

const Dropdown = ({ isOpen, onClose, images }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      {images.map((image, index) => (
        <a key={index} href={image.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          {image.name}
        </a>
      ))}
      <button
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Dropdown;