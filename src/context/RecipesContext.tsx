import { createContext } from 'react';
import { Meal, Drink, SearchRadioType, CategoryItem } from '../types/recipe';

export interface RecipesContextType {
  categoryFilter: string;
  filtredMeals: Meal[];
  filtredDrinks: Drink[];
  radioValue: SearchRadioType | '';
  initialMeals: Meal[];
  initialDrinks: Drink[];
  isRecipeDone: boolean;
  filtredCategoryMeals: Meal[];
  filtredCategoryDrinks: Drink[];
  filterButtons: CategoryItem[];
  setRadioValue: (val: SearchRadioType | '') => void;
  handleFetchSearch: (search: string) => Promise<void>;
  setFiltredDrinks: (drinks: Drink[]) => void;
  setCategoryFilter: (category: string) => void;
  setFiltredCategoryMeals: (meals: Meal[]) => void;
  setFiltredCategoryDrinks: (drinks: Drink[]) => void;
  setIsRecipeDone: (done: boolean) => void;
  setFilterButtons: (buttons: CategoryItem[]) => void;
  setInitialMeals: (meals: Meal[]) => void;
  isLoading: boolean;
  toastMessage: string;
  showToast: boolean;
  triggerToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

const RecipesContext = createContext<RecipesContextType>({} as RecipesContextType);

export default RecipesContext;
