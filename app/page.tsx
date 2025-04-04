"use client";

import { useState } from "react";

import type { ExerciseType } from "@/lib/exercises-data";
import { StatsProvider } from "@/components/StatsProvider";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ExerciseView } from "@/components/ExerciseView";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ExerciseList } from "@/components/ExerciseList";

export default function Home() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
    null
  );

  return (
    <StatsProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <DashboardSidebar onSelectExercise={setSelectedExercise} />
          <main className="flex-1 overflow-auto">
            {selectedExercise ? (
              <ExerciseView
                exercise={selectedExercise}
                onBack={() => setSelectedExercise(null)}
              />
            ) : (
              <ExerciseList onSelectExercise={setSelectedExercise} />
            )}
          </main>
        </div>
      </SidebarProvider>
    </StatsProvider>
  );
}
