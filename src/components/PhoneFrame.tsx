import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiWifi, FiBatteryCharging } from 'react-icons/fi';

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#050914] flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Smartphone Device Frame com bordas refinadas e proporções realistas */}
      <div className="relative w-full md:w-[400px] h-screen md:h-[844px] bg-white md:rounded-[50px] overflow-hidden md:border-[10px] md:border-[#0f172a] md:ring-1 md:ring-slate-700/60 md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col">
        
        {/* Barra de Status do Sistema / SafeZone (estilo project-delivery-app) */}
        {isLoginPage ? (
          /* Na tela de login, a barra de status flutua transparente sobre o fundo roxo */
          <div className="hidden md:flex absolute top-0 inset-x-0 h-11 items-center justify-between px-7 pt-1 z-50 select-none pointer-events-none text-white">
            <span className="text-[13px] font-semibold drop-shadow-sm tracking-tight">09:41</span>
            <div className="w-[100px] h-[22px] bg-black rounded-full flex items-center justify-end px-2.5 shadow-inner border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1128] border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
            </div>
            <div className="flex items-center space-x-1.5 drop-shadow-sm text-xs font-semibold">
              <FiWifi className="w-3.5 h-3.5" />
              <FiBatteryCharging className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        ) : (
          /* Nas demais páginas do app, a barra de status tem fundo branco sólido, impedindo que o conteúdo role por baixo dos ícones */
          <div className="hidden md:flex h-11 bg-white items-center justify-between px-7 pt-1 z-50 border-b border-stone-100 select-none flex-shrink-0 text-slate-800">
            <span className="text-[13px] font-bold tracking-tight">09:41</span>
            <div className="w-[100px] h-[22px] bg-black rounded-full flex items-center justify-end px-2.5 shadow-inner border border-slate-800">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1128] border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold">
              <FiWifi className="w-3.5 h-3.5 text-slate-600" />
              <FiBatteryCharging className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        )}

        {/* Conteúdo rolável interno do app com altura total preenchida */}
        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative bg-white pb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
