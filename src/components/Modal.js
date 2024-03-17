import React from 'react';
import { useState } from 'react';


function Modal({ isPopupOpen, toggleModal, modalMeal }) {
    // console.log(modalMeal);
    const checkYouTubeVideoExists = async (videoId) => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_API_KEY&part=snippet`);
            const data = await response.json();
            return data.items.length > 0; // Returns true if video exists, false otherwise
        } catch (error) {
            console.error('Error checking YouTube video:', error);
            return false; // Assume video doesn't exist in case of error
        }
    };

    const [showAllContent, setShowAllContent] = useState(false);

    const instructions = modalMeal.menuItemDetails.strInstructions;

    // Split the instructions into words
    const words = instructions.split(/\s+/);

    // Determine if the content exceeds 50 words
    const isLongContent = words.length > 150;

    // Display either the first 50 words or all content based on showAllContent state
    const displayContent = isLongContent && !showAllContent ? words.slice(0, 150).join(' ') + '...' : instructions;

    return (
        <>
            {isPopupOpen && (
                <div className="fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" onClick={toggleModal}>
                    <div className="bg-white p-5 rounded-lg " onClick={(e) => e.stopPropagation()}>
                        {/* <div className=' relative'>
                            <button
                                type="button"
                                class="absolute top-0 right-0 p-2"
                                data-twe-modal-dismiss
                                onClick={toggleModal}
                                aria-label="Close">
                                <span class="[&>svg]:h-6 [&>svg]:w-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#333333"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </button>
                        </div> */}

                        {modalMeal.menuItemDetails && (

                            <div className='w-600'>
                                <div className='modal-image'>
                                    {modalMeal.menuItemDetails.strYoutube ? (
                                        <iframe
                                            title="YouTube Video"
                                            width="100%"
                                            height="315"
                                            className='rounded-lg'
                                            src={`https://www.youtube.com/embed/${modalMeal.menuItemDetails.strYoutube.substr(-11)}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img src={modalMeal.strMealThumb} alt={modalMeal.strMeal} className="w-full mb-4 rounded-lg" />
                                    )}
                                </div>
                                <h2 className="text-base font-medium pt-2">{modalMeal.strMeal}</h2>

                                <div className="meals-rating flex">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true">
                                        <circle cx="10" cy="10" r="9" fill="url(#paint0_linear)"></circle>
                                        <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path>
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#21973B"></stop>
                                                <stop offset="1" stop-color="#128540"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className='ml-1 font-bold text-sm'>{modalMeal.rating}</span>
                                </div>
                                <p className="text-gray-500 mt-1 text-sm">{modalMeal.menuItemDetails.strCategory}</p>
                                <h4 className="font-medium text-sm mt-1">Cooking Instructions:</h4>
                                <ul className='modal-ingredients text-sm'>
                                    {Object.keys(modalMeal.menuItemDetails).map(key => {
                                        if (key.startsWith('strIngredient') && modalMeal.menuItemDetails[key]) {
                                            const ingredientNumber = key.slice('strIngredient'.length); // Extract the ingredient number
                                            const measureKey = `strMeasure${ingredientNumber}`;
                                            return (
                                                <li key={ingredientNumber}>
                                                    <span className='text-gray-500  text-sm px-1'>
                                                        {modalMeal.menuItemDetails[key]} - {modalMeal.menuItemDetails[measureKey]} |
                                                    </span>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                                {/* <p className="text-gray-500 mt-1 text-base">{modalMeal.menuItemDetails.strInstructions}</p> */}
                                <p className="text-gray-500 mt-1 text-sm mb-3">
                                    {displayContent}
                                    {isLongContent && (
                                        <button onClick={() => setShowAllContent(!showAllContent)} className="color-orange text-sm font-medium focus:outline-none ml-1">
                                            {showAllContent ? 'Read Less' : 'Read More'}
                                        </button>
                                    )}
                                </p>
                                {modalMeal.menuItemDetails.strSource && (
                                    <a href={modalMeal.menuItemDetails.strSource} target='_blank' className='text-sm  border border-solid border-gray-600 py-1 px-3 rounded' >Read Full Recipe</a>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            )}

        </>
    );
}

export default Modal;
