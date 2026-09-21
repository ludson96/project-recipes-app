import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import logo from '../images/gourmetLabLogo.svg';

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
    <div className="flex-1 flex flex-col justify-center items-center p-4 min-h-full bg-culinary-watermark relative select-none">
      {/* Card Flutuante de Login idêntico ao project-delivery-app */}
      <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-xl my-auto">
        
        {/* Brand com Logo Central */}
        <div className="text-center mb-5 flex flex-col items-center">
          <img
            src={logo}
            alt="GourmetLab Logo"
            className="h-24 w-auto mx-auto object-contain mb-1.5 hover:scale-105 transition-transform drop-shadow-md"
          />
          <p className="text-[11px] text-slate-500 font-medium">
            Receitas e bebidas selecionadas na velocidade da luz
          </p>
        </div>

        {/* Formulário com labels e inputs idênticos ao project-delivery-app */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              E-mail
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-[#41197F] focus:outline-none focus:ring-2 focus:ring-[#FCC436] transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="password"
                name="password"
                id="password"
                data-testid="password-input"
                required
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-[#41197F] focus:outline-none focus:ring-2 focus:ring-[#FCC436] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={isDisabled}
            className="w-full mt-2 flex items-center justify-center space-x-2 bg-[#192A56] hover:bg-[#121e3f] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer active:scale-99"
          >
            <FiLogIn className="w-5 h-5 text-[#FDEB37]" />
            <span>Entrar</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Ainda não tem uma conta?{' '}
            <span className="text-[#192A56] hover:underline font-bold cursor-pointer">
              Cadastre-se agora
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
