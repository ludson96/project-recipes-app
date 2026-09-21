export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string | null;
  strYoutube?: string | null;
  [key: string]: string | null | undefined;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null | undefined;
}

export interface CategoryItem {
  strCategory: string;
}

export type RecipeType = 'meal' | 'drink';

export interface FavoriteRecipe {
  id: string;
  type: RecipeType;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
}

export interface DoneRecipe {
  id: string;
  type: RecipeType;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}

export interface InProgressRecipesStorage {
  meals: Record<string, string[]>; // { [id]: ['ingredient1', 'ingredient2'] }
  drinks: Record<string, string[]>;
}

export type SearchRadioType = 'ingredient' | 'name' | 'firstLetter';
