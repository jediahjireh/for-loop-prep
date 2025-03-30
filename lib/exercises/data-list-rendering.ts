import type { ExerciseType } from "@/lib/exercises-data";

export const dataListRendering: ExerciseType = {
  id: "data-list-rendering",
  title: "Data List Rendering",
  category: "React",
  difficulty: "Medium",
  language: "tsx",
  description: `
    <p>Create a component that renders a list of data with various display options.</p>
    <p>Requirements:</p>
    <ul>
      <li>Display a list of provided product data</li>
      <li>Implement three different view modes: List, Grid, and Table</li>
      <li>Add the ability to sort products by name, price, or category</li>
      <li>Add a filter function to filter products by category</li>
      <li>Include pagination with configurable items per page</li>
      <li>Add a search function to search product names</li>
    </ul>
  `,
  examples: [
    "User can switch between list, grid, and table views\nUser can sort products by price (low to high)\nUser can filter to show only 'Electronics' category\nUser can search for 'Phone' and see matching products",
  ],
  initialCode: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { LayoutList, LayoutGrid, Table2, Search, ArrowUpDown } from 'lucide-react'

// Sample product data
const products = [
  { id: 1, name: "Smartphone", price: 699, category: "Electronics", stock: 23 },
  { id: 2, name: "Laptop", price: 1299, category: "Electronics", stock: 15 },
  { id: 3, name: "Coffee Maker", price: 89, category: "Kitchen", stock: 32 },
  { id: 4, name: "Running Shoes", price: 79, category: "Clothing", stock: 28 },
  { id: 5, name: "Headphones", price: 149, category: "Electronics", stock: 17 },
  { id: 6, name: "Blender", price: 59, category: "Kitchen", stock: 24 },
  { id: 7, name: "T-shirt", price: 19, category: "Clothing", stock: 45 },
  { id: 8, name: "Smart Watch", price: 249, category: "Electronics", stock: 12 },
  { id: 9, name: "Toaster", price: 49, category: "Kitchen", stock: 32 },
  { id: 10, name: "Winter Jacket", price: 129, category: "Clothing", stock: 8 },
  { id: 11, name: "Tablet", price: 399, category: "Electronics", stock: 14 },
  { id: 12, name: "Cutting Board", price: 25, category: "Kitchen", stock: 31 },
]

// Get unique categories
const categories = ["All", ...new Set(products.map(product => product.category))]

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
}

export default function DataListRendering() {
  // TODO: Implement the data list rendering component
  
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>
      
      {/* Controls for view, sort, filter, and search will go here */}
      
      {/* List, grid, or table view will be rendered here */}
      
      {/* Pagination will go here */}
    </div>
  )
}`,
  solutionCode: `"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { 
  Pagination, PaginationContent, PaginationItem, PaginationLink, 
  PaginationNext, PaginationPrevious 
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { LayoutList, LayoutGrid, Table2, Search, ArrowUpDown, ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample product data
const products = [
  { id: 1, name: "Smartphone", price: 699, category: "Electronics", stock: 23 },
  { id: 2, name: "Laptop", price: 1299, category: "Electronics", stock: 15 },
  { id: 3, name: "Coffee Maker", price: 89, category: "Kitchen", stock: 32 },
  { id: 4, name: "Running Shoes", price: 79, category: "Clothing", stock: 28 },
  { id: 5, name: "Headphones", price: 149, category: "Electronics", stock: 17 },
  { id: 6, name: "Blender", price: 59, category: "Kitchen", stock: 24 },
  { id: 7, name: "T-shirt", price: 19, category: "Clothing", stock: 45 },
  { id: 8, name: "Smart Watch", price: 249, category: "Electronics", stock: 12 },
  { id: 9, name: "Toaster", price: 49, category: "Kitchen", stock: 32 },
  { id: 10, name: "Winter Jacket", price: 129, category: "Clothing", stock: 8 },
  { id: 11, name: "Tablet", price: 399, category: "Electronics", stock: 14 },
  { id: 12, name: "Cutting Board", price: 25, category: "Kitchen", stock: 31 },
]

// Get unique categories
const categories = ["All", ...new Set(products.map(product => product.category))]

type ViewMode = "list" | "grid" | "table"
type SortField = "name" | "price" | "category"
type SortDirection = "asc" | "desc"

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
}

