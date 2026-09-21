import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { FiCheckCircle, FiHeart, FiLogOut, FiUser } from 'react-icons/fi';

const Profile: React.FC = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user?.email) {
        setUserEmail(user.email);
      }
    } catch (e) {
      console.error('Error loading user from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="app-container pb-24 min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-3.5 flex items-center justify-between">
        <div className="w-6" />
        <h1 data-testid="page-title" className="text-base font-extrabold text-stone-800">
          Meu Perfil
        </h1>
        <div className="w-6" />
      </header>

      <main className="p-4 space-y-6">
        {/* Card do Usuário */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 p-1 mb-3 shadow-lg shadow-brand-500/20">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-stone-700">
              <FiUser className="w-9 h-9 text-brand-500" />
            </div>
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-1">
            Gourmet Enthusiast
          </span>
          <p
            data-testid="profile-email"
            className="text-sm font-extrabold text-stone-900 bg-stone-100 px-3.5 py-1.5 rounded-full"
          >
            {userEmail || 'email@exemplo.com'}
          </p>
        </div>

        {/* Menu de Navegação / Ações */}
        <div className="bg-white rounded-3xl p-2 border border-stone-200/80 shadow-xs divide-y divide-stone-100">
          <Link
            to="/done-recipes"
            data-testid="profile-done-btn"
            className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-800">Receitas Feitas</span>
            </div>
            <span className="text-xs text-stone-400 font-semibold">Ver todas →</span>
          </Link>

          <Link
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
            className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FiHeart className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-800">Receitas Favoritas</span>
            </div>
            <span className="text-xs text-stone-400 font-semibold">Ver todas →</span>
          </Link>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-rose-50/50 rounded-2xl transition-colors group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-rose-100 group-hover:text-rose-600 flex items-center justify-center transition-colors">
                <FiLogOut className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-700 group-hover:text-rose-600 transition-colors">
                Sair da Conta
              </span>
            </div>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
