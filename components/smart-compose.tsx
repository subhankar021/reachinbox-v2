"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface SmartComposeProps {
  currentText: string
  onSuggestionAccept: (suggestion: string) => void
}

export function SmartCompose({ currentText, onSuggestionAccept }: SmartComposeProps) {
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const suggestionRef = useRef<HTMLDivElement>(null)

  const phrases = [
    { trigger: "thank", completion: " you for your interest in our services." },
    { trigger: "looking forward", completion: " to hearing from you soon." },
    { trigger: "please let", completion: " me know if you have any questions." },
    { trigger: "i would be happy", completion: " to schedule a call to discuss this further." },
    { trigger: "regarding your", completion: " request, I've attached the information you asked for." },
    { trigger: "i hope", completion: " this email finds you well." },
    { trigger: "as discussed", completion: " during our meeting, here are the next steps." },
    { trigger: "i'm writing", completion: " to follow up on our previous conversation." },
  ]

  useEffect(() => {
    if (!currentText) {
      setSuggestion(null)
      setIsVisible(false)
      return
    }

    const lowerText = currentText.toLowerCase()
    for (const phrase of phrases) {
      if (lowerText.endsWith(phrase.trigger)) {
        setSuggestion(phrase.completion)
        setIsVisible(true)
        return
      }
    }

    setSuggestion(null)
    setIsVisible(false)
  }, [currentText])

  const handleAcceptSuggestion = () => {
    if (suggestion) {
      onSuggestionAccept(suggestion)
      setSuggestion(null)
      setIsVisible(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && isVisible && suggestion) {
        e.preventDefault()
        handleAcceptSuggestion()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible, suggestion])

  if (!isVisible || !suggestion) {
    return null
  }

  return (
    <div
      ref={suggestionRef}
      className="absolute z-10 bg-gray-800 rounded-md shadow-lg p-2 max-w-md"
      style={{ top: "100%", left: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-400">
          <span className="text-gray-500">{suggestion}</span>
        </div>
        <div className="ml-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAcceptSuggestion}
            className="text-xs text-gray-400 hover:text-white"
          >
            Tab
          </Button>
        </div>
      </div>
    </div>
  )
}
