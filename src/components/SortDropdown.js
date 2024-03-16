import React from 'react';

function SortDropdown({ handleSortByChange }) {
    return (
        <select onChange={handleSortByChange} className="border border-solid border-gray-300 filter-btn">
            <option value="">Sort By Alphabetically</option>
            <option value="">Default</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
    );
}


export default SortDropdown;
