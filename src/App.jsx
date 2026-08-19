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

      {/* Top-Left Header: MiniHackathon 26 Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 2xl:top-12 2xl:left-12 select-none z-20 pointer-events-none">
        <img
          src="/minihackathon-logo.png"
          alt="mini Hackathon 26"
          className="w-28 sm:w-36 md:w-44 lg:w-48 xl:w-56 2xl:w-64 h-auto object-contain drop-shadow-sm"
          draggable="false"
        />
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
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 z-10 py-4 sm:py-6">
        {/* Crystal Clear Glassmorphism Card Behind Timer */}
        <div className="relative max-w-fit px-6 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-9 lg:py-10 xl:py-12 2xl:py-14 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[52px] xl:rounded-[60px] bg-white/[0.08] backdrop-blur-md border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_30px_70px_-15px_rgba(0,0,0,0.18),0_15px_30px_-8px_rgba(0,0,0,0.12),0_6px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center">
          <Timer timeRemaining={timeRemaining} />
        </div>

        <div
          className={`mt-6 sm:mt-8 md:mt-10 lg:mt-12 transition-opacity duration-300 ${
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
