"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ExerciseList } from "@/components/ExerciseList";
import { ExerciseView } from "@/components/ExerciseView";
import { ExerciseType } from "@/lib/exercises-data";
import { StatsProvider } from "@/components/StatsProvider";

export function ExerciseDashboard() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );

  return (
    <StatsProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <DashboardSidebar onSelectExercise={setSelectedExercise} />
          <div className="flex-1 overflow-auto">
            {selectedExercise ? (
              <ExerciseView
                exercise={selectedExercise}
                onBack={() => setSelectedExercise(null)}
              />
            ) : (
              <ExerciseList onSelectExercise={setSelectedExercise} />
            )}
          </div>
        </div>
      </SidebarProvider>
    </StatsProvider>
  );
}
