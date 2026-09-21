import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer: React.FC = () => {
  const location = useLocation();
  const isDrinks = location.pathname.startsWith('/drinks');
  const isMeals = location.pathname.startsWith('/meals');

  return (
    <footer
      data-testid="footer"
      className="sticky bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-6 py-2.5 z-40 shadow-lg flex justify-around items-center"
    >
      <Link
        to="/drinks"
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isDrinks ? 'text-brand-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <img
          src={drinkIcon}
          alt="Bebidas"
          data-testid="drinks-bottom-btn"
          className={`w-7 h-7 transition-transform ${isDrinks ? 'brightness-90 filter drop-shadow' : 'opacity-70'}`}
        />
        <span className="text-[11px] uppercase tracking-wider font-semibold">Drinks</span>
      </Link>

      <Link
        to="/meals"
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isMeals ? 'text-brand-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <img
          src={mealIcon}
          alt="Comidas"
          data-testid="meals-bottom-btn"
          className={`w-7 h-7 transition-transform ${isMeals ? 'brightness-90 filter drop-shadow' : 'opacity-70'}`}
        />
        <span className="text-[11px] uppercase tracking-wider font-semibold">Meals</span>
      </Link>
    </footer>
  );
};

export default Footer;
