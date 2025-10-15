"use client"

import type React from "react"

import { useState } from "react"
import { useOpenAPIStore } from "@/lib/store/openapi-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, FileJson, CheckCircle2, XCircle } from "lucide-react"
import { SchemaFieldBrowser } from "@/components/openapi/schema-field-browser"

export default function SchemaPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const { fields, schemaUrl, schemaLoaded, schemaError, loadSchema, clearSchema } = useOpenAPIStore()

  const handleLoadSchema = async () => {
    if (!url.trim()) return
    setLoading(true)
    await loadSchema(url)
    setLoading(false)
  }

  const handleLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const text = await file.text()
      const schema = JSON.parse(text)

      // Create a temporary URL for the file
      const blob = new Blob([text], { type: "application/json" })
      const fileUrl = URL.createObjectURL(blob)

      await loadSchema(fileUrl)
    } catch (error) {
      console.error("Failed to load file:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">OpenAPI Schema</h2>
          <p className="text-muted-foreground">Load an OpenAPI schema to use its fields in your filter trees</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Load Schema</CardTitle>
            <CardDescription>Import an OpenAPI schema from a URL or upload a JSON file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/openapi.json"
                className="bg-secondary border-border"
                disabled={loading}
              />
              <Button onClick={handleLoadSchema} disabled={loading || !url.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Load URL
                  </>
                )}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <FileJson className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload OpenAPI JSON file</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleLoadFile}
                  disabled={loading}
                />
              </label>
            </div>

            {schemaError && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive">
                <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Failed to load schema</p>
                  <p className="text-sm">{schemaError}</p>
                </div>
              </div>
            )}

            {schemaLoaded && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-success/10 text-success">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Schema loaded successfully</p>
                  <p className="text-sm">{fields.length} fields available</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearSchema}>
                  Clear
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {schemaLoaded && fields.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Fields</CardTitle>
                  <CardDescription>Browse fields from the loaded OpenAPI schema</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono">
                  {fields.length} fields
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <SchemaFieldBrowser fields={fields} />
            </CardContent>
          </Card>
        )}

        {!schemaLoaded && !schemaError && (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <FileJson className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Schema Loaded</h3>
              <p className="text-sm text-muted-foreground">
                Load an OpenAPI schema to start using its fields in your filter trees
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
