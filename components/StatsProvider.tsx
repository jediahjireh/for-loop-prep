"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

interface StatsContextType {
  stats: {
    completed: number;
    attempted: number;
    exerciseAttempts: Record<string, number>;
    completedExercises: string[];
  };
  incrementAttempt: (exerciseId: string) => void;
  markCompleted: (exerciseId: string) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({
    completed: 0,
    attempted: 0,
    exerciseAttempts: {} as Record<string, number>,
    completedExercises: [] as string[],
  });

  // load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("forloopprep-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // save stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem("forloopprep-stats", JSON.stringify(stats));
  }, [stats]);

  const incrementAttempt = (exerciseId: string) => {
    setStats((prev) => {
      const currentAttempts = prev.exerciseAttempts[exerciseId] || 0;
      return {
        ...prev,
        attempted: prev.attempted + 1,
        exerciseAttempts: {
          ...prev.exerciseAttempts,
          [exerciseId]: currentAttempts + 1,
        },
      };
    });
  };

  const markCompleted = (exerciseId: string) => {
    setStats((prev) => {
      if (prev.completedExercises.includes(exerciseId)) {
        return prev;
      }

      return {
        ...prev,
        completed: prev.completed + 1,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  };

  return (
    <StatsContext.Provider value={{ stats, incrementAttempt, markCompleted }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}
