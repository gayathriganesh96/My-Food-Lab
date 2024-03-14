import React, { useState, useEffect } from 'react';
import AreasDropdown from './AreasDropdown';
import Meal from './Meal';
import SortDropdown from './SortDropdown';

export default function Filters() {

    const [isOpen, setIsOpen] = useState(false);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [meals, setMeals] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortedMeals, setSortedMeals] = useState([]);

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

    useEffect(() => {
        if (selectedArea) {

            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
                .then(response => response.json())
                .then(
                    data => {
                        // setMeals(data.meals)
                        const mealPromises = data.meals.map(async meal => {
                            const categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                            const categoryData = await categoryResponse.json();
                            const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
                            return { ...meal, category: categoryData.meals[0].strCategory, rating };
                        });
                        Promise.all(mealPromises).then(mealsWithCategory => setMeals(mealsWithCategory));
                    }
                )
                .catch(error => {
                    console.log('Error fetching meals');
                })
        }
    }, [selectedArea, sortBy]);

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

    const handleAreaSelection = (area) => {
        setSelectedArea(area);
        setIsOpen(false);
    }

    const handleSort = (event) => {
        const sortByValue = event.target.value;
        setSortBy(sortByValue);
        const sorted = [...meals].sort((a, b) => {
            if (sortByValue === 'ascending') {
                return a.strMeal.localeCompare(b.strMeal);
            } else if (sortByValue === 'descending') {
                return b.strMeal.localeCompare(a.strMeal);
            } else {
                return 0;
            }
        });
        setMeals(sorted);
    };



    return (
        <div className='py-5'>
            <h2 className='antialiased font-bold text-2xl break-words pb-4 pt-4'>Restaurants with online food delivery in Pune</h2>
            <div className="filter-buttons relative">
                <button onClick={toggleDropdown} className="border border-solid border-gray-300  filter-btn">
                    {selectedArea ? `Filter by ${selectedArea}` : "Filter by Area"}
                </button>

                {isOpen && <AreasDropdown areas={areas} handleAreaSelection={handleAreaSelection} />}

                <SortDropdown handleSort={handleSort} />

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
        </div >
    )
}