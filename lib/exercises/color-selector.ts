import type { ExerciseType } from "@/lib/exercises-data";

export const colorSelector: ExerciseType = {
  id: "color-selector",
  title: "Color Selector",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Create an interactive color selector component with various selection modes.</p>
    <p>Requirements:</p>
    <ul>
      <li>Implement a color picker with RGB, HSL, and hex input options</li>
      <li>Display a color preview that updates in real-time</li>
      <li>Allow users to save favorite colors to a palette</li>
      <li>Show the saved colors with their hex values</li>
      <li>Allow users to copy color values to clipboard</li>
      <li>Persist saved colors in localStorage</li>
    </ul>
  `,
  examples: [
    "User selects RGB values: R:255, G:0, B:0\nColor preview shows red\nUser saves the color to palette\nUser can click to copy the hex value #FF0000",
  ],
  initialCode: `"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Copy, Save, Trash } from 'lucide-react'

export default function ColorSelector() {
  // TODO: Implement the color selector component

  return (
    <div className="container py-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Color Selector</h1>

      {/* Implement the color selector UI */}
    </div>
  )
}`,
  solutionCode: `"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Copy, Save, Trash, Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SavedColor {
  id: string
  hex: string
  name?: string
}

// Helper functions for color conversions
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
}

const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbToHsl = (r: number, g: number, b: number): { h: number, s: number, l: number } => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslToRgb = (h: number, s: number, l: number): { r: number, g: number, b: number } => {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export default function ColorSelector() {
  // Color state
  const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 })
  const [hsl, setHsl] = useState({ h: 0, s: 100, l: 50 })
  const [hex, setHex] = useState('#FF0000')
  const [savedColors, setSavedColors] = useState<SavedColor[]>([])
  const [activeTab, setActiveTab] = useState('rgb')
  const [copied, setCopied] = useState(false)

  // Load saved colors from localStorage on mount
  useEffect(() => {
    const savedColorsFromStorage = localStorage.getItem('savedColors')
    if (savedColorsFromStorage) {
      try {
        setSavedColors(JSON.parse(savedColorsFromStorage))
      } catch (e) {
        console.error('Error parsing saved colors from localStorage', e)
      }
    }
  }, [])

  // Save colors to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedColors', JSON.stringify(savedColors))
  }, [savedColors])

  // Update all color formats when RGB changes
  const updateFromRgb = (newRgb: { r: number, g: number, b: number }) => {
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)

    setRgb(newRgb)
    setHex(newHex)
    setHsl(newHsl)
  }

  // Update all color formats when HSL changes
  const updateFromHsl = (newHsl: { h: number, s: number, l: number }) => {
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)

    setHsl(newHsl)
    setRgb(newRgb)
    setHex(newHex)
  }

  // Update all color formats when HEX changes
  const updateFromHex = (newHex: string) => {
    // Validate hex format
    if (!/^#[0-9A-F]{6}$/i.test(newHex)) {
      setHex(newHex)
      return
    }

    const newRgb = hexToRgb(newHex)
    if (!newRgb) return

    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)

    setHex(newHex)
    setRgb(newRgb)
    setHsl(newHsl)
  }

  // Handle RGB slider changes
  const handleRgbChange = (color: 'r' | 'g' | 'b', value: number[]) => {
    const newRgb = { ...rgb, [color]: value[0] }
    updateFromRgb(newRgb)
  }

  // Handle HSL slider changes
  const handleHslChange = (property: 'h' | 's' | 'l', value: number[]) => {
    const newHsl = { ...hsl, [property]: value[0] }
    updateFromHsl(newHsl)
  }

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Ensure the value starts with #
    if (!value.startsWith('#')) {
      value = '#' + value
    }

    // Limit to 7 characters (#RRGGBB)
    if (value.length > 7) {
      value = value.slice(0, 7)
    }

    updateFromHex(value)
  }

  // Save current color to palette
  const saveColor = () => {
    const newColor: SavedColor = {
      id: Date.now().toString(),
      hex: hex
    }

    setSavedColors([...savedColors, newColor])
  }

  // Remove a color from the palette
  const removeColor = (id: string) => {
    setSavedColors(savedColors.filter(color => color.id !== id))
  }

  // Copy color to clipboard
  const copyToClipboard = (colorHex: string) => {
    navigator.clipboard.writeText(colorHex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Get contrasting text color for a background
  const getContrastColor = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor)
    if (!rgb) return '#000000'

    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }

  return (
    <div className="container py-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Color Selector</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                  <TabsTrigger value="hex">Hex</TabsTrigger>
                </TabsList>

                <TabsContent value="rgb" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Red ({rgb.r})</Label>
                        <span className="text-sm text-muted-foreground">0-255</span>
                      </div>
                      <Slider
                        value={[rgb.r]}
                        min={0}
                        max={255}
                        step={1}
                        onValueChange={(value) => handleRgbChange('r', value)}
                        className="[&>[role=slider]]:bg-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Green ({rgb.g})</Label>
                        <span className="text-sm text-muted-foreground">0-255</span>
                      </div>
                      <Slider
                        value={[rgb.g]}
                        min={0}
                        max={255}
                        step={1}
                        onValueChange={(value) => handleRgbChange('g', value)}
                        className="[&>[role=slider]]:bg-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Blue ({rgb.b})</Label>
                        <span className="text-sm text-muted-foreground">0-255</span>
                      </div>
                      <Slider
                        value={[rgb.b]}
                        min={0}
                        max={255}
                        step={1}
                        onValueChange={(value) => handleRgbChange('b', value)}
                        className="[&>[role=slider]]:bg-blue-500"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hsl" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Hue ({hsl.h}°)</Label>
                        <span className="text-sm text-muted-foreground">0-360</span>
                      </div>
                      <Slider
                        value={[hsl.h]}
                        min={0}
                        max={360}
                        step={1}
                        onValueChange={(value) => handleHslChange('h', value)}
                        className="[&>[role=slider]]:bg-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Saturation ({hsl.s}%)</Label>
                        <span className="text-sm text-muted-foreground">0-100</span>
                      </div>
                      <Slider
                        value={[hsl.s]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleHslChange('s', value)}
                        className="[&>[role=slider]]:bg-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Lightness ({hsl.l}%)</Label>
                        <span className="text-sm text-muted-foreground">0-100</span>
                      </div>
                      <Slider
                        value={[hsl.l]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleHslChange('l', value)}
                        className="[&>[role=slider]]:bg-primary"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hex" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="hex-input">Hex Color</Label>
                    <Input
                      id="hex-input"
                      value={hex}
                      onChange={handleHexChange}
                      placeholder="#RRGGBB"
                      className="font-mono uppercase"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a valid hex color code (e.g., #FF0000 for red)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(hex)}
                  className="relative"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy color</span>
                </Button>
                <span className="font-mono uppercase">{hex}</span>
              </div>
              <Button onClick={saveColor}>
                <Save className="h-4 w-4 mr-2" />
                Save Color
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full aspect-square rounded-md border"
                style={{ backgroundColor: hex }}
              />

              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Color Values:</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">RGB:</span> {rgb.r}, {rgb.g}, {rgb.b}</p>
                  <p><span className="font-medium">HSL:</span> {hsl.h}°, {hsl.s}%, {hsl.l}%</p>
                  <p><span className="font-medium">HEX:</span> {hex.toUpperCase()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Saved Colors</CardTitle>
            </CardHeader>
            <CardContent>
              {savedColors.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No colors saved yet
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {savedColors.map(color => (
                    <div
                      key={color.id}
                      className="relative group"
                    >
                      <div
                        className="h-12 rounded-md flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: color.hex,
                          color: getContrastColor(color.hex)
                        }}
                        onClick={() => copyToClipboard(color.hex)}
                      >
                        <span className="text-xs font-mono opacity-80 group-hover:opacity-100">
                          {color.hex.toUpperCase()}
                        </span>
                      </div>
                      <button
                        className="absolute -top-1 -right-1 bg-background rounded-full w-5 h-5 flex items-center justify-center border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeColor(color.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}`,
  testCases: [
    {
      description:
        "Should display a color preview that updates when values change",
      expected: "Color preview should match the selected color values",
    },
    {
      description: "Should convert between RGB, HSL, and hex formats correctly",
      expected: "All color format values should be consistent with each other",
    },
    {
      description: "Should allow saving colors to a palette",
      expected: "Saved colors should appear in the palette section",
    },
    {
      description: "Should allow copying color values to clipboard",
      expected: "Clicking copy button should copy the hex value to clipboard",
    },
    {
      description: "Should persist saved colors after page refresh",
      expected: "Saved colors should be loaded from localStorage on page load",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up color conversion utilities",
        content:
          "Create helper functions for converting between RGB, HSL, and hex color formats.",
        code: `// Helper functions for color conversions
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
}

const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbToHsl = (r: number, g: number, b: number): { h: number, s: number, l: number } => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslToRgb = (h: number, s: number, l: number): { r: number, g: number, b: number } => {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}`,
      },
      {
        title: "Set up component state",
        content:
          "Define state variables for color values, saved colors, and UI state.",
        code: `interface SavedColor {
  id: string
  hex: string
  name?: string
}

// Color state
const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 })
const [hsl, setHsl] = useState({ h: 0, s: 100, l: 50 })
const [hex, setHex] = useState('#FF0000')
const [savedColors, setSavedColors] = useState<SavedColor[]>([])
const [activeTab, setActiveTab] = useState('rgb')
const [copied, setCopied] = useState(false)`,
      },
      {
        title: "Implement localStorage persistence",
        content:
          "Add useEffect hooks to load and save colors from localStorage.",
        code: `// Load saved colors from localStorage on mount
useEffect(() => {
  const savedColorsFromStorage = localStorage.getItem('savedColors')
  if (savedColorsFromStorage) {
    try {
      setSavedColors(JSON.parse(savedColorsFromStorage))
    } catch (e) {
      console.error('Error parsing saved colors from localStorage', e)
    }
  }
}, [])

// Save colors to localStorage when they change
useEffect(() => {
  localStorage.setItem('savedColors', JSON.stringify(savedColors))
}, [savedColors])`,
      },
      {
        title: "Create color update functions",
        content:
          "Implement functions to update all color formats when one format changes.",
        code: `// Update all color formats when RGB changes
const updateFromRgb = (newRgb: { r: number, g: number, b: number }) => {
  const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
  const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)

  setRgb(newRgb)
  setHex(newHex)
  setHsl(newHsl)
}

// Update all color formats when HSL changes
const updateFromHsl = (newHsl: { h: number, s: number, l: number }) => {
  const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
  const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)

  setHsl(newHsl)
  setRgb(newRgb)
  setHex(newHex)
}

// Update all color formats when HEX changes
const updateFromHex = (newHex: string) => {
  // Validate hex format
  if (!/^#[0-9A-F]{6}$/i.test(newHex)) {
    setHex(newHex)
    return
  }

  const newRgb = hexToRgb(newHex)
  if (!newRgb) return

  const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)

  setHex(newHex)
  setRgb(newRgb)
  setHsl(newHsl)
}`,
      },
      {
        title: "Implement input handlers",
        content:
          "Create functions to handle user input for RGB, HSL, and hex values.",
        code: `// Handle RGB slider changes
const handleRgbChange = (color: 'r' | 'g' | 'b', value: number[]) => {
  const newRgb = { ...rgb, [color]: value[0] }
  updateFromRgb(newRgb)
}

// Handle HSL slider changes
const handleHslChange = (property: 'h' | 's' | 'l', value: number[]) => {
  const newHsl = { ...hsl, [property]: value[0] }
  updateFromHsl(newHsl)
}

// Handle hex input change
const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value

  // Ensure the value starts with #
  if (!value.startsWith('#')) {
    value = '#' + value
  }

  // Limit to 7 characters (#RRGGBB)
  if (value.length > 7) {
    value = value.slice(0, 7)
  }

  updateFromHex(value)
}`,
      },
      {
        title: "Add color management functions",
        content:
          "Create functions to handle user input for RGB, HSL, and hex values.",
        code: `// To do`,
      },
    ],
  },
};
