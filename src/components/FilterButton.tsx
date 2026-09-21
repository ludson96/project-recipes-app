import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchButtonDrinksCategory, fetchButtonMealsCategory } from '../service/api';
import { CategoryItem } from '../types/recipe';

const FilterButton: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    setFiltredCategoryMeals,
    setFiltredCategoryDrinks,
  } = useContext(RecipesContext);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const location = useLocation();
  const { pathname } = location;

  const FIVE = 5;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (pathname === '/meals') {
          const res = await fetchButtonMealsCategory();
          setCategories(res.slice(0, FIVE));
        } else if (pathname === '/drinks') {
          const res = await fetchButtonDrinksCategory();
          setCategories(res.slice(0, FIVE));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, [pathname]);

  const handleSelectCategory = (catName: string) => {
    if (categoryFilter === catName) {
      setCategoryFilter('');
      setFiltredCategoryMeals([]);
      setFiltredCategoryDrinks([]);
    } else {
      setCategoryFilter(catName);
    }
  };

  const handleCleanFilters = () => {
    setCategoryFilter('');
    setFiltredCategoryMeals([]);
    setFiltredCategoryDrinks([]);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 px-4 bg-white/50 border-b border-stone-100">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={handleCleanFilters}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
          !categoryFilter
            ? 'bg-stone-900 text-white shadow-sm'
            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
        }`}
      >
        Todas
      </button>

      {categories.map((cat, index) => {
        const isActive = categoryFilter === cat.strCategory;
        return (
          <button
            key={index}
            data-testid={`${cat.strCategory}-category-filter`}
            type="button"
            name={cat.strCategory}
            onClick={() => handleSelectCategory(cat.strCategory)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-105'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            {cat.strCategory}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButton;
