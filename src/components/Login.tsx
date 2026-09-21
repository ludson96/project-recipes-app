import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/gourmetLabLogo.svg';
import tomate from '../images/tomate.svg';

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
    <div className="w-full min-h-full flex-1 flex flex-col justify-between items-center relative select-none bg-white">
      <div className="relative w-full h-[360px] bg-[#41197F] flex flex-col items-center justify-start overflow-visible shrink-0">
        <div className="relative z-10 pt-[90px] flex flex-col items-center">
          <img
            src={logo}
            alt="GourmetLab Logo"
            className="w-[200px] h-auto object-contain drop-shadow-md"
          />
        </div>

        <div className="absolute -bottom-[160px] left-0 right-0 z-20 flex justify-center -translate-x-[6px] pointer-events-none">
          <img
            src={tomate}
            alt="Tomates frescos"
            className="w-full max-w-[370px] h-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Formulário e Título "LOGIN" */}
      <div className="w-full px-8 pt-16 pb-8 flex-1 flex flex-col justify-center z-10">
        <h2 className="text-center text-xl font-bold italic tracking-widest text-[#41197F] uppercase mb-5">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              aria-label="Email"
              data-testid="email-input"
              required
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full bg-white border border-[#41197F]/40 text-slate-800 text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-[#41197F] focus:outline-none focus:ring-1 focus:ring-[#41197F] transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              aria-label="Senha"
              data-testid="password-input"
              required
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full bg-white border border-[#41197F]/40 text-slate-800 text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-[#41197F] focus:outline-none focus:ring-1 focus:ring-[#41197F] transition-all"
            />
          </div>

          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={isDisabled}
            className="w-full mt-3 bg-[#FCC436] hover:bg-[#eab327] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-lg shadow-md uppercase tracking-wider text-sm transition-all cursor-pointer active:scale-[0.99]"
          >
            Enter
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Ainda não tem uma conta?{' '}
            <span className="text-[#41197F] hover:underline font-bold cursor-pointer">
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
