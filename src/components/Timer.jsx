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
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 md:flex-row">
      <TimeUnit value={formatTime(hours)} label="Hours" type="hours" />
      <TimeUnit value={formatTime(minutes)} label="Minutes" type="minutes" />
      <TimeUnit value={formatTime(seconds)} label="Seconds" type="seconds" />
    </div>
  );
}

function TimeUnit({ value, label, type }) {
  const maxValue = type === 'hours' ? 24 : 60;
  const numericValue = parseInt(value) || 0;
  const progressPercentage = (numericValue / maxValue) * 100;
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.59
  const strokeDashoffset = circumference - (circumference * progressPercentage) / 100;

  const gradientId = `${type}-grad`;

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-60 xl:h-60 2xl:w-68 2xl:h-68 3xl:w-72 3xl:h-72 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <defs>
            {/* Hours Gradient: Vibrant Royal Blue */}
            <linearGradient id="hours-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>

            {/* Minutes Gradient: Vivid Purple / Violet */}
            <linearGradient id="minutes-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#D8B4FE" />
            </linearGradient>

            {/* Seconds Gradient: Vibrant Magenta / Pink / Violet */}
            <linearGradient id="seconds-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DB2777" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Background Track Ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(195, 205, 228, 0.45)"
            strokeWidth="7"
          />

          {/* Colored Progress Ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        {/* Time value number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-extrabold text-black tracking-tight leading-none">
            {value}
          </span>
        </div>
      </div>

      {/* Unit Label */}
      <span className="mt-3 sm:mt-4 md:mt-4 lg:mt-5 xl:mt-5 2xl:mt-6 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl font-bold tracking-tight text-black">
        {label}
      </span>
    </div>
  );
}