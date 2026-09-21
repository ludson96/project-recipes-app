import React, { useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByFirstLetter,
  fetchDrinksByName,
  fetchInitialMeals,
  fetchInitialDrinks,
  fetchMealsCategory,
  fetchDrinksCategory,
} from '../service/api';
import { Meal, Drink, SearchRadioType, CategoryItem } from '../types/recipe';

interface Props {
  children: ReactNode;
}

const TWELVE = 12;
const slicer = <T,>(arr: T[] | null | undefined): T[] => (Array.isArray(arr) ? arr.slice(0, TWELVE) : []);

const RecipesProvider: React.FC<Props> = ({ children }) => {
  const [filtredMeals, setFiltredMeals] = useState<Meal[]>([]);
  const [filtredDrinks, setFiltredDrinks] = useState<Drink[]>([]);
  const [initialMeals, setInitialMeals] = useState<Meal[]>([]);
  const [initialDrinks, setInitialDrinks] = useState<Drink[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [filterButtons, setFilterButtons] = useState<CategoryItem[]>([]);
  const [filtredCategoryMeals, setFiltredCategoryMeals] = useState<Meal[]>([]);
  const [filtredCategoryDrinks, setFiltredCategoryDrinks] = useState<Drink[]>([]);
  const [radioValue, setRadioValue] = useState<SearchRadioType | ''>('');
  const [isRecipeDone, setIsRecipeDone] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const history = useHistory();

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [meals, drinks] = await Promise.all([
          fetchInitialMeals(),
          fetchInitialDrinks(),
        ]);
        setInitialMeals(slicer(meals));
        setInitialDrinks(slicer(drinks));
      } catch (err) {
        console.error('Error loading initial recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleFetchSearch = async (search: string) => {
    const pathname = history?.location?.pathname || window.location.pathname;
    setIsLoading(true);

    try {
      switch (radioValue) {
        case 'ingredient':
          if (pathname === '/meals') {
            const res = await fetchMealsByIngredient(search);
            if (!res || res.length === 0) {
              triggerToast('Nenhuma receita encontrada para este ingrediente.');
            }
            setFiltredMeals(slicer(res));
          } else if (pathname === '/drinks') {
            const res = await fetchDrinksByIngredient(search);
            if (!res || res.length === 0) {
              triggerToast('Nenhuma bebida encontrada para este ingrediente.');
            }
            setFiltredDrinks(slicer(res));
          }
          break;

        case 'name':
          if (pathname === '/meals') {
            const res = await fetchMealsByName(search);
            if (!res || res.length === 0) {
              triggerToast('Nenhuma receita encontrada com esse nome.');
            }
            setFiltredMeals(slicer(res));
          } else if (pathname === '/drinks') {
            const res = await fetchDrinksByName(search);
            if (!res || res.length === 0) {
              triggerToast('Nenhuma bebida encontrada com esse nome.');
            }
            setFiltredDrinks(slicer(res));
          }
          break;

        case 'firstLetter':
          if (search.length !== 1) {
            triggerToast('Sua busca deve conter apenas 1 (um) caractere.');
            return;
          }
          if (pathname === '/meals') {
            const res = await fetchMealsByFirstLetter(search);
            setFiltredMeals(slicer(res));
          } else if (pathname === '/drinks') {
            const res = await fetchDrinksByFirstLetter(search);
            setFiltredDrinks(slicer(res));
          }
          break;

        default:
          break;
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleFetchCategory = async () => {
      if (!categoryFilter || categoryFilter === 'All') {
        setFiltredCategoryMeals([]);
        setFiltredCategoryDrinks([]);
        return;
      }

      setIsLoading(true);
      try {
        const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
        const categoryDrinks = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

        if (categoryMeals.includes(categoryFilter)) {
          const res = await fetchMealsCategory(categoryFilter);
          setFiltredCategoryMeals(slicer(res));
        } else if (categoryDrinks.includes(categoryFilter)) {
          const res = await fetchDrinksCategory(categoryFilter);
          setFiltredCategoryDrinks(slicer(res));
        }
      } catch (err) {
        console.error('Category error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchCategory();
  }, [categoryFilter]);

  const contextValue = {
    categoryFilter,
    filtredMeals,
    filtredDrinks,
    radioValue,
    initialMeals,
    initialDrinks,
    isRecipeDone,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    filterButtons,
    setRadioValue,
    handleFetchSearch,
    setFiltredDrinks,
    setCategoryFilter,
    setFiltredCategoryMeals,
    setFiltredCategoryDrinks,
    setIsRecipeDone,
    setFilterButtons,
    setInitialMeals,
    isLoading,
    toastMessage,
    showToast,
    triggerToast,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
