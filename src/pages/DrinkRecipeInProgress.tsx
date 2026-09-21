import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkRecipeById } from '../service/api';
import { Drink, FavoriteRecipe, DoneRecipe } from '../types/recipe';
import Toast from '../components/Toast';
import { FiShare2, FiHeart, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const DrinkRecipeInProgress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [drink, setDrink] = useState<Drink | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    const loadDrink = async () => {
      try {
        const data = await fetchDrinkRecipeById(id);
        setDrink(data);

        // Carregar passos salvos no localStorage
        const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{"meals":{},"drinks":{}}');
        if (inProgress?.drinks?.[id]) {
          setCheckedIngredients(inProgress.drinks[id]);
        }

        const favs: FavoriteRecipe[] = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        setIsFavorite(favs.some((item) => item.id === id));
      } catch (err) {
        console.error('Error loading drink in progress:', err);
      }
    };
    loadDrink();
  }, [id]);

  const getIngredients = () => {
    if (!drink) return [];
    const list: string[] = [];
    for (let i = 1; i <= 15; i += 1) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        const text = measure && measure.trim() !== '' ? `${ingredient} (${measure.trim()})` : ingredient;
        list.push(text);
      }
    }
    return list;
  };

  const ingredients = getIngredients();

  const handleCheckboxChange = (ingredientText: string) => {
    let updated: string[];
    if (checkedIngredients.includes(ingredientText)) {
      updated = checkedIngredients.filter((i) => i !== ingredientText);
    } else {
      updated = [...checkedIngredients, ingredientText];
    }
    setCheckedIngredients(updated);

    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{"meals":{},"drinks":{}}');
    if (!inProgress.drinks) inProgress.drinks = {};
    inProgress.drinks[id] = updated;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const handleToggleFavorite = () => {
    if (!drink) return;
    const favs: FavoriteRecipe[] = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyFav = favs.some((item) => item.id === id);

    let updatedFavs: FavoriteRecipe[];
    if (isAlreadyFav) {
      updatedFavs = favs.filter((item) => item.id !== id);
      setIsFavorite(false);
      triggerToast('Removido dos favoritos!');
    } else {
      const newFav: FavoriteRecipe = {
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory || '',
        alcoholicOrNot: drink.strAlcoholic || '',
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      updatedFavs = [...favs, newFav];
      setIsFavorite(true);
      triggerToast('Adicionado aos favoritos!');
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavs));
  };

  const handleShare = () => {
    const url = window.location.href.replace('/in-progress', '');
    copy(url);
    triggerToast('Link copiado!');
  };

  const handleFinishRecipe = () => {
    if (!drink) return;
    const doneRecipes: DoneRecipe[] = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const isAlreadyDone = doneRecipes.some((r) => r.id === id);

    if (!isAlreadyDone) {
      const newDoneRecipe: DoneRecipe = {
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory || '',
        alcoholicOrNot: drink.strAlcoholic || '',
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: new Date().toLocaleDateString('pt-BR'),
        tags: [],
      };
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    }

    history.push('/done-recipes');
  };

  if (!drink) {
    return (
      <div className="app-container p-6 animate-pulse space-y-4">
        <div className="w-full h-64 bg-stone-200 rounded-3xl" />
        <div className="h-6 w-3/4 bg-stone-200 rounded" />
      </div>
    );
  }

  const isAllChecked = ingredients.length > 0 && checkedIngredients.length === ingredients.length;

  return (
    <div className="app-container pb-28">
      <Toast message={toastMessage} show={showToast} />

      {/* Hero Header */}
      <div className="relative w-full h-64 bg-stone-900">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          data-testid="recipe-photo"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-stone-900/80 transition-all"
            title="Voltar"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="share-btn"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-stone-900/80 transition-all"
            >
              <FiShare2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-md flex items-center justify-center hover:bg-stone-900/80 transition-all"
            >
              {isFavorite ? (
                <FaHeart data-testid="favorite-btn" className="w-5 h-5 text-rose-500" />
              ) : (
                <FiHeart data-testid="favorite-btn" className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <span
            data-testid="recipe-category"
            className="inline-block px-2.5 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full mb-1.5 uppercase"
          >
            Em Preparo • {drink.strAlcoholic}
          </span>
          <h1
            data-testid="recipe-title"
            className="text-lg font-black text-white leading-tight"
          >
            {drink.strDrink}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progresso de Ingredientes */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span>🍸</span> Ingredientes e Etapas
            </h3>
            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
              {checkedIngredients.length}/{ingredients.length} prontos
            </span>
          </div>

          <div className="space-y-2">
            {ingredients.map((item, i) => {
              const isChecked = checkedIngredients.includes(item);
              return (
                <label
                  key={i}
                  data-testid={`${i}-ingredient-step`}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900'
                      : 'bg-stone-50 border-stone-200/60 text-stone-700 hover:bg-stone-100/60'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="ingredient"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                    className="mt-0.5 h-4 w-4 rounded text-brand-500 focus:ring-brand-400 cursor-pointer"
                  />
                  <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-stone-400 font-medium' : ''}`}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
            <span>📖</span> Modo de Preparo
          </h3>
          <p
            data-testid="instructions"
            className="text-xs text-stone-600 leading-relaxed whitespace-pre-line"
          >
            {drink.strInstructions}
          </p>
        </div>
      </div>

      {/* Botão Finalizar Receita */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-40">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={!isAllChecked}
          onClick={handleFinishRecipe}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
            isAllChecked
              ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-emerald-600/30'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <FiCheck className="w-4 h-4" />
          <span>Finalizar Receita</span>
        </button>
      </div>
    </div>
  );
};

export default DrinkRecipeInProgress;
