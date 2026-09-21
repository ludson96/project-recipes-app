import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { SearchRadioType } from '../types/recipe';
import { FiSearch } from 'react-icons/fi';

const SearchBar: React.FC = () => {
  const { setRadioValue, handleFetchSearch, radioValue } = useContext(RecipesContext);
  const [search, setSearch] = useState<string>('');

  const handleRadio = (val: SearchRadioType) => {
    setRadioValue(val);
  };

  const handleSearchClick = () => {
    handleFetchSearch(search);
  };

  return (
    <div
      data-testid="search-bar-content"
      className="p-4 bg-stone-50 border-b border-stone-200/80 rounded-b-2xl shadow-sm transition-all duration-300 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            placeholder="Pesquise por receitas ou ingredientes..."
            type="text"
            data-testid="search-input"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            className="w-full pl-3.5 pr-10 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-stone-400 shadow-sm"
          />
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={handleSearchClick}
          className="px-4 py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5"
        >
          <FiSearch className="w-4 h-4" />
          <span>Buscar</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-1 text-xs text-stone-600 bg-white p-1.5 rounded-xl border border-stone-200/60 shadow-xs">
        <label className={`flex-1 py-1.5 px-2 text-center rounded-lg cursor-pointer transition-all ${
          radioValue === 'ingredient' ? 'bg-brand-50 text-brand-600 font-bold' : 'hover:bg-stone-50'
        }`}>
          <input
            type="radio"
            name="filter"
            data-testid="ingredient-search-radio"
            value="ingredient"
            checked={radioValue === 'ingredient'}
            onChange={() => handleRadio('ingredient')}
            className="sr-only"
          />
          Ingrediente
        </label>

        <label className={`flex-1 py-1.5 px-2 text-center rounded-lg cursor-pointer transition-all ${
          radioValue === 'name' ? 'bg-brand-50 text-brand-600 font-bold' : 'hover:bg-stone-50'
        }`}>
          <input
            type="radio"
            name="filter"
            data-testid="name-search-radio"
            value="name"
            checked={radioValue === 'name'}
            onChange={() => handleRadio('name')}
            className="sr-only"
          />
          Nome
        </label>

        <label className={`flex-1 py-1.5 px-2 text-center rounded-lg cursor-pointer transition-all ${
          radioValue === 'firstLetter' ? 'bg-brand-50 text-brand-600 font-bold' : 'hover:bg-stone-50'
        }`}>
          <input
            type="radio"
            name="filter"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            checked={radioValue === 'firstLetter'}
            onChange={() => handleRadio('firstLetter')}
            className="sr-only"
          />
          1ª Letra
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
