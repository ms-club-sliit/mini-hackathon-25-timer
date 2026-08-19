import React from 'react';
import { PlayIcon, PauseIcon, RefreshCwIcon } from 'lucide-react';

export function TimerControls({ isActive, isPaused, onStart, onPause, onResume, onRestart }) {
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10 p-2.5 xl:p-3.5 2xl:p-4 3xl:p-5 bg-white/50 backdrop-blur-xl rounded-full shadow-xl shadow-blue-950/5 border border-white/80 transition-all">
      {!isActive ? (
        <Button onClick={onStart} color="blue">
          <PlayIcon size={22} className="mr-2.5 fill-white/20 stroke-[2.5]" />
          Start
        </Button>
      ) : isPaused ? (
        <Button onClick={onResume} color="blue">
          <PlayIcon size={22} className="mr-2.5 fill-white/20 stroke-[2.5]" />
          Resume
        </Button>
      ) : (
        <Button onClick={onPause} color="yellow">
          <PauseIcon size={22} className="mr-2.5 fill-white/20 stroke-[2.5]" />
          Pause
        </Button>
      )}
      <Button onClick={onRestart} color="white">
        <RefreshCwIcon size={21} className="mr-2.5 text-gray-700 stroke-[2.5]" />
        Restart
      </Button>
    </div>
  );
}

function Button({ children, onClick, color }) {
  const colorClasses = {
    blue: 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border-transparent',
    yellow: 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#D97706] hover:to-[#F59E0B] text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 border-transparent',
    white: 'bg-white/95 hover:bg-white text-gray-900 shadow-lg shadow-slate-400/15 hover:shadow-slate-400/25 border-gray-200/90 hover:border-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-7 sm:px-9 xl:px-12 2xl:px-14 3xl:px-16 py-3 sm:py-3.5 xl:py-4 2xl:py-5 3xl:py-6 rounded-full text-base sm:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-bold tracking-tight transition-all duration-200 transform hover:scale-[1.04] active:scale-[0.97] border ${colorClasses[color]} min-w-[140px] sm:min-w-[160px] xl:min-w-[200px] 2xl:min-w-[240px] 3xl:min-w-[280px] select-none`}
    >
      {children}
    </button>
  );
}