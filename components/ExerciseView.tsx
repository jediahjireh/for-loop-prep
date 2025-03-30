"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Play, Search, StepForward } from "lucide-react";
import type { ExerciseType } from "@/lib/exercises-data";
import { useStats } from "@/components/StatsProvider";

interface ExerciseViewProps {
  exercise: ExerciseType;
  onBack: () => void;
}

export function ExerciseView({ exercise, onBack }: ExerciseViewProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [showSolutionSteps, setShowSolutionSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { incrementAttempt, markCompleted } = useStats();

  const handleRunCode = () => {
    incrementAttempt(exercise.id);
    setIsRunning(true);
    setOutput("Running code...\n");

    // simulate code execution with a delay
    setTimeout(() => {
      setOutput((prev) => prev + "Code executed successfully!\n\nOutput:\n");

      // sample output based on the exercise
      if (exercise.id === "todo-app") {
        setOutput((prev) => prev + "Todo app rendered successfully\n");
      } else if (exercise.id === "string-reversal") {
        setOutput(
          (prev) =>
            prev +
            "Input: ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']\n"
        );
      } else if (exercise.id === "tic-tac-toe") {
        setOutput(
          (prev) => prev + "Tic Tac Toe game initialized\nPlayer X's turn\n"
        );
      } else {
        setOutput((prev) => prev + "Exercise completed successfully\n");
      }

      setIsRunning(false);
    }, 1500);
  };

  const handleTestCode = () => {
    incrementAttempt(exercise.id);
    setIsTesting(true);
    setOutput("Running tests...\n");

    // simulate test execution with a delay
    setTimeout(() => {
      setOutput((prev) => prev + "Testing code against test cases:\n\n");

      // test results based on the exercise test cases
      exercise.testCases.forEach((testCase, index) => {
        // 70% chance to pass for demo
        const passed = Math.random() > 0.3;
        setOutput(
          (prev) => prev + `Test ${index + 1}: ${testCase.description}\n`
        );
        setOutput(
          (prev) =>
            prev +
            `${passed ? "✅ PASSED" : "❌ FAILED"}: ${testCase.expected}\n\n`
        );
      });

      // 70% chance all tests pass for demo
      const allPassed = Math.random() > 0.3;

      if (allPassed) {
        setOutput((prev) => prev + "All tests passed! Great job!\n");
        markCompleted(exercise.id);
      } else {
        setOutput((prev) => prev + "Some tests failed. Keep trying!\n");
      }

      setIsTesting(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearchResults(["Searching..."]);

    // open google search in a new window
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`;
    window.open(googleSearchUrl, "_blank");

    // update the search results with a link to the search
    setSearchResults([
      `Opened Google search for "${searchQuery}"`,
      `Click here to search again if the window was blocked`,
    ]);
  };

  const useSolution = () => {
    setCode(exercise.solutionCode);
  };

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exercises
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{exercise.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{exercise.category}</Badge>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <div
                  dangerouslySetInnerHTML={{ __html: exercise.description }}
                />

                {exercise.examples && exercise.examples.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Examples:</h3>
                    {exercise.examples.map((example, index) => (
                      <pre
                        key={index}
                        className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm"
                      >
                        {example}
                      </pre>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Write your solution below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative min-h-[400px] border rounded-md">
                <textarea
                  title="Code Editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm p-4 w-full h-full min-h-[400px] bg-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {(output || isRunning || isTesting) && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Output:</h3>
                  <pre className="bg-black text-green-400 p-3 rounded-md whitespace-pre-wrap text-sm min-h-[100px] max-h-[200px] overflow-auto">
                    {isRunning && "Running code...\n"}
                    {isTesting && "Testing code...\n"}
                    {output}
                  </pre>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowSolutionSteps(!showSolutionSteps)}
                  className="mr-2"
                >
                  {showSolutionSteps
                    ? "Hide Solution Steps"
                    : "Show Solution Steps"}
                </Button>
                <Button variant="outline" onClick={useSolution}>
                  Use Solution
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={handleRunCode}
                  className="mr-2"
                  disabled={isRunning || isTesting}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
                <Button
                  onClick={handleTestCode}
                  disabled={isRunning || isTesting}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Test
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs
            defaultValue={showSolutionSteps ? "solution" : "reference"}
            value={showSolutionSteps ? "solution" : undefined}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="solution"
                onClick={() => setShowSolutionSteps(true)}
              >
                Step-by-Step
              </TabsTrigger>
              <TabsTrigger
                value="reference"
                onClick={() => setShowSolutionSteps(false)}
              >
                Reference
              </TabsTrigger>
            </TabsList>
            <TabsContent value="solution">
              <Card>
                <CardHeader>
                  <CardTitle>Solution Steps</CardTitle>
                  <CardDescription>
                    Step {currentStep + 1} of{" "}
                    {exercise.stepByStepSolution.steps.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {exercise.stepByStepSolution.steps.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">
                        {exercise.stepByStepSolution.steps[currentStep].title}
                      </h3>
                      <p className="mb-4">
                        {exercise.stepByStepSolution.steps[currentStep].content}
                      </p>
                      {exercise.stepByStepSolution.steps[currentStep].code && (
                        <pre className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm overflow-auto">
                          {exercise.stepByStepSolution.steps[currentStep].code}
                        </pre>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(
                          exercise.stepByStepSolution.steps.length - 1,
                          currentStep + 1
                        )
                      )
                    }
                    disabled={
                      currentStep ===
                      exercise.stepByStepSolution.steps.length - 1
                    }
                  >
                    <StepForward className="h-4 w-4 mr-2" />
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="reference">
              <Card>
                <CardHeader>
                  <CardTitle>Reference Search</CardTitle>
                  <CardDescription>
                    Look up documentation and examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    <input
                      type="text"
                      placeholder="Search Google for help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <Button onClick={handleSearch} className="rounded-l-none">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div>
                      <h3 className="font-medium mb-2">Results:</h3>
                      <ul className="space-y-2">
                        {searchResults.map((result, index) => (
                          <li key={index} className="p-3 bg-muted rounded-md">
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(
                                searchQuery
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {result}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-6">
                      Search Google for documentation and examples to help solve
                      the exercise.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
