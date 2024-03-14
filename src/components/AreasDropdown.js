import React from 'react';

const AreasDropdown = ({ areas, handleAreaSelection }) => (
    <div className="absolute z-10 mt-2 w-100 bg-white shadow-lg rounded border grid grid-cols-3">
        {areas.map(area => (
            <button
                key={area.strArea}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleAreaSelection(area.strArea)}
            >
                {area.strArea}
            </button>
        ))}
    </div>
);

export default AreasDropdown;
