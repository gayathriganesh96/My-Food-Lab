import React, { useState, useEffect } from 'react';

export default function MealList() {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;


    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian')
            .then(response => response.json())
            .then(data => {
                const mealsWithRatings = data.meals.map(meal => ({
                    ...meal,
                    rating: Math.floor(Math.random() * 5) + 1
                }));
                setMeals(mealsWithRatings);
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    }, []);

    const openModal = (meal) => {
        setSelectedMeal(meal);
    };

    const closeModal = () => {
        setSelectedMeal(null);
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = meals.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {meals.map(meal => (
                    <div key={meal.idMeal} className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer" onClick={() => openModal(meal)}>
                        <img className="w-full" src={meal.strMealThumb} alt={meal.strMeal} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{meal.strMeal}</div>
                            <p className="text-gray-700 text-base">Rating: {meal.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedMeal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg ">
                        <div class="flex">
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={closeModal}>X</button>
                            <h2 className="text-xl font-bold mb-4">{selectedMeal.strMeal}</h2>
                        </div>
                        <img className="w-full mb-4" src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
                        <p>{selectedMeal.strInstructions}</p>
                    </div>
                </div>
            )}
            {meals.length > itemsPerPage && (
                <nav className="flex justify-center mt-4">
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(meals.length / itemsPerPage) }, (_, i) => (
                            <li key={i} className={`px-3 py-1 cursor-pointer ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
