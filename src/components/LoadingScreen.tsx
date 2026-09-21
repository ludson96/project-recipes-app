import React from 'react';
import AppLogo from './AppLogo';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Preparando receitas...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-fade-in">
      <div className="relative mb-4">
        {/* Halo de luz suave */}
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
        <AppLogo className="w-20 h-20 relative z-10" pulsing />
      </div>
      <h3 className="text-sm font-extrabold text-stone-800 tracking-tight">{message}</h3>
      <p className="text-xs text-stone-400 mt-1">Carregando os melhores sabores...</p>
    </div>
  );
};

export default LoadingScreen;
