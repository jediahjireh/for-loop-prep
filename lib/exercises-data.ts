import { todoApp } from "@/lib/exercises/todo-app";
import { stringReversal } from "@/lib/exercises/string-reversal";
import { ticTacToe } from "@/lib/exercises/tic-tac-toe";
import { toggleComponent } from "@/lib/exercises/toggle-component";
import { counterComponent } from "@/lib/exercises/counter-component";
import { quizApp } from "@/lib/exercises/quiz-app";
import { phoneBook } from "@/lib/exercises/phone-book";
import { liveTextInput } from "@/lib/exercises/live-text-input";
import { dataListRendering } from "@/lib/exercises/data-list-rendering";
import { alphabetTileGame } from "@/lib/exercises/alphabet-tile-game";
import { languageContextSwitcher } from "@/lib/exercises/language-context-switcher";
import { colorSelector } from "@/lib/exercises/color-selector";

export type ExerciseType = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  initialCode: string;
  solutionCode: string;
  examples: string[];
  testCases: {
    description: string;
    input?: string;
    expected: string;
  }[];
  stepByStepSolution: {
    steps: {
      title: string;
      content: string;
      code?: string;
    }[];
  };
};

export const exercisesData: ExerciseType[] = [
  todoApp,
  stringReversal,
  ticTacToe,
  toggleComponent,
  counterComponent,
  quizApp,
  phoneBook,
  liveTextInput,
  dataListRendering,
  alphabetTileGame,
  languageContextSwitcher,
  colorSelector,
];
