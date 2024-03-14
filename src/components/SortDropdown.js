import React from 'react';

const SortDropdown = ({ handleSort }) => {
    return (
        <select onChange={handleSort} className="border border-solid border-gray-300 filter-btn">
            <option value="">Sort By Alphabetically</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
    );
};

export default SortDropdown;
