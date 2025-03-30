import type { ExerciseType } from "@/lib/exercises-data";

export const alphabetTileGame: ExerciseType = {
  id: "alphabet-tile-game",
  title: "Alphabet Tile Game",
  category: "React",
  difficulty: "Hard",
  language: "tsx",
  description: `
    <p>Create an interactive alphabet tile game where users arrange letter tiles to form words.</p>
    <p>Requirements:</p>
    <ul>
      <li>Display a set of draggable letter tiles with the full alphabet</li>
      <li>Provide a target area where users can drop tiles to form words</li>
      <li>Add a button to check if the formed word is valid (using a simple dictionary)</li>
      <li>Track and display the score based on word length and letter values</li>
      <li>Allow users to reset the game and get a new set of random tiles</li>
      <li>Show a countdown timer for each round (60 seconds)</li>
    </ul>
  `,
  examples: [
    "User drags letters 'C', 'A', 'T' to the word area\nUser clicks Check Word\nSystem confirms 'CAT' is valid and awards points\nTimer counts down from 60 seconds",
  ],
  initialCode: `"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react'

// Simple English dictionary for word validation - normally this would be from an API
const dictionary = [
  "cat", "dog", "hat", "bat", "rat", "sat", "mat", "pat", "tap", "map", 
  "cap", "lap", "nap", "gap", "sap", "tag", "bag", "rag", "wag", "nag",
  "the", "and", "for", "are", "but", "not", "you", "all", "any", "can", 
  "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
  "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy",
  "did", "its", "let", "put", "say", "she", "too", "use", "dad", "mom"
];

// Letter values (similar to Scrabble)
const letterValues = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
  k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
  u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

// Helper to generate random letters with better distribution
const generateRandomLetters = (count: number) => {
  // Vowels and consonants with rough frequency in English
  const vowels = 'aeiouy';
  const consonants = 'bcdfghjklmnpqrstvwxz';
  
  let letters = [];
  // Aim for roughly 40% vowels, 60% consonants
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.4) {
      // Add a vowel
      letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
    } else {
      // Add a consonant
      letters.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }
  }
  return letters;
};

export default function AlphabetTileGame() {
  // TODO: Implement the game
  
  return (
    <div className="container py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Alphabet Tile Game</h1>
      
      {/* Implement the game board, tiles, word area, score, and timer */}
    </div>
  )
}`,
  solutionCode: `"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, RefreshCw, Clock, ThumbsUp } from 'lucide-react'
import { cn } from "@/lib/utils"

// Simple English dictionary for word validation - normally this would be from an API
const dictionary = [
  "cat", "dog", "hat", "bat", "rat", "sat", "mat", "pat", "tap", "map", 
  "cap", "lap", "nap", "gap", "sap", "tag", "bag", "rag", "wag", "nag",
  "the", "and", "for", "are", "but", "not", "you", "all", "any", "can", 
  "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
  "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy",
  "did", "its", "let", "put", "say", "she", "too", "use", "dad", "mom"
];

// Letter values (similar to Scrabble)
const letterValues = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
  k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
  u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

// Helper to generate random letters with better distribution
const generateRandomLetters = (count: number) => {
  // Vowels and consonants with rough frequency in English
  const vowels = 'aeiouy';
  const consonants = 'bcdfghjklmnpqrstvwxz';
  
  let letters = [];
  // Aim for roughly 40% vowels, 60% consonants
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.4) {
      // Add a vowel
      letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
    } else {
      // Add a consonant
      letters.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }
  }
  return letters;
};

interface TileProps {
  letter: string;
  index: number;
  onDragStart: (index: number) => void;
  isInHand: boolean;
  onRemove?: () => void;
}

const Tile: React.FC<TileProps> = ({ letter, index, onDragStart, isInHand, onRemove }) => {
  return (
    <div
      draggable={isInHand}
      onDragStart={() => onDragStart(index)}
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-md select-none cursor-move relative",
        isInHand ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
      )}
    >
      <span className="text-xl font-bold uppercase">{letter}</span>
      <span className="absolute bottom-1 right-1 text-xs">
        {letterValues[letter as keyof typeof letterValues]}
      </span>
      {!isInHand && onRemove && (
        <button 
          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </div>
  );
};

interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function AlphabetTileGame() {
  const [tilePack, setTilePack] = useState<string[]>([]);
  const [handTiles, setHandTiles] = useState<string[]>([]);
  const [wordTiles, setWordTiles] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  
  const wordAreaRef = useRef<HTMLDivElement>(null);
  
  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isGameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive) {
      handleGameOver();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, isGameActive]);
  
  const initializeGame = () => {
    const initialTiles = generateRandomLetters(20);
    setTilePack(initialTiles);
    setHandTiles(initialTiles.slice(0, 7));
    setWordTiles([]);
    setTimeLeft(60);
    setIsGameActive(true);
    setFeedback(null);
    setUsedWords([]);
  };
  
  const handleGameOver = () => {
    setIsGameActive(false);
    setFeedback({
      type: 'info',
      message: \`Game over! Final score: \${score}\`
    });
  };
  
  const handleTileSelect = (index: number) => {
    if (!isGameActive) return;
    
    const tile = handTiles[index];
    
    // Move tile from hand to word area
    const newHand = [...handTiles];
    newHand.splice(index, 1);
    
    // Add to word
    const newWord = [...wordTiles, tile];
    
    setHandTiles(newHand);
    setWordTiles(newWord);
  };
  
  const handleRemoveTile = (index: number) => {
    if (!isGameActive) return;
    
    // Move tile from word area back to hand
    const tile = wordTiles[index];
    const newWord = [...wordTiles];
    newWord.splice(index, 1);
    
    setHandTiles([...handTiles, tile]);
    setWordTiles(newWord);
  };
  
  const handleCheckWord = () => {
    if (!isGameActive || wordTiles.length === 0) return;
    
    const word = wordTiles.join('').toLowerCase();
    
    // Check if word has been used before
    if (usedWords.includes(word)) {
      setFeedback({
        type: 'error',
        message: \`You've already used "\${word}"!\`
      });
      return;
    }
    
    // Check if word is in dictionary
    if (dictionary.includes(word)) {
      // Calculate score
      let wordScore = wordTiles.reduce((total, letter) => {
        return total + letterValues[letter as keyof typeof letterValues];
      }, 0);
      
      // Bonus for longer words
      if (word.length >= 5) wordScore *= 2;
      
      setScore(score + wordScore);
      setUsedWords([...usedWords, word]);
      
      setFeedback({
        type: 'success',
        message: \`"\${word}" is valid! +\${wordScore} points\`
      });
      
      // Draw new tiles
      const newTilePack = [...tilePack];
      const drawCount = Math.min(wordTiles.length, newTilePack.length);
      const newTiles = newTilePack.splice(0, drawCount);
      
      setTilePack(newTilePack);
      setHandTiles([...handTiles, ...newTiles]);
      setWordTiles([]);
      
      // Extra time for valid words
      setTimeLeft(Math.min(timeLeft + 3, 60));
    } else {
      setFeedback({
        type: 'error',
        message: \`"\${word}" is not in the dictionary\`
      });
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (wordAreaRef.current) {
      wordAreaRef.current.classList.add('border-primary');
    }
  };
  
  const handleDragLeave = () => {
    if (wordAreaRef.current) {
      wordAreaRef.current.classList.remove('border-primary');
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDragLeave();
  };
  
  const handlePlayAgain = () => {
    setScore(0);
    initializeGame();
  };
  
  return (
    <div className="container py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2 text-center">Alphabet Tile Game</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">{score}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <div className="w-24 mr-2">
            <Progress value={(timeLeft / 60) * 100} className="h-2.5" />
          </div>
          <span>{timeLeft}s</span>
        </div>
      </div>
      
      {feedback && (
        <div className={cn(
          "p-3 rounded-md mb-4 flex items-center gap-2",
          feedback.type === 'success' ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" :
          feedback.type === 'error' ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400" :
          "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
        )}>
          {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : 
           feedback.type === 'error' ? <XCircle className="h-5 w-5" /> :
           <AlertCircle className="h-5 w-5" />}
          {feedback.message}
        </div>
      )}
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Word</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={wordAreaRef}
            className="min-h-20 border-2 border-dashed rounded-md p-4 flex flex-wrap gap-2 items-center justify-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {wordTiles.length === 0 ? (
              <p className="text-muted-foreground">Drag letters here to form a word</p>
            ) : (
              wordTiles.map((letter, index) => (
                <Tile 
                  key={index} 
                  letter={letter} 
                  index={index} 
                  onDragStart={() => {}} 
                  isInHand={false}
                  onRemove={() => handleRemoveTile(index)}
                />
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button 
            onClick={handleCheckWord} 
            disabled={!isGameActive || wordTiles.length === 0}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Check Word
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Tiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {handTiles.map((letter, index) => (
              <Tile 
                key={index} 
                letter={letter} 
                index={index} 
                onDragStart={handleTileSelect} 
                isInHand={true}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Badge variant="outline" className="mr-2">
              Pack: {tilePack.length} tiles left
            </Badge>
            <Badge variant="outline">
              Words: {usedWords.length}
            </Badge>
          </div>
          <Button onClick={handlePlayAgain} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {isGameActive ? "Restart" : "Play Again"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
  testCases: [
    {
      description: "Should render initial tile set",
      expected: "Should display 7 letter tiles in the player's hand",
    },
    {
      description: "Should allow dragging tiles to the word area",
      expected: "Tiles should be movable from hand to word area",
    },
    {
      description: "Should validate words against the dictionary",
      expected:
        "Valid words should increase score, invalid words should show error",
    },
    {
      description: "Should track time remaining",
      expected: "Timer should count down from 60 seconds",
    },
    {
      description: "Should allow restarting the game",
      expected: "Game should reset when restart button is clicked",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up game state and components",
        content:
          "Define state variables for tiles, words, score, timer, and game status.",
        code: `interface TileProps {
  letter: string;
  index: number;
  onDragStart: (index: number) => void;
  isInHand: boolean;
  onRemove?: () => void;
}

const Tile: React.FC<TileProps> = ({ letter, index, onDragStart, isInHand, onRemove }) => {
  return (
    <div
      draggable={isInHand}
      onDragStart={() => onDragStart(index)}
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-md select-none cursor-move relative",
        isInHand ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
      )}
    >
      <span className="text-xl font-bold uppercase">{letter}</span>
      <span className="absolute bottom-1 right-1 text-xs">
        {letterValues[letter as keyof typeof letterValues]}
      </span>
      {!isInHand && onRemove && (
        <button 
          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </div>
  );
};

interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  message: string;
}

