import React, { useEffect, useState, useRef } from "react";
import { Timer } from "./components/Timer";
import { TimerControls } from "./components/TimerControls";
import { TimerSettings } from "./components/TimerSettings";

export default function App() {
  const FIVE_HOURS_IN_SECONDS = 5 * 60 * 60;
  const [initialDuration, setInitialDuration] = useState(FIVE_HOURS_IN_SECONDS);
  const [timeRemaining, setTimeRemaining] = useState(FIVE_HOURS_IN_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("/background.png");
  const inactivityTimer = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 0) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  // Handle cursor inactivity
  useEffect(() => {
    const resetInactivityTimer = () => {
      setShowControls(true);

      // Clear existing timer
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }

      // Set new timer to hide controls after 2 seconds
      inactivityTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    };

    const handleMouseMove = () => {
      resetInactivityTimer();
    };

    const handleMouseEnter = () => {
      resetInactivityTimer();
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initialize timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleRestart = () => {
    setTimeRemaining(initialDuration);
    setIsActive(false);
    setIsPaused(false);
  };

  const handleSetTime = (newDuration) => {
    setInitialDuration(newDuration);
    setTimeRemaining(newDuration);
    setIsActive(false);
    setIsPaused(false);
  };

  const handleBackgroundChange = (newBackground) => {
    if (newBackground) {
      setBackgroundImage(newBackground);
    } else {
      // Reset to default background
      setBackgroundImage("/background.png");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden select-none bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage || "/background.png"})`,
      }}
    >
      {/* Top-Left Header: mini Hackathon 26 */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 md:top-12 md:left-12 flex flex-col items-start select-none z-20">
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-black text-black tracking-[-0.03em] leading-none mb-1 sm:mb-1.5">
          mini
        </span>
        <div className="flex items-end gap-1.5 sm:gap-2 leading-none">
          <span className="text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] font-extrabold text-black tracking-[-0.04em] leading-none">
            Hackathon
          </span>
          <span className="bg-[#2B54FF] text-white text-xl sm:text-2xl md:text-[34px] lg:text-[38px] font-light leading-none px-1.5 sm:px-2 pt-1 pb-0.5 sm:pt-1.5 sm:pb-1 flex items-center justify-center">
            26
          </span>
        </div>
      </div>

      {/* Settings Sidebar - Fixed Position */}
      <TimerSettings
        onSetTime={handleSetTime}
        currentTime={timeRemaining}
        isActive={isActive}
        onBackgroundChange={handleBackgroundChange}
        currentBackground={backgroundImage}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full px-6 py-12 max-w-7xl z-10">
        {/* Crystal Clear Glassmorphism Card Behind Timer */}
        <div className="relative px-8 sm:px-14 md:px-20 py-10 sm:py-14 rounded-[36px] sm:rounded-[48px] bg-white/[0.08] backdrop-blur-md border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_30px_70px_-15px_rgba(0,0,0,0.18),0_15px_30px_-8px_rgba(0,0,0,0.12),0_6px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center">
          <Timer timeRemaining={timeRemaining} />
        </div>

        <div
          className={`mt-10 sm:mt-14 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <TimerControls
            isActive={isActive}
            isPaused={isPaused}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onRestart={handleRestart}
          />
        </div>
      </div>
    </div>
  );
}
