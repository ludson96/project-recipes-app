import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showSearch = true }) => {
  const [renderSearchBar, setRenderSearchBar] = useState<boolean>(false);
  const location = useLocation();

  const getPageTitle = () => {
    if (title) return title;
    if (location.pathname.startsWith('/meals')) return 'Refeições';
    if (location.pathname.startsWith('/drinks')) return 'Bebidas & Drinks';
    if (location.pathname.startsWith('/profile')) return 'Meu Perfil';
    if (location.pathname.startsWith('/done-recipes')) return 'Receitas Feitas';
    if (location.pathname.startsWith('/favorite-recipes')) return 'Favoritos';
    return 'GourmetLab';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="flex items-center justify-between px-4 py-3.5">
        <Link
          to="/profile"
          className="p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          title="Perfil"
        >
          <img
            src={imageProfile}
            alt="imagem de perfil"
            data-testid="profile-top-btn"
            className="w-6 h-6 object-contain"
          />
        </Link>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-500">GourmetLab</span>
          <h1 data-testid="page-title" className="text-base font-extrabold text-stone-800">
            {getPageTitle()}
          </h1>
        </div>

        {showSearch ? (
          <button
            data-testid="search-top-btn"
            type="button"
            onClick={() => setRenderSearchBar((prev) => !prev)}
            className={`p-2 rounded-full transition-all ${
              renderSearchBar ? 'bg-brand-50 text-brand-500' : 'hover:bg-stone-100 text-stone-700'
            }`}
            title="Buscar"
          >
            <img
              src={imageSearch}
              alt="Buscar"
              className="w-5 h-5 object-contain"
            />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {renderSearchBar && <SearchBar />}
      {showSearch && <FilterButton />}
    </header>
  );
};

export default Header;