const [tilePack, setTilePack] = useState<string[]>([]);
const [handTiles, setHandTiles] = useState<string[]>([]);
const [wordTiles, setWordTiles] = useState<string[]>([]);
const [score, setScore] = useState(0);
const [timeLeft, setTimeLeft] = useState(60);
const [isGameActive, setIsGameActive] = useState(false);
const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
const [usedWords, setUsedWords] = useState<string[]>([]);

const wordAreaRef = useRef<HTMLDivElement>(null);`,
      },
      {
        title: "Initialize the game",
        content:
          "Create a function to set up the initial game state and handle game over.",
        code: `// Initialize game
useEffect(() => {
  initializeGame();
}, []);

const initializeGame = () => {
  const initialTiles = generateRandomLetters(20);
  setTilePack(initialTiles);
  setHandTiles(initialTiles.slice(0, 7));
  setWordTiles([]);
  setTimeLeft(60);
  setIsGameActive(true);
  setFeedback(null);
  setUsedWords([]);
};

const handleGameOver = () => {
  setIsGameActive(false);
  setFeedback({
    type: 'info',
    message: \`Game over! Final score: \${score}\`
  });
};`,
      },
      {
        title: "Implement the timer countdown",
        content: "Add a useEffect hook to handle the game timer.",
        code: `// Timer countdown
useEffect(() => {
  let timer: NodeJS.Timeout;
  
  if (isGameActive && timeLeft > 0) {
    timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
  } else if (timeLeft === 0 && isGameActive) {
    handleGameOver();
  }
  
  return () => {
    if (timer) clearTimeout(timer);
  };
}, [timeLeft, isGameActive]);`,
      },
      {
        title: "Handle tile movement",
        content:
          "Create functions to move tiles between the hand and word area.",
        code: `const handleTileSelect = (index: number) => {
  if (!isGameActive) return;
  
  const tile = handTiles[index];
  
  // Move tile from hand to word area
  const newHand = [...handTiles];
  newHand.splice(index, 1);
  
  // Add to word
  const newWord = [...wordTiles, tile];
  
  setHandTiles(newHand);
  setWordTiles(newWord);
};

const handleRemoveTile = (index: number) => {
  if (!isGameActive) return;
  
  // Move tile from word area back to hand
  const tile = wordTiles[index];
  const newWord = [...wordTiles];
  newWord.splice(index, 1);
  
  setHandTiles([...handTiles, tile]);
  setWordTiles(newWord);
};`,
      },
      {
        title: "Implement word validation",
        content:
          "Create a function to check words against the dictionary and calculate score.",
        code: `const handleCheckWord = () => {
  if (!isGameActive || wordTiles.length === 0) return;
  
  const word = wordTiles.join('').toLowerCase();
  
  // Check if word has been used before
  if (usedWords.includes(word)) {
    setFeedback({
      type: 'error',
      message: \`You've already used "\${word}"!\`
    });
    return;
  }
  
  // Check if word is in dictionary
  if (dictionary.includes(word)) {
    // Calculate score
    let wordScore = wordTiles.reduce((total, letter) => {
      return total + letterValues[letter as keyof typeof letterValues];
    }, 0);
    
    // Bonus for longer words
    if (word.length >= 5) wordScore *= 2;
    
    setScore(score + wordScore);
    setUsedWords([...usedWords, word]);
    
    setFeedback({
      type: 'success',
      message: \`"\${word}" is valid! +\${wordScore} points\`
    });
    
    // Draw new tiles
    const newTilePack = [...tilePack];
    const drawCount = Math.min(wordTiles.length, newTilePack.length);
    const newTiles = newTilePack.splice(0, drawCount);
    
    setTilePack(newTilePack);
    setHandTiles([...handTiles, ...newTiles]);
    setWordTiles([]);
    
    // Extra time for valid words
    setTimeLeft(Math.min(timeLeft + 3, 60));
  } else {
    setFeedback({
      type: 'error',
      message: \`"\${word}" is not in the dictionary\`
    });
  }
};`,
      },
      {
        title: "Add drag and drop handlers",
        content: "Implement drag and drop functionality for tiles.",
        code: `const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  if (wordAreaRef.current) {
    wordAreaRef.current.classList.add('border-primary');
  }
};

const handleDragLeave = () => {
  if (wordAreaRef.current) {
    wordAreaRef.current.classList.remove('border-primary');
  }
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  handleDragLeave();
};`,
      },
      {
        title: "Create game UI",
        content:
          "Build the UI for the game including score, timer, word area, and tile rack.",
        code: `<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-2">
    <ThumbsUp className="h-5 w-5 text-primary" />
    <span className="font-bold text-lg">{score}</span>
  </div>
  
  <div className="flex items-center gap-2">
    <Clock className="h-5 w-5 text-yellow-500" />
    <div className="w-24 mr-2">
      <Progress value={(timeLeft / 60) * 100} className="h-2.5" />
    </div>
    <span>{timeLeft}s</span>
  </div>
</div>

{feedback && (
  <div className={cn(
    "p-3 rounded-md mb-4 flex items-center gap-2",
    feedback.type === 'success' ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" :
    feedback.type === 'error' ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400" :
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
  )}>
    {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : 
     feedback.type === 'error' ? <XCircle className="h-5 w-5" /> :
     <AlertCircle className="h-5 w-5" />}
    {feedback.message}
  </div>
)}`,
      },
      {
        title: "Create the Word Area and Tile Rack",
        content: "Build the containers for word creation and tile display.",
        code: `<Card className="mb-6">
  <CardHeader>
    <CardTitle>Your Word</CardTitle>
  </CardHeader>
  <CardContent>
    <div 
      ref={wordAreaRef}
      className="min-h-20 border-2 border-dashed rounded-md p-4 flex flex-wrap gap-2 items-center justify-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {wordTiles.length === 0 ? (
        <p className="text-muted-foreground">Drag letters here to form a word</p>
      ) : (
        wordTiles.map((letter, index) => (
          <Tile 
            key={index} 
            letter={letter} 
            index={index} 
            onDragStart={() => {}} 
            isInHand={false}
            onRemove={() => handleRemoveTile(index)}
          />
        ))
      )}
    </div>
  </CardContent>
  <CardFooter className="flex gap-2 justify-center">
    <Button 
      onClick={handleCheckWord} 
      disabled={!isGameActive || wordTiles.length === 0}
    >
      <CheckCircle className="h-4 w-4 mr-2" />
      Check Word
    </Button>
  </CardFooter>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Your Tiles</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-wrap gap-2 justify-center">
      {handTiles.map((letter, index) => (
        <Tile 
          key={index} 
          letter={letter} 
          index={index} 
          onDragStart={handleTileSelect} 
          isInHand={true}
        />
      ))}
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <div>
      <Badge variant="outline" className="mr-2">
        Pack: {tilePack.length} tiles left
      </Badge>
      <Badge variant="outline">
        Words: {usedWords.length}
      </Badge>
    </div>
    <Button onClick={handlePlayAgain} variant="outline">
      <RefreshCw className="h-4 w-4 mr-2" />
      {isGameActive ? "Restart" : "Play Again"}
    </Button>
  </CardFooter>
</Card>`,
      },
    ],
  },
};
