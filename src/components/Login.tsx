import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userData;

  const validatePassword = password.length >= 6;
  const validateEmail = email.includes('@') && email.toLowerCase().includes('.com');
  const isDisabled = !(validateEmail && validatePassword);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-between p-6 relative overflow-hidden text-white">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header com Logo */}
      <div className="relative z-10 pt-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 p-0.5 shadow-xl shadow-brand-500/20 mb-4 flex items-center justify-center">
          <div className="w-full h-full bg-stone-900/40 rounded-2xl backdrop-blur-xs flex items-center justify-center text-3xl">
            🍳
          </div>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          Gourmet<span className="text-brand-500">Lab</span>
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Explore o universo de pratos e coquetéis selecionados
        </p>
      </div>

      {/* Card de Login */}
      <div className="relative z-10 w-full max-w-sm mx-auto bg-stone-800/80 backdrop-blur-xl p-6 rounded-3xl border border-stone-700/60 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-1">Boas-vindas!</h2>
        <p className="text-stone-400 text-xs mb-6">Entre para salvar seus pratos e acompanhar receitas.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-stone-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-stone-900/70 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-stone-300 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                data-testid="password-input"
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-stone-900/70 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={isDisabled}
            className={`w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              isDisabled
                ? 'bg-stone-700/60 text-stone-400 cursor-not-allowed'
                : 'bg-brand-500 hover:bg-brand-600 active:scale-98 text-white shadow-brand-500/25 hover:shadow-lg'
            }`}
          >
            <span>Acessar Receitas</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Footer discreto */}
      <div className="relative z-10 text-center pb-4">
        <p className="text-[11px] text-stone-500">
          GourmetLab Portfolio Project • TypeScript & React
        </p>
      </div>
    </div>
  );
};

export default Login;