export default function DataListRendering() {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  
  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Sorting state
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  
  // Handle sort change
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }
  
  // Filter, sort, and paginate products
  const filteredProducts = useMemo(() => {
    // First filter by category and search query
    let result = products.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    
    // Then sort
    result = [...result].sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" 
          ? a.price - b.price
          : b.price - a.price
      } else if (sortField === "category") {
        return sortDirection === "asc" 
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category)
      }
      return 0
    })
    
    return result
  }, [selectedCategory, searchQuery, sortField, sortDirection])
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  
  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }
  
  // Render product in list mode
  const renderListItem = (product: Product) => (
    <div key={product.id} className="p-4 border rounded-md flex justify-between items-center">
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <Badge className="mt-1">{product.category}</Badge>
      </div>
      <div className="text-right">
        <div className="font-bold">R{product.price}</div>
        <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
      </div>
    </div>
  )
  
  // Render product in grid mode
  const renderGridItem = (product: Product) => (
    <Card key={product.id} className="overflow-hidden">
      <div className="h-40 bg-muted flex items-center justify-center">
        <span className="text-4xl text-muted-foreground opacity-30">📦</span>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Badge>{product.category}</Badge>
        <div className="mt-2 font-bold">R{product.price}</div>
        <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
      </CardContent>
    </Card>
  )
  
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>
      
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        {/* View mode toggles */}
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            title="List view"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            title="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
            title="Table view"
          >
            <Table2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Category filter */}
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Sort controls */}
      <div className="flex mb-4 text-sm">
        <span className="mr-2">Sort by:</span>
        <button 
          className="mr-4 flex items-center"
          onClick={() => handleSort("name")}
        >
          Name 
          {sortField === "name" && (
            sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
          )}
        </button>
        <button 
          className="mr-4 flex items-center" 
          onClick={() => handleSort("price")}
        >
          Price
          {sortField === "price" && (
            sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
          )}
        </button>
        <button 
          className="flex items-center" 
          onClick={() => handleSort("category")}
        >
          Category
          {sortField === "category" && (
            sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
          )}
        </button>
      </div>
      
      {/* Products list */}
      {filteredProducts.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No products match your search.</p>
        </div>
      ) : (
        <>
          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-3 mb-6">
              {paginatedProducts.map(renderListItem)}
            </div>
          )}
          
          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {paginatedProducts.map(renderGridItem)}
            </div>
          )}
          
          {/* Table View */}
          {viewMode === "table" && (
            <div className="rounded-md border mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">R{product.price}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      
      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => goToPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                let pageNumber: number;
                
                // Logic to handle showing the correct page numbers
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => goToPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-16">
                <SelectValue>{itemsPerPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}`,
  testCases: [
    {
      description: "Should display products in different view modes",
      expected:
        "Products should display in list, grid, and table views as selected",
    },
    {
      description: "Should filter products by category",
      expected:
        "Only products matching the selected category should be displayed",
    },
    {
      description: "Should sort products by different fields",
      expected:
        "Products should be sorted by name, price, or category in ascending or descending order",
    },
    {
      description: "Should search products by name",
      expected: "Only products matching the search query should be displayed",
    },
    {
      description: "Should paginate products",
      expected:
        "Products should be displayed in pages with correct pagination controls",
    },
  ],
  stepByStepSolution: {
    steps: [
      {
        title: "Set up state and types",
        content:
          "Define the types and state variables for view mode, sorting, filtering, searching, and pagination.",
        code: `type ViewMode = "list" | "grid" | "table"
type SortField = "name" | "price" | "category"
type SortDirection = "asc" | "desc"

// View state
const [viewMode, setViewMode] = useState<ViewMode>("grid")

// Filter and search state
const [selectedCategory, setSelectedCategory] = useState("All")
const [searchQuery, setSearchQuery] = useState("")

// Sorting state
const [sortField, setSortField] = useState<SortField>("name")
const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

// Pagination state
const [currentPage, setCurrentPage] = useState(1)
const [itemsPerPage, setItemsPerPage] = useState(6)`,
      },
      {
        title: "Implement sort handler",
        content: "Create a function to handle sorting by different fields.",
        code: `const handleSort = (field: SortField) => {
  if (sortField === field) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  } else {
    setSortField(field)
    setSortDirection("asc")
  }
}`,
      },
      {
        title: "Filter, sort, and paginate products",
        content:
          "Use useMemo to efficiently filter, sort, and paginate the product list.",
        code: `// Filter, sort, and paginate products
const filteredProducts = useMemo(() => {
  // First filter by category and search query
  let result = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  // Then sort
  result = [...result].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else if (sortField === "price") {
      return sortDirection === "asc" 
        ? a.price - b.price
        : b.price - a.price
    } else if (sortField === "category") {
      return sortDirection === "asc" 
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category)
    }
    return 0
  })
  
  return result
}, [selectedCategory, searchQuery, sortField, sortDirection])

