import type { ExerciseType } from "@/lib/exercises-data";

export const liveTextInput: ExerciseType = {
  id: "live-text-input",
  title: "Live Text Input",
  category: "React",
  difficulty: "Easy",
  language: "tsx",
  description: `
    <p>Create a component that displays text being typed in real-time.</p>
    <p>Requirements:</p>
    <ul>
      <li>Create a text input that allows users to type content</li>
      <li>Display the typed text in real-time as the user types</li>
      <li>Add a character counter that updates as the user types</li>
      <li>Set a maximum character limit of 200 characters</li>
      <li>Display a warning when approaching the limit (>80% used)</li>
      <li>Disable the input when the limit is reached</li>
    </ul>
  `,
  examples: [
    "User types 'Hello' and sees 'Hello' displayed in real-time\nCharacter counter shows '5/200'\nWhen user types 170+ characters, show a warning\nWhen user reaches 200 characters, disable further input",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LiveTextInput() {
  // TODO: Implement the live text input component
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Live Text Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Preview area will go here */}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {/* Input and counter will go here */}
      </CardFooter>
    </Card>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertOctagon } from 'lucide-react'

export default function LiveTextInput() {
  const [text, setText] = useState("")
  const maxLength = 200
  const warningThreshold = 0.8 // 80%
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value)
    }
  }
  
  const charCount = text.length
  const isApproachingLimit = charCount >= maxLength * warningThreshold
  const isAtLimit = charCount >= maxLength
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Live Text Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-24 p-4 border rounded-md">
          {text ? (
            <p className="break-words">{text}</p>
          ) : (
            <p className="text-muted-foreground italic">
              Start typing to see preview...
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="relative w-full">
          <Input
            placeholder="Type something..."
            value={text}
            onChange={handleChange}
            disabled={isAtLimit}
            className={isApproachingLimit ? "border-yellow-400 focus-visible:ring-yellow-400" : ""}
          />
          {isApproachingLimit && !isAtLimit && (
            <AlertOctagon className="absolute right-2 top-2 h-4 w-4 text-yellow-500" />
          )}
        </div>
        
        <div className="flex justify-between w-full">
          <div>
            {isApproachingLimit && !isAtLimit && (
              <span className="text-xs text-yellow-500">
                Approaching character limit
              </span>
            )}
            {isAtLimit && (
              <span className="text-xs text-red-500">
                Character limit reached
              </span>
            )}
          </div>
          <Badge
            variant={isAtLimit ? "destructive" : isApproachingLimit ? "outline" : "secondary"}
            className="ml-auto"
          >
            {charCount}/{maxLength}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}`,
  testCases: [
    {
      description: "Should display text in real-time as the user types",
      expected: "Preview area should update with the text as it's typed",
    },
    {
      description: "Should show character count that updates with typing",
      expected: "Counter should show current number of characters out of 200",
    },
    {
      description: "Should show a warning when approaching the limit",
      expected: "Warning should appear when >80% of character limit is used",
    },
    {
      description: "Should disable input when character limit is reached",
      expected: "Input should be disabled when 200 characters are entered",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the component state",
        content:
          "Set up state for the text input and define constants for the character limits.",
        code: `const [text, setText] = useState("")
const maxLength = 200
const warningThreshold = 0.8 // 80%`,
      },
      {
        title: "Create the input change handler",
        content:
          "Create a function to handle text input changes and enforce the character limit.",
        code: `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length <= maxLength) {
    setText(e.target.value)
  }
}`,
      },
      {
        title: "Calculate character count and limits",
        content:
          "Calculate the current character count and determine if we're approaching or at the limit.",
        code: `const charCount = text.length
const isApproachingLimit = charCount >= maxLength * warningThreshold
const isAtLimit = charCount >= maxLength`,
      },
      {
        title: "Implement the text preview area",
        content:
          "Create a preview area that shows the text being typed or a placeholder if empty.",
        code: `<div className="min-h-24 p-4 border rounded-md">
  {text ? (
    <p className="break-words">{text}</p>
  ) : (
    <p className="text-muted-foreground italic">
      Start typing to see preview...
    </p>
  )}
</div>`,
      },
      {
        title: "Implement the text input",
        content:
          "Create the input field with character limit enforcement and visual feedback.",
        code: `<div className="relative w-full">
  <Input
    placeholder="Type something..."
    value={text}
    onChange={handleChange}
    disabled={isAtLimit}
    className={isApproachingLimit ? "border-yellow-400 focus-visible:ring-yellow-400" : ""}
  />
  {isApproachingLimit && !isAtLimit && (
    <AlertOctagon className="absolute right-2 top-2 h-4 w-4 text-yellow-500" />
  )}
</div>`,
      },
      {
        title: "Add the character counter and warnings",
        content:
          "Add a character counter that changes appearance based on the limit status.",
        code: `<div className="flex justify-between w-full">
  <div>
    {isApproachingLimit && !isAtLimit && (
      <span className="text-xs text-yellow-500">
        Approaching character limit
      </span>
    )}
    {isAtLimit && (
      <span className="text-xs text-red-500">
        Character limit reached
      </span>
    )}
  </div>
  <Badge
    variant={isAtLimit ? "destructive" : isApproachingLimit ? "outline" : "secondary"}
    className="ml-auto"
  >
    {charCount}/{maxLength}
  </Badge>
</div>`,
      },
    ],
  },
};
