"use client"

import { forwardRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(({ value, onChange }, ref) => {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const handleBold = () => {
    setIsBold(!isBold)
    document.execCommand("bold", false)
  }

  const handleItalic = () => {
    setIsItalic(!isItalic)
    document.execCommand("italic", false)
  }

  const handleUnderline = () => {
    setIsUnderline(!isUnderline)
    document.execCommand("underline", false)
  }

  const handleSave = () => {
    const content = ref?.current?.innerHTML || ""
    onChange(content)
  }

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden">
      <div className="flex items-center space-x-1 p-2 bg-gray-800">
        <Button
          type="button"
          variant={isBold ? "secondary" : "ghost"}
          size="icon"
          onClick={handleBold}
          className="h-8 w-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 12a4 4 0 0 0 0-8H6v8" />
            <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
          </svg>
        </Button>
        <Button
          type="button"
          variant={isItalic ? "secondary" : "ghost"}
          size="icon"
          onClick={handleItalic}
          className="h-8 w-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" x2="10" y1="4" y2="4" />
            <line x1="14" x2="5" y1="20" y2="20" />
            <line x1="15" x2="9" y1="4" y2="20" />
          </svg>
        </Button>
        <Button
          type="button"
          variant={isUnderline ? "secondary" : "ghost"}
          size="icon"
          onClick={handleUnderline}
          className="h-8 w-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" x2="20" y1="20" y2="20" />
          </svg>
        </Button>
        <div className="h-6 border-l border-gray-600 mx-1"></div>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="15" x2="3" y1="12" y2="12" />
            <line x1="17" x2="3" y1="18" y2="18" />
          </svg>
        </Button>
        <div className="h-6 border-l border-gray-600 mx-1"></div>
        <Button type="button" variant="ghost" size="sm" onClick={handleSave} className="ml-auto">
          SAVE
        </Button>
      </div>
      <div
        ref={ref}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  )
})

RichTextEditor.displayName = "RichTextEditor"
