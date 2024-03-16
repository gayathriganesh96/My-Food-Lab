import React, { useState, useEffect } from 'react';
import AreasDropdown from './AreasDropdown';
import Meal from './Meal';
import SortDropdown from './SortDropdown';

export default function Filters() {

    const [isOpen, setIsOpen] = useState(false);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [meals, setMeals] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortedMeals, setSortedMeals] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [modalMeal, setModalMeal] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then(response => response.json())
            .then(
                data => {
                    setAreas(data.meals)
                }
            )
            .catch(error => {
                console.log('Error fetching drop down items');
            });
    }, []);


    const handleAreaSelection = (area) => {
        console.log('selected', area);
        // setSelectedArea(area);
        if (selectedArea.includes(area)) {
            setSelectedArea(prevSelectedArea => [...prevSelectedArea.filter(selectedArea => selectedArea !== area)]);
        } else {
            setSelectedArea(prevSelectedArea => [...prevSelectedArea, area]);
        }
    }

    const clearSelection = () => {
        setSelectedArea([]);
    }

    const applyFilters = () => {
        if (selectedArea.length > 0) {
            Promise.all(selectedArea.map(area => (
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
                    .then(response => response.json())
            )))
                .then(mealsData => {
                    const mealPromises = mealsData.flatMap(data => data.meals).map(async meal => {
                        const categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                        const categoryData = await categoryResponse.json();
                        const category = categoryData.meals[0].strCategory;
                        const rating = (Math.random() * (5 - 3) + 3).toFixed(1);

                        return { ...meal, category, rating };
                    });
                    return Promise.all(mealPromises);
                })
                .then(mealsWithCategory => {
                    setMeals(mealsWithCategory);
                    setIsOpen(false);
                    setSortBy('');
                })
                .catch(error => {
                    console.log('Error fetching selected area meals');
                })
        }
    }


    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian`)
            .then(response => response.json())
            .then(
                data => {
                    // setMeals(data.meals)
                    const mealPromises = data.meals.map(async meal => {
                        const categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                        const categoryData = await categoryResponse.json();

                        //const rating = Math.floor(Math.random() * 5) + 1;
                        // const rating = (Math.random() * (5 - 1) + 1).toFixed(1);
                        const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
                        return { ...meal, category: categoryData.meals[0].strCategory, rating };

                        // return { ...meal, category: categoryData.meals[0].strCategory };
                    });
                    Promise.all(mealPromises).then(mealsWithCategory => setMeals(mealsWithCategory));

                }
            )
            .catch(error => {
                console.log('Error fetching Indian , meals', error);
            })
    }, []);

    // useEffect(() => {
    //     const sortedMeals = [...meals];
    //     if (sortBy === 'descending') {
    //         sortedMeals.sort((a, b) => b.strMeal.localecompare(a.strMeal));
    //     } else {
    //         sortedMeals.sort((a, b) => a.strMeal.localecompare(b.strMeal));
    //     }
    //     setMeals(sortedMeals);
    // }, [sortBy, meals]);

    // const handleSortByChange = () => {
    //     setSortBy();
    // }

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    useEffect(() => {
        if (sortBy === 'ascending') {
            setMeals(prevMeals => [...prevMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal)));
        } else if (sortBy === 'descending') {
            setMeals(prevMeals => [...prevMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal)));
        }
    }, [sortBy]);

    const toggleModal = (meal) => {
        setModalMeal(meal);
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className='py-5'>
            <h2 className='antialiased font-bold text-2xl break-words pb-4 pt-4'>Restaurants with online food delivery in Pune</h2>
            <div className="filter-buttons relative">
                <button onClick={toggleDropdown} className="border border-solid border-gray-300 filter-btn ">
                    {/* {selectedArea ? `Filter by ${selectedArea}` : "Filter by Area "} */}
                    <div className='flex items-center'>
                        Filter by Area
                        <span className='pl-2'>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3996 5.99897C13.3996 6.66172 12.8623 7.19897 12.1996 7.19897C11.5368 7.19897 10.9996 6.66172 10.9996 5.99897C10.9996 5.33623 11.5368 4.79897 12.1996 4.79897C12.8623 4.79897 13.3996 5.33623 13.3996 5.99897ZM14.9996 5.99897C14.9996 7.54537 13.746 8.79897 12.1996 8.79897C10.9311 8.79897 9.85962 7.95547 9.51546 6.79878L1.80875 6.79878C1.36692 6.79878 1.00875 6.44061 1.00875 5.99878C1.00875 5.55695 1.36692 5.19878 1.80875 5.19878L9.51558 5.19878C9.85986 4.04228 10.9312 3.19897 12.1996 3.19897C13.746 3.19897 14.9996 4.45258 14.9996 5.99897ZM3.8 13.4527C3.13726 13.4527 2.6 12.9154 2.6 12.2527C2.6 11.59 3.13726 11.0527 3.8 11.0527C4.46274 11.0527 5 11.59 5 12.2527C5 12.9154 4.46274 13.4527 3.8 13.4527ZM3.8 15.0527C2.2536 15.0527 1 13.7991 1 12.2527C1 10.7063 2.2536 9.45271 3.8 9.45271C5.0683 9.45271 6.13964 10.296 6.48396 11.4524H14.1953C14.6372 11.4524 14.9953 11.8106 14.9953 12.2524C14.9953 12.6942 14.6372 13.0524 14.1953 13.0524H6.48414C6.14001 14.2092 5.06852 15.0527 3.8 15.0527Z" fill="rgba(2, 6, 12, 0.92)" fill-opacity="0.92"></path>
                            </svg>
                        </span>
                    </div>
                </button>

                {isOpen && <AreasDropdown areas={areas} handleAreaSelection={handleAreaSelection} applyFilters={applyFilters} selectedArea={selectedArea} clearSelection={clearSelection} />}

                {/* <div className='flex items-center mt-4'>
                    {selectedArea.length > 0 && (
                        <div className='mr-2'>Selected Areas : {selectedArea.join(', ')}</div>
                    )}
                </div> */}
                <SortDropdown handleSortByChange={handleSortByChange} />

                <button className="border border-solid border-gray-300  filter-btn">
                    Fast Delivery
                </button>
                <button className="border border-solid border-gray-300  filter-btn">
                    Ratings 4.0+
                </button>
                <button className="border border-solid border-gray-300  filter-btn">
                    Offers
                </button>
            </div >
            <div className="grid grid-cols-4 gap-8 py-5 pt-10">
                {meals !== null && (
                    meals.map(meal => (
                        <div key={meal.idMeal}>
                            <Meal key={meal.idMeal} meal={meal} />
                        </div>
                    ))

                )}
            </div>
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg">
                        {/* Display modal content with meal details */}
                        <h2 className="text-2xl font-bold mb-4">{modalMeal.strMeal}</h2>
                        <img src={modalMeal.strMealThumb} alt={modalMeal.strMeal} className="w-full mb-4" />
                        <p>{modalMeal.strInstructions}</p>
                        <button onClick={toggleModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Close Modal</button>
                    </div>
                </div>
            )}
        </div >
    )
}