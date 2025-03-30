import type { ExerciseType } from "@/lib/exercises-data";

export const stringReversal: ExerciseType = {
  id: "string-reversal",
  title: "String Reversal",
  category: "Algorithms",
  difficulty: "Easy",
  language: "js",
  description: `
    <p>Write a function that reverses a string. The input string is given as an array of characters.</p>
    <p>You must do this by modifying the input array in-place with O(1) extra memory.</p>
  `,
  examples: [
    "Input: ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']",
    "Input: ['H','a','n','n','a','h']\nOutput: ['h','a','n','n','a','H']",
  ],
  initialCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Write your code here
}`,
  solutionCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    // Swap characters
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    
    // Move pointers towards the middle
    left++;
    right--;
  }
}`,
  testCases: [
    {
      description: "Should reverse 'hello'",
      input: "['h','e','l','l','o']",
      expected: "['o','l','l','e','h']",
    },
    {
      description: "Should reverse 'Hannah'",
      input: "['H','a','n','n','a','h']",
      expected: "['h','a','n','n','a','H']",
    },
    {
      description: "Should handle single character",
      input: "['a']",
      expected: "['a']",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Understand the problem",
        content:
          "We need to reverse a string represented as an array of characters in-place, meaning we can't create a new array.",
      },
      {
        title: "Use two pointers approach",
        content:
          "We'll use two pointers: one starting from the beginning (left) and one from the end (right) of the array.",
        code: `let left = 0;
let right = s.length - 1;`,
      },
      {
        title: "Swap characters and move pointers",
        content:
          "While the left pointer is less than the right pointer, we'll swap the characters at these positions and then move the pointers towards the middle.",
        code: `while (left < right) {
  // Swap characters
  const temp = s[left];
  s[left] = s[right];
  s[right] = temp;
  
  // Move pointers towards the middle
  left++;
  right--;
}`,
      },
      {
        title: "Time and Space Complexity",
        content:
          "This solution has a time complexity of O(n) where n is the length of the string, as we process each character once. The space complexity is O(1) as we only use a constant amount of extra space regardless of input size.",
      },
    ],
  },
};
