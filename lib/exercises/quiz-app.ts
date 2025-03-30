import type { ExerciseType } from "@/lib/exercises-data";

export const quizApp: ExerciseType = {
  id: "quiz-app",
  title: "Quiz App",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Create a simple quiz application with multiple-choice questions.</p>
    <p>Requirements:</p>
    <ul>
      <li>Display one question at a time with multiple-choice answers</li>
      <li>Allow users to select an answer and proceed to the next question</li>
      <li>Show immediate feedback on whether the answer was correct</li>
      <li>Track and display the user's score</li>
      <li>Show a summary at the end with the final score</li>
      <li>Add a restart button to take the quiz again</li>
    </ul>
  `,
  examples: [
    "User selects an answer\nFeedback shows if it was correct\nUser clicks Next to see the next question\nAfter all questions, a summary shows the final score",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Sample quiz data
const quizData = [
  {
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A server-side framework"
    ],
    correctAnswer: 0
  },
  {
    question: "Which hook is used for state in functional components?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Syntax",
      "Java Syntax Extension"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a React hook?",
    options: [
      "useEffect",
      "useState",
      "useHistory",
      "useCallback"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the real DOM",
      "A lightweight copy of the real DOM in memory",
      "A DOM that only exists in virtual reality",
      "A DOM that is faster than the real DOM"
    ],
    correctAnswer: 1
  }
]

export default function QuizApp() {
  // TODO: Implement the quiz app
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">React Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Implement the quiz UI */}
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Add navigation buttons */}
      </CardFooter>
    </Card>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from 'lucide-react'

// Sample quiz data
const quizData = [
  {
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A server-side framework"
    ],
    correctAnswer: 0
  },
  {
    question: "Which hook is used for state in functional components?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Syntax",
      "Java Syntax Extension"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a React hook?",
    options: [
      "useEffect",
      "useState",
      "useHistory",
      "useCallback"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the real DOM",
      "A lightweight copy of the real DOM in memory",
      "A DOM that only exists in virtual reality",
      "A DOM that is faster than the real DOM"
    ],
    correctAnswer: 1
  }
]

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  const handleOptionSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedOption(index)
    }
  }
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return
    
    setShowFeedback(true)
    
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }
  
  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }
  
  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setScore(0)
    setQuizCompleted(false)
  }
  
  const isCorrect = selectedOption === quizData[currentQuestion].correctAnswer
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">React Quiz</CardTitle>
        <div className="text-center text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quizData.length}
        </div>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
            <RadioGroup value={selectedOption?.toString()} className="space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={\`option-\${index}\`}
                    disabled={showFeedback}
                    onClick={() => handleOptionSelect(index)}
                  />
                  <Label
                    htmlFor={\`option-\${index}\`}
                    className={
                      showFeedback
                        ? index === quizData[currentQuestion].correctAnswer
                          ? "text-green-600 font-medium"
                          : selectedOption === index
                          ? "text-red-600 font-medium"
                          : ""
                        : ""
                    }
                  >
                    {option}
                    {showFeedback && index === quizData[currentQuestion].correctAnswer && (
                      <CheckCircle2 className="inline-block ml-2 h-4 w-4 text-green-600" />
                    )}
                    {showFeedback && selectedOption === index && !isCorrect && (
                      <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && (
              <div className={\`mt-4 p-3 rounded-md \${isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}\`}>
                {isCorrect ? "Correct!" : "Incorrect!"}
                {!isCorrect && (
                  <span>
                    {" "}
                    The correct answer is: {quizData[currentQuestion].options[quizData[currentQuestion].correctAnswer]}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-2">Your score:</p>
            <p className="text-3xl font-bold mb-4">{score} / {quizData.length}</p>
            <p className="text-muted-foreground">
              {score === quizData.length
                ? "Perfect score! Excellent job!"
                : score >= quizData.length / 2
                  ? "Good job! You passed the quiz."
                  : "Keep practicing to improve your score."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="font-medium">Score: {score}/{quizData.length}</span>
        </div>
        {!quizCompleted ? (
          showFeedback ? (
            <Button onClick={handleNextQuestion}>
              {currentQuestion < quizData.length - 1 ? "Next Question" : "See Results"}
            </Button>
          ) : (
            <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
              Check Answer
            </Button>
          )
        ) : (
          <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
        )}
      </CardFooter>
    </Card>
  )
}`,
  testCases: [
    {
      description: "Should display the first question on load",
      expected: "First question should be visible",
    },
    {
      description: "Should allow selecting an answer",
      expected: "User should be able to select an option",
    },
    {
      description: "Should show feedback when Check Answer is clicked",
      expected: "Feedback should indicate if the answer was correct",
    },
    {
      description: "Should move to the next question when Next is clicked",
      expected: "Second question should be displayed",
    },
    {
      description: "Should show final score at the end",
      expected: "Summary screen should show total score",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the quiz state",
        content:
          "We need to track the current question, selected option, feedback state, score, and quiz completion status.",
        code: `const [currentQuestion, setCurrentQuestion] = useState(0)
const [selectedOption, setSelectedOption] = useState<number | null>(null)
const [showFeedback, setShowFeedback] = useState(false)
const [score, setScore] = useState(0)
const [quizCompleted, setQuizCompleted] = useState(false)`,
      },
      {
        title: "Create option selection handler",
        content:
          "We need a function to handle when a user selects an answer option.",
        code: `const handleOptionSelect = (index: number) => {
  if (!showFeedback) {
    setSelectedOption(index)
  }
}`,
      },
      {
        title: "Create answer checking function",
        content:
          "We need a function to check if the selected answer is correct and update the score.",
        code: `const handleCheckAnswer = () => {
  if (selectedOption === null) return
  
  setShowFeedback(true)
  
  if (selectedOption === quizData[currentQuestion].correctAnswer) {
    setScore(score + 1)
  }
}`,
      },
      {
        title: "Create next question handler",
        content:
          "We need a function to move to the next question or complete the quiz.",
        code: `const handleNextQuestion = () => {
  setSelectedOption(null)
  setShowFeedback(false)
  
  if (currentQuestion < quizData.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setQuizCompleted(true)
  }
}`,
      },
      {
        title: "Create restart quiz function",
        content: "We need a function to reset the quiz state and start over.",
        code: `const handleRestartQuiz = () => {
  setCurrentQuestion(0)
  setSelectedOption(null)
  setShowFeedback(false)
  setScore(0)
  setQuizCompleted(false)
}`,
      },
      {
        title: "Render the question and options",
        content:
          "We need to display the current question and its answer options.",
        code: `<h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
<RadioGroup value={selectedOption?.toString()} className="space-y-3">
  {quizData[currentQuestion].options.map((option, index) => (
    <div key={index} className="flex items-center space-x-2">
      <RadioGroupItem
        value={index.toString()}
        id={\`option-\${index}\`}
        disabled={showFeedback}
        onClick={() => handleOptionSelect(index)}
      />
      <Label
        htmlFor={\`option-\${index}\`}
        className={
          showFeedback
            ? index === quizData[currentQuestion].correctAnswer
              ? "text-green-600 font-medium"
              : selectedOption === index
              ? "text-red-600 font-medium"
              : ""
            : ""
        }
      >
        {option}
        {showFeedback && index === quizData[currentQuestion].correctAnswer && (
          <CheckCircle2 className="inline-block ml-2 h-4 w-4 text-green-600" />
        )}
        {showFeedback && selectedOption === index && !isCorrect && (
          <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
        )}
      </Label>
    </div>
  ))}
</RadioGroup>

{showFeedback && (
  <div className={\`mt-4 p-3 rounded-md \${isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}\`}>
    {isCorrect ? "Correct!" : "Incorrect!"} 
    {!isCorrect && (
      <span> The correct answer is: {quizData[currentQuestion].options[quizData[currentQuestion].correctAnswer]}</span>
    )}
  </div>
)}`,
      },
      {
        title: "Create the results summary",
        content:
          "We need to display a summary of the quiz results when completed.",
        code: `<div className="text-center py-6">
  <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
  <p className="text-xl mb-2">Your score:</p>
  <p className="text-3xl font-bold mb-4">{score} / {quizData.length}</p>
  <p className="text-muted-foreground">
    {score === quizData.length
      ? "Perfect score! Excellent job!"
      : score >= quizData.length / 2
      ? "Good job! You passed the quiz."
      : "Keep practicing to improve your score."}
  </p>
</div>`,
      },
      {
        title: "Add navigation buttons",
        content:
          "We need to add buttons for checking answers, moving to the next question, and restarting the quiz.",
        code: `<CardFooter className="flex justify-between">
  <div>
    <span className="font-medium">Score: {score}/{quizData.length}</span>
  </div>
  {!quizCompleted ? (
    showFeedback ? (
      <Button onClick={handleNextQuestion}>
        {currentQuestion < quizData.length - 1 ? "Next Question" : "See Results"}
      </Button>
    ) : (
      <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
        Check Answer
      </Button>
    )
  ) : (
    <Button onClick={handleRestartQuiz}>
      Restart Quiz
    </Button>
  )}
</CardFooter>`,
      },
    ],
  },
};
