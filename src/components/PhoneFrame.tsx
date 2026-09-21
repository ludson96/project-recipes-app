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
        
        {/* Barra de Status do Sistema / SafeZone Dinâmica (sobreposta ao topo) */}
        <div className={`hidden md:flex absolute top-0 inset-x-0 h-11 items-center justify-between px-7 pt-1 z-50 select-none pointer-events-none ${
          isLoginPage ? 'text-white' : 'text-slate-800'
        }`}>
          {/* Horário */}
          <span className="text-[13px] font-semibold drop-shadow-sm tracking-tight">09:41</span>
          
          {/* Dynamic Island / Notch Pill com lente de câmera frontal */}
          <div className="w-[100px] h-[22px] bg-black rounded-full flex items-center justify-end px-2.5 shadow-inner border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a1128] border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/60" />
            </div>
          </div>

          {/* Ícones de sinal, wifi e bateria */}
          <div className="flex items-center space-x-1.5 drop-shadow-sm text-xs font-semibold">
            <FiWifi className="w-3.5 h-3.5" />
            <FiBatteryCharging className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Home Indicator Bar na base */}
        <div className="hidden md:flex absolute bottom-2 inset-x-0 h-4 items-center justify-center z-50 pointer-events-none">
          <div className="w-36 h-1 bg-slate-400/60 rounded-full backdrop-blur-sm" />
        </div>

        {/* Conteúdo rolável interno do app com SafeZone superior */}
        <div className={`w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col ${
          isLoginPage ? 'pt-0' : 'pt-11'
        } pb-2 md:pb-5 relative bg-white`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
