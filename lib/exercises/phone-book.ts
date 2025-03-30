import type { ExerciseType } from "@/lib/exercises-data";

export const phoneBook: ExerciseType = {
  id: "phone-book",
  title: "Phone Book Application",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Create a simple phone book application that allows users to manage contacts.</p>
    <p>Requirements:</p>
    <ul>
      <li>Display a list of contacts with name and phone number</li>
      <li>Allow adding new contacts with validation (name and phone required)</li>
      <li>Enable searching contacts by name or number</li>
      <li>Include the ability to delete contacts</li>
      <li>Implement sorting by name (alphabetically)</li>
      <li>Add indicators for the type of contact (personal, work, etc.)</li>
    </ul>
  `,
  examples: [
    "User adds a contact 'John Doe' with number '555-1234' and type 'Personal'\nUser can search for 'John' or '555' to find the contact\nUser can delete the contact from the list",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2 } from 'lucide-react'

interface Contact {
  id: string
  name: string
  phone: string
  type: "personal" | "work" | "family" | "other"
}

export default function PhoneBook() {
  // TODO: Implement the phone book application
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Phone Book</h1>
      
      {/* Add your contact form and contact list here */}
    </div>
  )
}`,
  solutionCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Trash2, X } from 'lucide-react'

interface Contact {
  id: string
  name: string
  phone: string
  type: "personal" | "work" | "family" | "other"
}

export default function PhoneBook() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "John Doe", phone: "555-1234", type: "personal" },
    { id: "2", name: "Jane Smith", phone: "555-5678", type: "work" },
    { id: "3", name: "Bob Johnson", phone: "555-9012", type: "family" }
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    name: "",
    phone: "",
    type: "personal"
  })
  const [error, setError] = useState<string | null>(null)

  const handleAddContact = () => {
    // Validate input
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      setError("Name and phone number are required")
      return
    }
    
    // Create new contact with unique ID
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString()
    }
    
    // Add to list and reset form
    setContacts([...contacts, contact])
    setNewContact({
      name: "",
      phone: "",
      type: "personal"
    })
    setError(null)
  }
  
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }
  
  const handleChange = (field: keyof Omit<Contact, "id">, value: string) => {
    setNewContact({
      ...newContact,
      [field]: value
    })
    setError(null)
  }
  
  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    )
    .sort((a, b) => a.name.localeCompare(b.name))
  
  // Get badge color based on contact type
  const getBadgeVariant = (type: Contact["type"]) => {
    switch (type) {
      case "personal": return "default"
      case "work": return "secondary"
      case "family": return "outline"
      case "other": return "destructive"
      default: return "default"
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Phone Book</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={newContact.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={newContact.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Contact Type</Label>
              <Select
                value={newContact.type}
                onValueChange={(value) => handleChange("type", value as Contact["type"])}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddContact}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1.5 h-7 w-7"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredContacts.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              {contacts.length === 0 
                ? "No contacts added yet. Add your first contact above." 
                : "No contacts match your search."}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="flex items-center justify-between p-3 bg-background rounded-md border"
                >
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(contact.type)}>
                      {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}`,
  testCases: [
    {
      description: "Should display existing contacts",
      expected: "Contact list should show all contacts sorted alphabetically",
    },
    {
      description:
        "Should add a new contact when form is submitted with valid data",
      expected: "New contact should appear in the list",
    },
    {
      description: "Should show error when adding contact with missing fields",
      expected: "Error message should be displayed",
    },
    {
      description: "Should filter contacts when searching",
      expected: "Only matching contacts should be displayed",
    },
    {
      description: "Should delete a contact when delete button is clicked",
      expected: "Contact should be removed from the list",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up the contact state",
        content:
          "Define the contact interface and set up state for contacts, form input, search, and errors.",
        code: `interface Contact {
  id: string
  name: string
  phone: string
  type: "personal" | "work" | "family" | "other"
}

const [contacts, setContacts] = useState<Contact[]>([
  { id: "1", name: "John Doe", phone: "555-1234", type: "personal" },
  { id: "2", name: "Jane Smith", phone: "555-5678", type: "work" },
  { id: "3", name: "Bob Johnson", phone: "555-9012", type: "family" }
])
const [searchTerm, setSearchTerm] = useState("")
const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
  name: "",
  phone: "",
  type: "personal"
})
const [error, setError] = useState<string | null>(null)`,
      },
      {
        title: "Create contact management functions",
        content:
          "Implement functions to add and delete contacts, and handle form changes.",
        code: `const handleAddContact = () => {
  // Validate input
  if (!newContact.name.trim() || !newContact.phone.trim()) {
    setError("Name and phone number are required")
    return
  }
  
  // Create new contact with unique ID
  const contact: Contact = {
    ...newContact,
    id: Date.now().toString()
  }
  
  // Add to list and reset form
  setContacts([...contacts, contact])
  setNewContact({
    name: "",
    phone: "",
    type: "personal"
  })
  setError(null)
}

const handleDeleteContact = (id: string) => {
  setContacts(contacts.filter(contact => contact.id !== id))
}

const handleChange = (field: keyof Omit<Contact, "id">, value: string) => {
  setNewContact({
    ...newContact,
    [field]: value
  })
  setError(null)
}`,
      },
      {
        title: "Filter and sort contacts",
        content:
          "Create a filtered contacts list based on search term and sort alphabetically.",
        code: `// Filter and sort contacts
const filteredContacts = contacts
  .filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  )
  .sort((a, b) => a.name.localeCompare(b.name))`,
      },
      {
        title: "Create badge variant helper",
        content:
          "Create a function to determine badge color based on contact type.",
        code: `const getBadgeVariant = (type: Contact["type"]) => {
  switch (type) {
    case "personal": return "default"
    case "work": return "secondary"
    case "family": return "outline"
    case "other": return "destructive"
    default: return "default"
  }
}`,
      },
      {
        title: "Build the contact form",
        content:
          "Create a form for adding new contacts with name, phone, and type fields.",
        code: `<Card className="mb-6">
  <CardHeader>
    <CardTitle>Add New Contact</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter name"
            value={newContact.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={newContact.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="type">Contact Type</Label>
        <Select
          value={newContact.type}
          onValueChange={(value) => handleChange("type", value as Contact["type"])}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  </CardContent>
  <CardFooter>
    <Button onClick={handleAddContact}>
      <Plus className="h-4 w-4 mr-2" />
      Add Contact
    </Button>
  </CardFooter>
</Card>`,
      },
      {
        title: "Implement the search functionality",
        content: "Add a search input with clear button to filter contacts.",
        code: `<CardHeader>
  <CardTitle>Contacts</CardTitle>
  <div className="relative mt-2">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search contacts..."
      className="pl-8"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1.5 h-7 w-7"
        onClick={() => setSearchTerm("")}
      >
        <X className="h-4 w-4" />
      </Button>
    )}
  </div>
</CardHeader>`,
      },
      {
        title: "Render the contact list",
        content:
          "Display the filtered contacts or a message if none are found.",
        code: `<CardContent>
  {filteredContacts.length === 0 ? (
    <p className="text-center py-8 text-muted-foreground">
      {contacts.length === 0 
        ? "No contacts added yet. Add your first contact above." 
        : "No contacts match your search."}
    </p>
  ) : (
    <div className="space-y-2">
      {filteredContacts.map((contact) => (
        <div 
          key={contact.id} 
          className="flex items-center justify-between p-3 bg-background rounded-md border"
        >
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getBadgeVariant(contact.type)}>
              {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDeleteContact(contact.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )}
</CardContent>`,
      },
    ],
  },
};
