"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  BookOpen,
  Code,
  Database,
  Home,
  Layout,
  Settings,
} from "lucide-react";
import { exercisesData, type ExerciseType } from "@/lib/exercises-data";
import { useStats } from "@/components/StatsProvider";

interface DashboardSidebarProps {
  onSelectExercise: (exercise: ExerciseType) => void;
}

export function DashboardSidebar({ onSelectExercise }: DashboardSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { stats } = useStats();

  const categories = [
    {
      name: "React",
      icon: Layout,
      count: exercisesData.filter((e) => e.category === "React").length,
    },
    {
      name: "Data Structures",
      icon: Database,
      count: exercisesData.filter((e) => e.category === "Data Structures")
        .length,
    },
    {
      name: "Algorithms",
      icon: Code,
      count: exercisesData.filter((e) => e.category === "Algorithms").length,
    },
  ];

  const filteredExercises = exercisesData.filter(
    (exercise) =>
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="h-6 w-6 text-green-600" />
          <h1 className="text-xl font-bold">For Loop Prep</h1>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
        <div className="p-2">
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart className="h-4 w-4" />
                  <span>Your Progress</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    onClick={() => setSearchTerm(category.name)}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Exercises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredExercises.map((exercise) => (
                <SidebarMenuItem key={exercise.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectExercise(exercise)}
                    tooltip={`${exercise.title} - ${exercise.difficulty}`}
                  >
                    <span>{exercise.title}</span>
                    <Badge
                      variant="outline"
                      className={`ml-auto ${
                        exercise.difficulty === "Easy"
                          ? "text-green-500"
                          : exercise.difficulty === "Medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {exercise.difficulty}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-muted-foreground">
              {stats.completed} / {exercisesData.length} completed
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
