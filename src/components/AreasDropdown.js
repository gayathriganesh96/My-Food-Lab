import React from 'react';

function AreasDropdown({ areas, handleAreaSelection, applyFilters, selectedArea, clearSelection }) {
    return (
        <div className="absolute z-10 mt-2 w-100 bg-white shadow-lg rounded border pl-3 pr-3">
            <div className="grid grid-cols-4 gap-4 py-5 pt-5">
                {areas.map(area => (
                    <div>
                        <input type="radio"
                            className='ml-2'
                            onChange={() => handleAreaSelection(area.strArea)}
                            id={area.strArea}
                            checked={selectedArea.includes(area.strArea)} />
                        <label className='pl-2 text-sm' htmlFor={area.strArea}> {area.strArea}</label>
                    </div>
                ))}
            </div>
            <div className='text-center pb-5'>
                <button onClick={clearSelection} className='text-sm color-orange font-extrabold pr-3'>Clear Filters</button>
                <button onClick={applyFilters} className='text-sm py-2 border rounded-2xl filter-btn bg-orange text-gray-50 font-extrabold'>Apply Now</button>
            </div>
        </div>
    );

}

export default AreasDropdown;
