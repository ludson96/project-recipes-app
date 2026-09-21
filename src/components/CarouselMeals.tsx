import React, { useState, useEffect } from 'react';
import { fetchInitialMeals } from '../service/api';
import { Meal } from '../types/recipe';
import { useHistory } from 'react-router-dom';

const CarouselMeals: React.FC = () => {
  const [mealsRecommended, setMealsRecommended] = useState<Meal[]>([]);
  const history = useHistory();

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const meals = await fetchInitialMeals();
        setMealsRecommended(meals.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recommended meals:', error);
      }
    };
    loadMeals();
  }, []);

  if (!mealsRecommended.length) return null;

  return (
    <div className="my-6">
      <h3 className="text-sm font-bold text-stone-800 mb-3 px-4 flex items-center gap-1.5">
        <span>🍲</span> Recomendações de Pratos
      </h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 snap-x">
        {mealsRecommended.map((meal, index) => (
          <div
            key={meal.idMeal}
            data-testid={`${index}-recommendation-card`}
            onClick={() => history.push(`/meals/${meal.idMeal}`)}
            className="shrink-0 w-36 bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer snap-start group"
          >
            <div className="aspect-square w-full overflow-hidden bg-stone-100">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2">
              <p
                data-testid={`${index}-recommendation-title`}
                className="text-xs font-semibold text-stone-800 truncate"
              >
                {meal.strMeal}
              </p>
              <span className="text-[10px] text-stone-400 font-medium">
                {meal.strCategory}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselMeals;
