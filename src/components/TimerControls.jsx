import React from 'react';
import { PlayIcon, PauseIcon, RefreshCwIcon } from 'lucide-react';

export function TimerControls({ isActive, isPaused, onStart, onPause, onResume, onRestart }) {
  return (
    <div className="flex justify-center items-center gap-4">
      {!isActive ? (
        <Button onClick={onStart} color="green">
          <PlayIcon size={20} className="mr-2" />
          Start
        </Button>
      ) : isPaused ? (
        <Button onClick={onResume} color="green">
          <PlayIcon size={20} className="mr-2" />
          Resume
        </Button>
      ) : (
        <Button onClick={onPause} color="yellow">
          <PauseIcon size={20} className="mr-2" />
          Pause
        </Button>
      )}
      <Button onClick={onRestart} color="red">
        <RefreshCwIcon size={20} className="mr-2" />
        Restart
      </Button>
    </div>
  );
}

function Button({ children, onClick, color }) {
  const colorClasses = {
    green: 'bg-[#34A853] hover:bg-[#2E9549] border-[#2E9549]',
    yellow: 'bg-[#FBBC05] hover:bg-[#E0A800] border-[#E0A800]',
    red: 'bg-[#EA4335] hover:bg-[#D03A2E] border-[#D03A2E]',
    blue: 'bg-[#4285F4] hover:bg-[#3B78DC] border-[#3B78DC]',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-3 rounded-full text-white font-medium transition-all 
      shadow-lg border ${colorClasses[color]} min-w-[120px]`}
    >
      {children}
    </button>
  );
}