import type { ExerciseType } from "@/lib/exercises-data";

export const languageContextSwitcher: ExerciseType = {
  id: "language-context-switcher",
  title: "Language Context Switcher",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Build a language switcher using React Context to manage multilingual content.</p>
    <p>Requirements:</p>
    <ul>
      <li>Create a context to store the current language and translations</li>
      <li>Implement a language switcher component with at least 3 languages (English, Spanish, French)</li>
      <li>Build a simple interface that displays content in the selected language</li>
      <li>Include at least 4 translatable elements (greeting, description, button labels, etc.)</li>
      <li>Update all text content when language changes</li>
      <li>Store the language preference in localStorage to persist between page refreshes</li>
    </ul>
  `,
  examples: [
    "App loads with default language (English)\nUser selects Spanish from dropdown\nAll text elements change to Spanish\nUser refreshes the page\nSpanish is still selected",
  ],
  initialCode: `"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from 'lucide-react'

// TODO: Create Language Context and Translations

export default function LanguageContextSwitcher() {
  // TODO: Implement the language switcher component
  
  return (
    <div className="container py-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Language Context Demo</h1>
      
      {/* Implement language selector and translatable content */}
    </div>
  )
}`,
  solutionCode: `"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Mail, ShoppingCart, User } from 'lucide-react'

// Define available languages
type Language = "en" | "es" | "fr"

// Define structure for translations
interface Translations {
  greeting: string
  description: string
  buttonLogin: string
  buttonSignup: string
  welcomeMessage: string
  settings: string
  contactUs: string
  shoppingCart: string
  menuLabel: string
}

// Define translation data
const translationData: Record<Language, Translations> = {
  en: {
    greeting: "Welcome to our Application",
    description: "This is a demo of a multilingual interface using React Context",
    buttonLogin: "Login",
    buttonSignup: "Sign Up",
    welcomeMessage: "Hello, user! Welcome to our platform.",
    settings: "Settings",
    contactUs: "Contact Us",
    shoppingCart: "Shopping Cart",
    menuLabel: "Select a language",
  },
  es: {
    greeting: "Bienvenido a nuestra Aplicación",
    description: "Esta es una demostración de una interfaz multilingüe utilizando React Context",
    buttonLogin: "Iniciar Sesión",
    buttonSignup: "Registrarse",
    welcomeMessage: "¡Hola, usuario! Bienvenido a nuestra plataforma.",
    settings: "Configuración",
    contactUs: "Contáctenos",
    shoppingCart: "Carrito de Compras",
    menuLabel: "Seleccione un idioma",
  },
  fr: {
    greeting: "Bienvenue dans notre Application",
    description: "Ceci est une démonstration d'une interface multilingue utilisant React Context",
    buttonLogin: "Connexion",
    buttonSignup: "S'inscrire",
    welcomeMessage: "Bonjour, utilisateur ! Bienvenue sur notre plateforme.",
    settings: "Paramètres",
    contactUs: "Contactez-nous",
    shoppingCart: "Panier d'achat",
    menuLabel: "Sélectionnez une langue",
  }
}

// Create Language Context
interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language Provider Component
interface LanguageProviderProps {
  children: React.ReactNode
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en")
  
  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language | null
    if (savedLanguage && ["en", "es", "fr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])
  
  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("preferred-language", newLanguage)
  }
  
  const translations = translationData[language]
  
  const value = {
    language,
    translations,
    setLanguage
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use language context
const useLanguage = () => {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  
  return context
}

// Language Selector Component
const LanguageSelector: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage()
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translations.menuLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

// Content Component Using Translations
const TranslatedContent: React.FC = () => {
  const { translations } = useLanguage()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.greeting}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{translations.description}</p>
        <p className="p-3 bg-muted rounded-md">{translations.welcomeMessage}</p>
        
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{translations.settings}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{translations.contactUs}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />
            <span>{translations.shoppingCart}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{translations.buttonLogin}</Button>
        <Button>{translations.buttonSignup}</Button>
      </CardFooter>
    </Card>
  )
}

export default function LanguageContextSwitcher() {
  return (
    <LanguageProvider>
      <div className="container py-6 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Language Context Demo</h1>
          <LanguageSelector />
        </div>
        
        <TranslatedContent />
      </div>
    </LanguageProvider>
  )
}`,
  testCases: [
    {
      description: "Should display content in English by default",
      expected: "Initial content should be in English",
    },
    {
      description: "Should switch to Spanish when Spanish is selected",
      expected: "All text content should change to Spanish",
    },
    {
      description: "Should switch to French when French is selected",
      expected: "All text content should change to French",
    },
    {
      description: "Should persist language selection after page refresh",
      expected: "Selected language should be maintained after browser refresh",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Define language types and translations",
        content:
          "Create types for languages and translations, and define translation data.",
        code: `// Define available languages
type Language = "en" | "es" | "fr"

// Define structure for translations
interface Translations {
  greeting: string
  description: string
  buttonLogin: string
  buttonSignup: string
  welcomeMessage: string
  settings: string
  contactUs: string
  shoppingCart: string
  menuLabel: string
}

// Define translation data
const translationData: Record<Language, Translations> = {
  en: {
    greeting: "Welcome to our Application",
    description: "This is a demo of a multilingual interface using React Context",
    buttonLogin: "Login",
    buttonSignup: "Sign Up",
    welcomeMessage: "Hello, user! Welcome to our platform.",
    settings: "Settings",
    contactUs: "Contact Us",
    shoppingCart: "Shopping Cart",
    menuLabel: "Select a language",
  },
  es: {
    greeting: "Bienvenido a nuestra Aplicación",
    description: "Esta es una demostración de una interfaz multilingüe utilizando React Context",
    buttonLogin: "Iniciar Sesión",
    buttonSignup: "Registrarse",
    welcomeMessage: "¡Hola, usuario! Bienvenido a nuestra plataforma.",
    settings: "Configuración",
    contactUs: "Contáctenos",
    shoppingCart: "Carrito de Compras",
    menuLabel: "Seleccione un idioma",
  },
  fr: {
    greeting: "Bienvenue dans notre Application",
    description: "Ceci est une démonstration d'une interface multilingue utilisant React Context",
    buttonLogin: "Connexion",
    buttonSignup: "S'inscrire",
    welcomeMessage: "Bonjour, utilisateur ! Bienvenue sur notre plateforme.",
    settings: "Paramètres",
    contactUs: "Contactez-nous",
    shoppingCart: "Panier d'achat",
    menuLabel: "Sélectionnez une langue",
  }
}`,
      },
      {
        title: "Create Language Context",
        content: "Create a context to manage language state and translations.",
        code: `// Create Language Context
interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)`,
      },
      {
        title: "Create Language Provider",
        content:
          "Create a provider component to manage language state and handle localStorage persistence.",
        code: `// Language Provider Component
interface LanguageProviderProps {
  children: React.ReactNode
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en")
  
  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language | null
    if (savedLanguage && ["en", "es", "fr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])
  
  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("preferred-language", newLanguage)
  }
  
  const translations = translationData[language]
  
  const value = {
    language,
    translations,
    setLanguage
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}`,
      },
      {
        title: "Create useLanguage hook",
        content: "Create a custom hook to access the language context.",
        code: `// Custom hook to use language context
const useLanguage = () => {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  
  return context
}`,
      },
      {
        title: "Create Language Selector component",
        content: "Create a component for switching between languages.",
        code: `// Language Selector Component
const LanguageSelector: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage()
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translations.menuLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}`,
      },
      {
        title: "Create TranslatedContent component",
        content:
          "Create a component that uses translated content from the context.",
        code: `// Content Component Using Translations
const TranslatedContent: React.FC = () => {
  const { translations } = useLanguage()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.greeting}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4"
>{translations.description}</p>
        <p className="p-3 bg-muted rounded-md">{translations.welcomeMessage}</p>
        
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{translations.settings}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{translations.contactUs}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />
            <span>{translations.shoppingCart}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{translations.buttonLogin}</Button>
        <Button>{translations.buttonSignup}</Button>
      </CardFooter>
    </Card>
  )
}`,
      },
      {
        title: "Assemble the main component",
        content: "Put everything together in the main component.",
        code: `export default function LanguageContextSwitcher() {
  return (
    <LanguageProvider>
      <div className="container py-6 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Language Context Demo</h1>
          <LanguageSelector />
        </div>
        
        <TranslatedContent />
      </div>
    </LanguageProvider>
  )
}`,
      },
    ],
  },
};
