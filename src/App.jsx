import React, { useEffect, useState } from "react";
import { Timer } from "./components/Timer";
import { TimerControls } from "./components/TimerControls";

export default function App() {
  const FIVE_HOURS_IN_SECONDS = 5 * 60 * 60;
  const [timeRemaining, setTimeRemaining] = useState(FIVE_HOURS_IN_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    setTimeRemaining(FIVE_HOURS_IN_SECONDS);
    setIsActive(false);
    setIsPaused(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/3swgVz7qTyyFqUQhK5yy43/Meeting_Banner.png)`,
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="flex flex-col items-center w-full p-16 mt-40 max-w-7xl">
        <div className="w-full max-w-6xl scale-125">
          <Timer timeRemaining={timeRemaining} />
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
