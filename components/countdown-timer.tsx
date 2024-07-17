"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // Initial countdown time in seconds
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef<any>(null);
  const requestRef = useRef<any>(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateTime);
    }
  };

  const pauseTimer = () => {
    setRunning(false);
    cancelAnimationFrame(requestRef.current);
  };

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(30 * 60); // Reset countdown time to 30 minutes
    startTimeRef.current = null;
    cancelAnimationFrame(requestRef.current);
  };

  const updateTime = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const elapsedTime = (currentTime - startTimeRef.current) / 1000;
      setTimeLeft((prevTimeLeft) => Math.max(0, prevTimeLeft - elapsedTime));
      startTimeRef.current = currentTime; // Update startTime to the current time

      if (timeLeft > 0 && running) {
        requestRef.current = requestAnimationFrame(updateTime);
      } else {
        setRunning(false);
      }
    },
    [running, timeLeft]
  );

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(updateTime);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [running, updateTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${Math.floor(
      remainingSeconds
    )
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-4 font-bold justify-end">
      <button onClick={running ? pauseTimer : startTimer}>
        {running ? (
          <div className="flex items-center space-x-1">
            <FaPause className="size-3" />
            <div>Pause</div>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <FaPlay className="size-3" />
            <div>Start</div>
          </div>
        )}
      </button>
      <button onClick={resetTimer}>
        <div className="flex items-center space-x-1">
          <FaRedo className="size-3" />
          <div>Reset</div>
        </div>
      </button>
      <div className="flex items-center space-x-1">
        <LuAlarmClock className="size-4" />
        <div>Timer: {formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
