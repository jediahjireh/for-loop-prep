import type { ExerciseType } from "@/lib/exercises-data";

export const ticTacToe: ExerciseType = {
  id: "tic-tac-toe",
  title: "Tic Tac Toe Game",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Build a functional Tic Tac Toe game using React. The game should:</p>
    <ul>
      <li>Allow two players to take turns (X and O)</li>
      <li>Indicate which player's turn it is</li>
      <li>Determine when a player has won</li>
      <li>Prevent moves on already filled squares</li>
      <li>Display the game status (next player, winner, or draw)</li>
      <li>Include a reset button to start a new game</li>
    </ul>
  `,
  examples: [
    "Player X clicks a square, it shows 'X'\nPlayer O clicks another square, it shows 'O'\nWhen a player gets three in a row, show '{Player} wins!'",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TicTacToe() {
  // TODO: Implement the game logic and UI
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Tic Tac Toe</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Game board goes here */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>{/* Game status */}</div>
        <Button>Reset Game</Button>
      </CardFooter>
    </Card>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    
    return null
  }
  
  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(square => square !== null)
  
  const getStatus = () => {
    if (winner) {
      return \`Winner: \${winner}\`
    } else if (isDraw) {
      return "Game ended in a draw"
    } else {
      return \`Next player: \${xIsNext ? "X" : "O"}\`
    }
  }
  
  const handleClick = (i) => {
    // If square is already filled or game is won, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? "X" : "O"
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }
  
  const renderSquare = (i) => {
    return (
      <Button
        variant="outline"
        className="h-20 w-20 text-2xl font-bold"
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </Button>
    )
  }
  
  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Tic Tac Toe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-medium">{getStatus()}</div>
        <Button onClick={resetGame}>Reset Game</Button>
      </CardFooter>
    </Card>
  )
}`,
  testCases: [
    {
      description: "Should display X when first square is clicked",
      expected: "First square should show X",
    },
    {
      description: "Should display O when second square is clicked",
      expected: "Second square should show O",
    },
    {
      description: "Should declare winner when three in a row",
      expected: "Status should show 'Winner: X' or 'Winner: O'",
    },
    {
      description: "Should reset the game when reset button is clicked",
      expected: "All squares should be empty and next player should be X",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the game state",
        content:
          "We need to track the state of the board (9 squares) and whose turn it is.",
        code: `const [squares, setSquares] = useState(Array(9).fill(null))
const [xIsNext, setXIsNext] = useState(true)`,
      },
      {
        title: "Create a function to check for a winner",
        content:
          "We need to check all possible winning combinations (rows, columns, and diagonals).",
        code: `const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ]
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  
  return null
}`,
      },
      {
        title: "Determine the game status",
        content:
          "We need to show whose turn it is, or if someone has won, or if it's a draw.",
        code: `const winner = calculateWinner(squares)
const isDraw = !winner && squares.every(square => square !== null)

const getStatus = () => {
  if (winner) {
    return \`Winner: \${winner}\`
  } else if (isDraw) {
    return "Game ended in a draw"
  } else {
    return \`Next player: \${xIsNext ? "X" : "O"}\`
  }
}`,
      },
      {
        title: "Handle square clicks",
        content:
          "When a player clicks a square, we need to update the board if the move is valid.",
        code: `const handleClick = (i) => {
  // If square is already filled or game is won, do nothing
  if (squares[i] || calculateWinner(squares)) {
    return
  }
  
  const newSquares = squares.slice()
  newSquares[i] = xIsNext ? "X" : "O"
  setSquares(newSquares)
  setXIsNext(!xIsNext)
}`,
      },
      {
        title: "Create a function to render each square",
        content: "We'll create a helper function to render each square button.",
        code: `const renderSquare = (i) => {
  return (
    <Button
      variant="outline"
      className="h-20 w-20 text-2xl font-bold"
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </Button>
  )
}`,
      },
      {
        title: "Add a reset function",
        content: "We need a way to start a new game.",
        code: `const resetGame = () => {
  setSquares(Array(9).fill(null))
  setXIsNext(true)
}`,
      },
      {
        title: "Render the game board",
        content: "Now we can render the 3x3 grid of squares.",
        code: `<div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
  {renderSquare(0)}
  {renderSquare(1)}
  {renderSquare(2)}
  {renderSquare(3)}
  {renderSquare(4)}
  {renderSquare(5)}
  {renderSquare(6)}
  {renderSquare(7)}
  {renderSquare(8)}
</div>`,
      },
    ],
  },
};
