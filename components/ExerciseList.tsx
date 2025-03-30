"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useStats } from "@/components/StatsProvider";
import { exercisesData, type ExerciseType } from "@/lib/exercises-data";

interface ExerciseListProps {
  onSelectExercise: (exercise: ExerciseType) => void;
}

export function ExerciseList({ onSelectExercise }: ExerciseListProps) {
  const { stats } = useStats();

  return (
    <div className="container py-12 p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Technical Interview Preparation
        </h1>
        <p className="text-muted-foreground">
          Practice coding exercises commonly asked in technical interviews
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercisesData.map((exercise) => (
          <Card
            key={exercise.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectExercise(exercise)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{exercise.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={
                    exercise.difficulty === "Easy"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : exercise.difficulty === "Medium"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {exercise.difficulty}
                </Badge>
              </div>
              <CardDescription>{exercise.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-3">{exercise.description}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
              {stats.exerciseAttempts[exercise.id]
                ? `Attempted ${stats.exerciseAttempts[exercise.id]} times`
                : "Not attempted yet"}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
