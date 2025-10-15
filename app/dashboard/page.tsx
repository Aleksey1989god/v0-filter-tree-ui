"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileJson, TestTube } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ImportTreeDialog } from "@/components/filter-tree/import-tree-dialog"
import { useFilterTreeStore } from "@/lib/store/filter-tree-store"

export default function DashboardPage() {
  const [showImportDialog, setShowImportDialog] = useState(false)
  const { trees } = useFilterTreeStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Filter Trees</h2>
            <p className="text-muted-foreground">Build and manage logical filter trees with drag-and-drop interface</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowImportDialog(true)}>
              <FileJson className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Link href="/dashboard/builder">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Filter Tree
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/builder">
            <div className="border border-border rounded-lg p-6 bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Filter Trees</h3>
              <p className="text-sm text-muted-foreground mb-4">Create and manage complex logical filter structures</p>
              <div className="text-2xl font-bold">{trees.length}</div>
            </div>
          </Link>

          <Link href="/dashboard/schema">
            <div className="border border-border rounded-lg p-6 bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">OpenAPI Schema</h3>
              <p className="text-sm text-muted-foreground mb-4">Load and manage API schemas for field selection</p>
              <div className="text-2xl font-bold">Configure</div>
            </div>
          </Link>

          <Link href="/dashboard/test">
            <div className="border border-border rounded-lg p-6 bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Test Filters</h3>
              <p className="text-sm text-muted-foreground mb-4">Test your filters with sample data</p>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <TestTube className="h-6 w-6" />
                Run Tests
              </div>
            </div>
          </Link>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-semibold mb-4">Quick Start</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Create a new filter tree with AND/OR logical operators</p>
            <p>2. Load an OpenAPI schema to use its fields (optional)</p>
            <p>3. Add filter conditions with field paths, operators, and values</p>
            <p>4. Test your filters with sample JSON data</p>
            <p>5. Export your filter tree as JSON for deployment</p>
          </div>
        </div>
      </div>

      <ImportTreeDialog open={showImportDialog} onOpenChange={setShowImportDialog} />
    </div>
  )
}
