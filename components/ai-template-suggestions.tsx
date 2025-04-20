"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Template {
  id: string
  title: string
  category: string
  content: string
}

interface AITemplateSuggestionsProps {
  threadContext: string
  onSelectTemplate: (content: string) => void
}

export function AITemplateSuggestions({ threadContext, onSelectTemplate }: AITemplateSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [templates, setTemplates] = useState<Template[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  // Mock templates - in a real app, these would be generated based on the thread context
  const mockTemplates: Template[] = [
    {
      id: "1",
      title: "Initial Follow-up",
      category: "follow-up",
      content:
        "Thank you for your interest in our services. I'd be happy to schedule a call to discuss how we can help your business grow.",
    },
    {
      id: "2",
      title: "Meeting Confirmation",
      category: "meeting",
      content:
        "I'm confirming our meeting on {{DATE}} at {{TIME}}. Looking forward to discussing your needs in detail.",
    },
    {
      id: "3",
      title: "Pricing Information",
      category: "pricing",
      content:
        "As requested, here's our pricing information. Our basic package starts at $99/month and includes all the features you mentioned.",
    },
    {
      id: "4",
      title: "Thank You",
      category: "follow-up",
      content:
        "Thank you for taking the time to meet with us today. I've attached the resources we discussed and look forward to our next steps.",
    },
    {
      id: "5",
      title: "Product Demo",
      category: "demo",
      content: "I'd be happy to show you a demo of our product. Would {{DATE}} at {{TIME}} work for your schedule?",
    },
  ]

  useEffect(() => {
    // Simulate API call to get AI-generated templates based on thread context
    const fetchTemplates = async () => {
      setIsLoading(true)
      // In a real app, we would send the thread context to an API
      // and get back AI-generated template suggestions
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTemplates(mockTemplates)
      setIsLoading(false)
    }

    fetchTemplates()
  }, [threadContext])

  const categories = ["all", ...new Set(mockTemplates.map((t) => t.category))]

  const filteredTemplates =
    activeCategory === "all" ? templates : templates.filter((t) => t.category === activeCategory)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">AI-Suggested Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <svg
                  className="animate-spin h-6 w-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 border border-gray-700 rounded-md hover:bg-gray-800 cursor-pointer"
                    onClick={() => onSelectTemplate(template.content)}
                  >
                    <h3 className="font-medium mb-1">{template.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{template.content}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
