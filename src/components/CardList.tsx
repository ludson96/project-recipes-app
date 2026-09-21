import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { Meal, Drink } from '../types/recipe';
import { FiClock, FiChevronRight } from 'react-icons/fi';

const CardList: React.FC = () => {
  const {
    filtredMeals,
    filtredDrinks,
    initialMeals,
    initialDrinks,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    categoryFilter,
    isLoading,
  } = useContext(RecipesContext);

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const getVisibleMeals = (): Meal[] => {
    if (categoryFilter && filtredCategoryMeals.length > 0) return filtredCategoryMeals;
    if (filtredMeals.length > 0) return filtredMeals;
    return initialMeals;
  };

  const getVisibleDrinks = (): Drink[] => {
    if (categoryFilter && filtredCategoryDrinks.length > 0) return filtredCategoryDrinks;
    if (filtredDrinks.length > 0) return filtredDrinks;
    return initialDrinks;
  };

  // Se pesquisa direta retornar exatamente 1 resultado, redireciona para detalhes (mantendo comportamento original)
  React.useEffect(() => {
    if (filtredMeals.length === 1 && pathname === '/meals') {
      history.push(`/meals/${filtredMeals[0].idMeal}`);
    }
    if (filtredDrinks.length === 1 && pathname === '/drinks') {
      history.push(`/drinks/${filtredDrinks[0].idDrink}`);
    }
  }, [filtredMeals, filtredDrinks, pathname, history]);

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-2 gap-3.5 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-stone-200/60 h-52 rounded-2xl" />
        ))}
      </div>
    );
  }

  const isMealsPage = pathname === '/meals';
  const items = isMealsPage ? getVisibleMeals() : getVisibleDrinks();

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-stone-400">
        <span className="text-4xl mb-3">🍳</span>
        <p className="text-sm font-medium text-stone-600">Nenhuma receita encontrada.</p>
        <span className="text-xs mt-1">Tente pesquisar por outro termo ou categoria.</span>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 grid grid-cols-2 gap-3.5">
      {items.map((item, index) => {
        const id = isMealsPage ? (item as Meal).idMeal : (item as Drink).idDrink;
        const name = isMealsPage ? (item as Meal).strMeal : (item as Drink).strDrink;
        const thumb = isMealsPage ? (item as Meal).strMealThumb : (item as Drink).strDrinkThumb;
        const category = isMealsPage ? (item as Meal).strCategory : (item as Drink).strCategory;

        return (
          <div
            key={id}
            data-testid={`${index}-recipe-card`}
            onClick={() => history.push(`/${isMealsPage ? 'meals' : 'drinks'}/${id}`)}
            className="group relative bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-card hover:border-brand-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
              <img
                src={thumb}
                alt={name}
                data-testid={`${index}-card-img`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {category && (
                <span className="absolute top-2 left-2 bg-stone-900/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {category}
                </span>
              )}
            </div>

            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <h4
                  data-testid={`${index}-card-name`}
                  className="text-xs font-bold text-stone-800 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors"
                >
                  {name}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3 text-brand-500" />
                  ~25 min
                </span>
                <span className="font-semibold text-brand-500 flex items-center group-hover:translate-x-0.5 transition-transform">
                  Ver <FiChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
