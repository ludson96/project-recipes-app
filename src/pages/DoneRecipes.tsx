import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { DoneRecipe, RecipeType } from '../types/recipe';
import Toast from '../components/Toast';
import imageProfile from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { FiCalendar } from 'react-icons/fi';

const DoneRecipes: React.FC = () => {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [filterType, setFilterType] = useState<'all' | RecipeType>('all');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    // Carregar dinamicamente do localStorage real
    const saved = localStorage.getItem('doneRecipes');
    if (saved) {
      try {
        setDoneRecipes(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing doneRecipes from localStorage', e);
      }
    }
  }, []);

  const handleShare = (type: RecipeType, id: string) => {
    const route = type === 'meal' ? 'meals' : 'drinks';
    copy(`${window.location.origin}/${route}/${id}`);
    triggerToast('Link copiado!');
  };

  const filteredRecipes = doneRecipes.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="app-container pb-16 min-h-screen bg-stone-50">
      <Toast message={toastMessage} show={showToast} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-3.5 flex items-center justify-between">
        <Link to="/profile" className="p-1 rounded-full hover:bg-stone-100 transition-colors">
          <img
            src={imageProfile}
            alt="imagem de perfil"
            data-testid="profile-top-btn"
            className="w-6 h-6 object-contain"
          />
        </Link>
        <h1 data-testid="page-title" className="text-base font-extrabold text-stone-800">
          Receitas Feitas
        </h1>
        <div className="w-6" />
      </header>

      {/* Filtros em Pill Buttons */}
      <div className="flex items-center justify-center gap-2 p-4 bg-white border-b border-stone-100">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={() => setFilterType('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Todas
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={() => setFilterType('meal')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'meal'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Comidas
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={() => setFilterType('drink')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'drink'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Bebidas
        </button>
      </div>

      {/* Lista de Receitas Concluídas */}
      <div className="p-4 space-y-4">
        {filteredRecipes.length === 0 ? (
          <div className="py-16 text-center text-stone-400 flex flex-col items-center">
            <span className="text-4xl mb-3">🍳</span>
            <p className="text-sm font-semibold text-stone-600">Nenhuma receita finalizada ainda.</p>
            <span className="text-xs mt-1">Conclua uma receita para vê-la listada aqui!</span>
            <Link
              to="/meals"
              className="mt-4 px-4 py-2 bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Explorar Receitas
            </Link>
          </div>
        ) : (
          filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col sm:flex-row"
            >
              <Link
                to={`/${recipe.type}s/${recipe.id}`}
                className="relative w-full sm:w-40 aspect-4/3 sm:aspect-square bg-stone-100 shrink-0"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  data-testid={`${index}-horizontal-image`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-stone-900/75 text-white text-[10px] font-semibold backdrop-blur-xs">
                  {recipe.type === 'meal' ? 'Comida' : 'Bebida'}
                </span>
              </Link>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        data-testid={`${index}-horizontal-top-text`}
                        className="text-[11px] font-bold uppercase tracking-wider text-brand-500"
                      >
                        {recipe.type === 'meal'
                          ? `${recipe.nationality} • ${recipe.category}`
                          : `${recipe.alcoholicOrNot} • ${recipe.category}`}
                      </p>
                      <Link to={`/${recipe.type}s/${recipe.id}`}>
                        <h3
                          data-testid={`${index}-horizontal-name`}
                          className="text-sm font-extrabold text-stone-900 hover:text-brand-600 transition-colors line-clamp-1"
                        >
                          {recipe.name}
                        </h3>
                      </Link>
                    </div>

                    <button
                      type="button"
                      data-testid={`${index}-horizontal-share-btn`}
                      onClick={() => handleShare(recipe.type, recipe.id)}
                      className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                      title="Compartilhar"
                    >
                      <img src={shareIcon} alt="share" className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-stone-400">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>Feita em:</span>
                    <span
                      data-testid={`${index}-horizontal-done-date`}
                      className="font-medium text-stone-600"
                    >
                      {recipe.doneDate}
                    </span>
                  </div>
                </div>

                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-stone-100">
                    {recipe.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        data-testid={`${index}-${tag}-horizontal-tag`}
                        className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoneRecipes;
