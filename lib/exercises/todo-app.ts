import type { ExerciseType } from "@/lib/exercises-data";

export const todoApp: ExerciseType = {
  id: "todo-app",
  title: "React Todo App",
  category: "React",
  difficulty: "Easy",
  language: "tsx",
  description: `
    <p>Build a simple React Todo application that allows users to:</p>
    <ul>
      <li>Add new tasks to the list</li>
      <li>Mark tasks as completed (with strikethrough styling)</li>
      <li>Remove tasks from the list</li>
    </ul>
    <p>Your component should maintain a list of todos in state, each with an id, text content, and completed status.</p>
  `,
  examples: [
    "Adding 'Learn React' should add it to the list\nChecking the checkbox should mark it as completed with strikethrough\nClicking the X button should remove it from the list",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// TODO: Implement the Todo List component
// Each todo should have: id, text, and completed status
// Users should be able to add, toggle completion, and remove todos

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  // Add your code here

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Render your todo list here */}
        <p className="text-center text-muted-foreground py-6">
          Your todo list is empty. Add some tasks to get started!
        </p>
      </CardContent>
    </Card>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            Your todo list is empty. Add some tasks to get started!
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
                <Checkbox id={\`todo-\${todo.id}\`} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                <label
                  htmlFor={\`todo-\${todo.id}\`}
                  className={\`flex-grow cursor-pointer \${todo.completed ? "line-through text-muted-foreground" : ""}\`}
                >
                  {todo.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Remove todo"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}`,
  testCases: [
    {
      description: "Should add a new todo when the Add button is clicked",
      expected: "Todo list should contain the new todo",
    },
    {
      description: "Should toggle completion status when checkbox is clicked",
      expected: "Todo should have strikethrough styling when completed",
    },
    {
      description: "Should remove a todo when the X button is clicked",
      expected: "Todo should be removed from the list",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the Todo interface and state",
        content:
          "First, we need to define the structure of our Todo items and set up the state to store them.",
        code: `interface Todo {
  id: number
  text: string
  completed: boolean
}

const [todos, setTodos] = useState<Todo[]>([])
const [newTodo, setNewTodo] = useState("")
`,
      },
      {
        title: "Implement the addTodo function",
        content:
          "Create a function to add new todos to the list. We'll generate a unique ID using Date.now().",
        code: `const addTodo = () => {
  if (newTodo.trim() === "") return

  const todo: Todo = {
    id: Date.now(),
    text: newTodo,
    completed: false,
  }

  setTodos([...todos, todo])
  setNewTodo("")
}`,
      },
      {
        title: "Implement the toggleTodo function",
        content: "Create a function to toggle the completed status of a todo.",
        code: `const toggleTodo = (id: number) => {
  setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
}`,
      },
      {
        title: "Implement the removeTodo function",
        content: "Create a function to remove a todo from the list.",
        code: `const removeTodo = (id: number) => {
  setTodos(todos.filter((todo) => todo.id !== id))
}`,
      },
      {
        title: "Add keyboard support",
        content: "Allow users to add a todo by pressing Enter.",
        code: `const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    addTodo()
  }
}`,
      },
      {
        title: "Connect the UI to the functions",
        content: "Update the input and button to use our state and functions.",
        code: `<Input
  placeholder="Add a new todo..."
  value={newTodo}
  onChange={(e) => setNewTodo(e.target.value)}
  onKeyDown={handleKeyDown}
/>
<Button onClick={addTodo}>
  <Plus className="h-4 w-4 mr-2" />
  Add
</Button>`,
      },
      {
        title: "Render the todo list",
        content:
          "Display the list of todos with checkboxes and remove buttons.",
        code: `{todos.length === 0 ? (
  <p className="text-center text-muted-foreground py-6">
    Your todo list is empty. Add some tasks to get started!
  </p>
) : (
  <ul className="space-y-3">
    {todos.map((todo) => (
      <li key={todo.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
        <Checkbox id={\`todo-\${todo.id}\`} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
        <label
          htmlFor={\`todo-\${todo.id}\`}
          className={\`flex-grow cursor-pointer \${todo.completed ? "line-through text-muted-foreground" : ""}\`}
        >
          {todo.text}
        </label>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => removeTodo(todo.id)}
          aria-label="Remove todo"
        >
          <X className="h-4 w-4" />
        </Button>
      </li>
    ))}
  </ul>
)}`,
      },
    ],
  },
};
