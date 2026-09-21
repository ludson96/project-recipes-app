import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';
import CarouselDrinks from '../components/CarouselDrinks';
import { fetchMealRecipeById } from '../service/api';
import { Meal, FavoriteRecipe, DoneRecipe } from '../types/recipe';
import Toast from '../components/Toast';
import { FiShare2, FiHeart, FiArrowLeft, FiPlay, FiYoutube } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const RecipeMealsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true);
      try {
        const data = await fetchMealRecipeById(id);
        setMeal(data);

        const favs: FavoriteRecipe[] = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        setIsFavorite(favs.some((item) => item.id === id));
      } catch (err) {
        console.error('Error loading meal details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMeal();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!meal) return;
    const favs: FavoriteRecipe[] = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyFav = favs.some((item) => item.id === id);

    let updatedFavs: FavoriteRecipe[];
    if (isAlreadyFav) {
      updatedFavs = favs.filter((item) => item.id !== id);
      setIsFavorite(false);
      triggerToast('Removido dos favoritos!');
    } else {
      const newFav: FavoriteRecipe = {
        id: meal.idMeal,
        type: 'meal',
        nationality: meal.strArea || '',
        category: meal.strCategory || '',
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      updatedFavs = [...favs, newFav];
      setIsFavorite(true);
      triggerToast('Adicionado aos favoritos!');
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavs));
  };

  const handleShare = () => {
    copy(window.location.href);
    triggerToast('Link copiado!');
  };

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i += 1) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        const text = measure && measure.trim() !== '' ? `${ingredient} (${measure.trim()})` : ingredient;
        ingredients.push(text);
      }
    }
    return ingredients;
  };

  // Botão Iniciar / Continuar Receita
  const inProgressData = JSON.parse(localStorage.getItem('inProgressRecipes') || '{"meals":{},"drinks":{}}');
  const isRecipeInProgress = Boolean(inProgressData?.meals?.[id]);

  const doneRecipes: DoneRecipe[] = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const isRecipeDone = doneRecipes.some((recipe) => recipe.id === id);

  const embedURL = (url?: string | null) => {
    if (!url) return null;
    return url.replace('watch?v=', 'embed/');
  };

  if (loading || !meal) {
    return (
      <div className="app-container p-6 animate-pulse space-y-4">
        <div className="w-full h-64 bg-stone-200 rounded-3xl" />
        <div className="h-6 w-3/4 bg-stone-200 rounded" />
        <div className="h-4 w-1/2 bg-stone-200 rounded" />
      </div>
    );
  }

  const ingredients = getIngredients();
  const videoUrl = embedURL(meal.strYoutube);

  return (
    <div className="app-container pb-28">
      <Toast message={toastMessage} show={showToast} />

      {/* Hero Image e Ações Rápidas */}
      <div className="relative w-full h-72 bg-stone-900">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          data-testid="recipe-photo"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Navbar flutuante */}
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
              title="Compartilhar"
            >
              <FiShare2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className="w-10 h-10 rounded-full bg-stone-900/60 backdrop-blur-md flex items-center justify-center hover:bg-stone-900/80 transition-all"
              title="Favoritar"
            >
              {isFavorite ? (
                <FaHeart data-testid="favorite-btn" className="w-5 h-5 text-rose-500" />
              ) : (
                <FiHeart data-testid="favorite-btn" className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Título sobre o Hero */}
        <div className="absolute bottom-4 left-4 right-4">
          <span
            data-testid="recipe-category"
            className="inline-block px-2.5 py-1 bg-brand-500 text-white text-[10px] font-bold rounded-full mb-1.5 uppercase tracking-wider"
          >
            {meal.strCategory} {meal.strArea ? `• ${meal.strArea}` : ''}
          </span>
          <h1
            data-testid="recipe-title"
            className="text-xl font-black text-white leading-tight"
          >
            {meal.strMeal}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Ingredientes */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
          <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
            <span>🥗</span> Ingredientes ({ingredients.length})
          </h3>
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li
                key={index}
                data-testid={`${index}-ingredient-name-and-measure`}
                className="flex items-center gap-2.5 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100 shadow-2xs"
              >
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modo de Preparo */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80">
          <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
            <span>📖</span> Instruções
          </h3>
          <p
            data-testid="instructions"
            className="text-xs text-stone-600 leading-relaxed whitespace-pre-line"
          >
            {meal.strInstructions}
          </p>
        </div>

        {/* Vídeo do YouTube */}
        {videoUrl && (
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80">
            <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <FiYoutube className="w-4 h-4 text-rose-500" /> Vídeo de Demonstração
            </h3>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
              <iframe
                src={videoUrl}
                title={meal.strMeal}
                allowFullScreen
                data-testid="video"
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Carrossel de Recomendações */}
        <CarouselDrinks />
      </div>

      {/* Botão Flutuante Iniciar / Continuar Receita */}
      {!isRecipeDone && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-40">
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={() => history.push(`/meals/${id}/in-progress`)}
            className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-bold text-sm shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-all"
          >
            <FiPlay className="w-4 h-4 fill-white" />
            <span>{isRecipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeMealsDetails;
