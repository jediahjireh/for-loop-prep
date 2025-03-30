"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface StepByStepSolutionProps {
  solution: {
    steps: {
      title: string;
      content: string;
      code?: string;
    }[];
  };
}

export function StepByStepSolution({ solution }: StepByStepSolutionProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (expandedSteps.includes(index)) {
      setExpandedSteps(expandedSteps.filter((i) => i !== index));
    } else {
      setExpandedSteps([...expandedSteps, index]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-base">Step-by-Step Solution</h3>

      {solution.steps.map((step, index) => {
        const isExpanded = expandedSteps.includes(index);

        return (
          <div key={index} className="border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-start p-3 font-medium text-left"
              onClick={() => toggleStep(index)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-2 text-green-600" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2 text-green-600" />
              )}
              Step {index + 1}: {step.title}
            </Button>

            {isExpanded && (
              <div className="p-3 pt-0 text-sm">
                <div dangerouslySetInnerHTML={{ __html: step.content }} />

                {step.code && (
                  <pre className="bg-muted p-2 mt-2 rounded-md text-xs overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
