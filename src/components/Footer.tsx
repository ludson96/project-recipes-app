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
      className="mt-auto sticky bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-6 pt-2 pb-5 z-40 shadow-lg flex justify-around items-center"
    >
      <Link
        to="/drinks"
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isDrinks ? 'text-[#41197F] scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <div className={`p-1.5 rounded-2xl transition-all ${isDrinks ? 'bg-[#41197F]/10 shadow-xs ring-2 ring-[#41197F]/20' : ''}`}>
          <img
            src={drinkIcon}
            alt="Bebidas"
            data-testid="drinks-bottom-btn"
            className={`w-6 h-6 transition-transform ${isDrinks ? 'scale-110 filter drop-shadow' : 'opacity-60'}`}
          />
        </div>
        <span className="text-[11px] uppercase tracking-wider font-semibold">Drinks</span>
      </Link>

      <Link
        to="/meals"
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isMeals ? 'text-[#41197F] scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
      >
        <div className={`p-1.5 rounded-2xl transition-all ${isMeals ? 'bg-[#41197F]/10 shadow-xs ring-2 ring-[#41197F]/20' : ''}`}>
          <img
            src={mealIcon}
            alt="Comidas"
            data-testid="meals-bottom-btn"
            className={`w-7 h-7 transition-transform ${isMeals ? 'scale-110 filter drop-shadow' : 'opacity-60'}`}
          />
        </div>
        <span className="text-[11px] uppercase tracking-wider font-semibold">Meals</span>
      </Link>
    </footer>
  );
};

export default Footer;
