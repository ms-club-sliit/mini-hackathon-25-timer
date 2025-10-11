import React from 'react';

export function Timer({ timeRemaining }) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time values with leading zeros
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-8 md:flex-row md:gap-8">
      <TimeUnit value={formatTime(hours)} label="HOURS" />
      <TimeUnit value={formatTime(minutes)} label="MINUTES" />
      <TimeUnit value={formatTime(seconds)} label="SECONDS" />
    </div>
  );
}
function TimeUnit({ value, label }) {
  // Calculate progress percentage (counting down from 100% to 0%)
  const maxValue = label === 'HOURS' ? 24 : 60;
  const numericValue = parseInt(value);
  const progressPercentage = (numericValue / maxValue) * 100;
  
  // Calculate stroke dashoffset (283 is the circumference)
  const circumference = 283;
  const strokeDashoffset = circumference - (circumference * progressPercentage) / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Circular background */}
        <div className="absolute inset-0 bg-gray-800 border-2 border-gray-700 rounded-full shadow-xl"></div>
        {/* Colored progress ring - animates with time */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="33%" stopColor="#34A853" />
              <stop offset="66%" stopColor="#FBBC05" />
              <stop offset="100%" stopColor="#EA4335" />
            </linearGradient>
          </defs>
        </svg>
        {/* Time value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {value}
          </span>
        </div>
      </div>
      <span className="mt-3 text-base font-semibold tracking-wide text-gray-300 md:text-lg">
        {label}
      </span>
    </div>
  );
}