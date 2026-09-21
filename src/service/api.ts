import axios from 'axios';
import { Meal, Drink, CategoryItem } from '../types/recipe';

const mealsClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

const drinksClient = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

// =================== MEALS API ===================

export const fetchInitialMeals = async (): Promise<Meal[]> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>('/search.php?s=');
  return data.meals || [];
};

export const fetchMealsByIngredient = async (ingredient: string): Promise<Meal[]> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return data.meals || [];
};

export const fetchMealsByName = async (name: string): Promise<Meal[]> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>(`/search.php?s=${encodeURIComponent(name)}`);
  return data.meals || [];
};

export const fetchMealsByFirstLetter = async (letter: string): Promise<Meal[]> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>(`/search.php?f=${encodeURIComponent(letter)}`);
  return data.meals || [];
};

export const fetchMealsCategory = async (category: string): Promise<Meal[]> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>(`/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
};

export const fetchMealRecipeById = async (id: string): Promise<Meal | null> => {
  const { data } = await mealsClient.get<{ meals: Meal[] | null }>(`/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals ? data.meals[0] : null;
};

export const fetchButtonMealsCategory = async (): Promise<CategoryItem[]> => {
  const { data } = await mealsClient.get<{ meals: CategoryItem[] | null }>('/list.php?c=list');
  return data.meals || [];
};

// =================== DRINKS API ===================

export const fetchInitialDrinks = async (): Promise<Drink[]> => {
  try {
    const { data } = await drinksClient.get<{ drinks: Drink[] | string | null }>('/search.php?s=');
    if (Array.isArray(data.drinks)) return data.drinks;
    // Fallback: se search.php?s= retornar 'no data found', busca alfabeticamente
    const fallback = await drinksClient.get<{ drinks: Drink[] | null }>('/search.php?f=a');
    return Array.isArray(fallback.data.drinks) ? fallback.data.drinks : [];
  } catch {
    return [];
  }
};

export const fetchDrinksByIngredient = async (ingredient: string): Promise<Drink[]> => {
  const { data } = await drinksClient.get<{ drinks: Drink[] | null }>(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return Array.isArray(data.drinks) ? data.drinks : [];
};

export const fetchDrinksByName = async (name: string): Promise<Drink[]> => {
  const { data } = await drinksClient.get<{ drinks: Drink[] | string | null }>(`/search.php?s=${encodeURIComponent(name)}`);
  return Array.isArray(data.drinks) ? data.drinks : [];
};

export const fetchDrinksByFirstLetter = async (letter: string): Promise<Drink[]> => {
  const { data } = await drinksClient.get<{ drinks: Drink[] | null }>(`/search.php?f=${encodeURIComponent(letter)}`);
  return Array.isArray(data.drinks) ? data.drinks : [];
};

export const fetchDrinksCategory = async (category: string): Promise<Drink[]> => {
  const { data } = await drinksClient.get<{ drinks: Drink[] | null }>(`/filter.php?c=${encodeURIComponent(category)}`);
  return Array.isArray(data.drinks) ? data.drinks : [];
};

export const fetchDrinkRecipeById = async (id: string): Promise<Drink | null> => {
  const { data } = await drinksClient.get<{ drinks: Drink[] | null }>(`/lookup.php?i=${encodeURIComponent(id)}`);
  return data.drinks ? data.drinks[0] : null;
};

export const fetchButtonDrinksCategory = async (): Promise<CategoryItem[]> => {
  const { data } = await drinksClient.get<{ drinks: CategoryItem[] | null }>('/list.php?c=list');
  return data.drinks || [];
};
