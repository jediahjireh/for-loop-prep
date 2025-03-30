import type { ExerciseType } from "@/lib/exercises-data";

export const counterComponent: ExerciseType = {
  id: "counter-component",
  title: "Counter Component",
  category: "React",
  difficulty: "Easy",
  language: "tsx",
  description: `
    <p>Create a counter component with increment and decrement buttons.</p>
    <p>Requirements:</p>
    <ul>
      <li>Display the current count</li>
      <li>Include buttons to increment and decrement the count</li>
      <li>Prevent the counter from going below 0</li>
      <li>Add a reset button to set the count back to 0</li>
      <li>Style the component appropriately</li>
    </ul>
  `,
  examples: [
    "Initial count is 0\nClicking + increases to 1\nClicking - decreases to 0\nClicking - again should not decrease below 0",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, RotateCcw } from 'lucide-react'

export default function Counter() {
  // TODO: Implement the counter component
  
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {/* Display the count here */}
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        {/* Add buttons here */}
      </CardFooter>
    </Card>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, RotateCcw } from 'lucide-react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  const increment = () => {
    setCount(count + 1)
  }
  
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  
  const reset = () => {
    setCount(0)
  }
  
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="text-6xl font-bold">{count}</div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Button variant="outline" size="icon" onClick={decrement} disabled={count === 0}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={reset} disabled={count === 0}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon" onClick={increment}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}`,
  testCases: [
    {
      description: "Should start with count at 0",
      expected: "Initial count should be 0",
    },
    {
      description: "Should increment count when + is clicked",
      expected: "Count should increase by 1",
    },
    {
      description: "Should decrement count when - is clicked",
      expected: "Count should decrease by 1",
    },
    {
      description: "Should not decrement below 0",
      expected: "Count should remain at 0 when - is clicked at 0",
    },
    {
      description: "Should reset count to 0 when reset is clicked",
      expected: "Count should be 0 after reset",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the counter state",
        content: "We need to track the current count value.",
        code: `const [count, setCount] = useState(0)`,
      },
      {
        title: "Create increment function",
        content: "We need a function to increase the count.",
        code: `const increment = () => {
  setCount(count + 1)
}`,
      },
      {
        title: "Create decrement function with validation",
        content:
          "We need a function to decrease the count, but prevent it from going below 0.",
        code: `const decrement = () => {
  if (count > 0) {
    setCount(count - 1)
  }
}`,
      },
      {
        title: "Create reset function",
        content: "We need a function to reset the count back to 0.",
        code: `const reset = () => {
  setCount(0)
}`,
      },
      {
        title: "Display the count",
        content: "We need to show the current count value.",
        code: `<div className="text-6xl font-bold">{count}</div>`,
      },
      {
        title: "Add the control buttons",
        content: "We need to add buttons for increment, decrement, and reset.",
        code: `<Button variant="outline" size="icon" onClick={decrement} disabled={count === 0}>
  <Minus className="h-4 w-4" />
</Button>
<Button variant="outline" size="icon" onClick={reset} disabled={count === 0}>
  <RotateCcw className="h-4 w-4" />
</Button>
<Button variant="default" size="icon" onClick={increment}>
  <Plus className="h-4 w-4" />
</Button>`,
      },
    ],
  },
};
