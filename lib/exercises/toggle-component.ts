import type { ExerciseType } from "@/lib/exercises-data";

export const toggleComponent: ExerciseType = {
  id: "toggle-component",
  title: "Toggle Component",
  category: "React",
  difficulty: "Easy",
  language: "tsx",
  description: `
    <p>Create a simple toggle component that switches between on and off states.</p>
    <p>Requirements:</p>
    <ul>
      <li>The toggle should have two states: on and off</li>
      <li>Clicking the toggle should switch its state</li>
      <li>The toggle should have different visual styles for each state</li>
      <li>The component should accept an optional default state</li>
      <li>The component should provide a way to get the current state</li>
    </ul>
  `,
  examples: [
    "Default state is off\nClicking the toggle switches it to on\nClicking again switches it back to off",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleProps {
  defaultChecked?: boolean
  onToggle?: (checked: boolean) => void
}

export default function Toggle({ defaultChecked = false, onToggle }: ToggleProps) {
  // TODO: Implement the toggle component
  
  return (
    <button
      type="button"
      className="relative inline-flex h-6 w-11 items-center rounded-full"
    >
      <span className="sr-only">Toggle switch</span>
      {/* Implement the toggle UI */}
    </button>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleProps {
  defaultChecked?: boolean
  onToggle?: (checked: boolean) => void
}

export default function Toggle({ defaultChecked = false, onToggle }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked)
  
  const handleToggle = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onToggle?.(newChecked)
  }
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked ? "bg-primary" : "bg-input"
      )}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}`,
  testCases: [
    {
      description: "Should render with default state (off)",
      expected: "Toggle should be in off state",
    },
    {
      description: "Should change state when clicked",
      expected: "Toggle should switch to on state",
    },
    {
      description: "Should call onToggle callback with new state",
      expected: "onToggle should be called with true when toggled on",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the component state",
        content:
          "We need to track whether the toggle is checked (on) or not (off).",
        code: `const [checked, setChecked] = useState(defaultChecked)`,
      },
      {
        title: "Create a toggle handler",
        content:
          "We need a function to handle the toggle action and call the onToggle callback.",
        code: `const handleToggle = () => {
  const newChecked = !checked
  setChecked(newChecked)
  onToggle?.(newChecked)
}`,
      },
      {
        title: "Style the toggle based on state",
        content:
          "We'll use conditional classes to style the toggle differently based on its state.",
        code: `className={cn(
  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  checked ? "bg-primary" : "bg-input"
)}`,
      },
      {
        title: "Add the toggle knob with animation",
        content:
          "We'll create a knob that moves from left to right when toggled.",
        code: `<span
  className={cn(
    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
    checked ? "translate-x-5" : "translate-x-0"
  )}
/>`,
      },
      {
        title: "Add accessibility attributes",
        content:
          "We need to make our toggle accessible with proper ARIA attributes.",
        code: `<button
  type="button"
  role="switch"
  aria-checked={checked}
  onClick={handleToggle}
  ...
>`,
      },
    ],
  },
};