// Calculate pagination
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)`,
      },
      {
        title: "Create helper functions for rendering",
        content:
          "Create helper functions for rendering items in different view modes.",
        code: `// Render product in list mode
const renderListItem = (product: Product) => (
  <div key={product.id} className="p-4 border rounded-md flex justify-between items-center">
    <div>
      <h3 className="font-medium">{product.name}</h3>
      <Badge className="mt-1">{product.category}</Badge>
    </div>
    <div className="text-right">
      <div className="font-bold">R{product.price}</div>
      <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
    </div>
  </div>
)

// Render product in grid mode
const renderGridItem = (product: Product) => (
  <Card key={product.id} className="overflow-hidden">
    <div className="h-40 bg-muted flex items-center justify-center">
      <span className="text-4xl text-muted-foreground opacity-30">📦</span>
    </div>
    <CardHeader className="p-4">
      <CardTitle className="text-lg">{product.name}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <Badge>{product.category}</Badge>
      <div className="mt-2 font-bold">R{product.price}</div>
      <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
    </CardContent>
  </Card>
)`,
      },
      {
        title: "Implement view mode toggles",
        content:
          "Add buttons for switching between list, grid, and table views.",
        code: `<div className="flex space-x-2">
  <Button 
    variant={viewMode === "list" ? "default" : "outline"}
    size="icon"
    onClick={() => setViewMode("list")}
    title="List view"
  >
    <LayoutList className="h-4 w-4" />
  </Button>
  <Button 
    variant={viewMode === "grid" ? "default" : "outline"}
    size="icon"
    onClick={() => setViewMode("grid")}
    title="Grid view"
  >
    <LayoutGrid className="h-4 w-4" />
  </Button>
  <Button 
    variant={viewMode === "table" ? "default" : "outline"}
    size="icon"
    onClick={() => setViewMode("table")}
    title="Table view"
  >
    <Table2 className="h-4 w-4" />
  </Button>
</div>`,
      },
      {
        title: "Add category filter and search",
        content:
          "Add controls for filtering by category and searching products.",
        code: `{/* Category filter */}
<div className="w-full md:w-64">
  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
    <SelectTrigger>
      <SelectValue placeholder="Select category" />
    </SelectTrigger>
    <SelectContent>
      {categories.map(category => (
        <SelectItem key={category} value={category}>
          {category}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Search */}
<div className="relative w-full md:w-64">
  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search products..."
    className="pl-8"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>`,
      },
      {
        title: "Implement view rendering",
        content: "Add the logic to render products in the selected view mode.",
        code: `{/* Products list */}
{filteredProducts.length === 0 ? (
  <div className="py-8 text-center">
    <p className="text-muted-foreground">No products match your search.</p>
  </div>
) : (
  <>
    {/* List View */}
    {viewMode === "list" && (
      <div className="space-y-3 mb-6">
        {paginatedProducts.map(renderListItem)}
      </div>
    )}
    
    {/* Grid View */}
    {viewMode === "grid" && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {paginatedProducts.map(renderGridItem)}
      </div>
    )}
    
    {/* Table View */}
    {viewMode === "table" && (
      <div className="rounded-md border mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">R{product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )}
  </>
)}`,
      },
      {
        title: "Add pagination controls",
        content: "Add controls for navigating between pages of results.",
        code: `{/* Pagination */}
{filteredProducts.length > 0 && (
  <div className="flex items-center justify-between">
    <div className="text-sm text-muted-foreground">
      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
    </div>
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => goToPage(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
          let pageNumber: number;
          
          // Logic to handle showing the correct page numbers
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          
          return (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => goToPage(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)}`,
      },
    ],
  },
};
