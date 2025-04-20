"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { Thread } from "@/lib/types"
import { sendReply } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Link2, ImageIcon, Smile, Users, Code, X } from "lucide-react"

interface ReplyComposerProps {
  thread: Thread
  onSend: (replyData: {
    to: string
    from: string
    subject: string
    body: string
  }) => void
  onCancel: () => void
}

export function ReplyComposer({ thread, onSend, onCancel }: ReplyComposerProps) {
  const { toast } = useToast()
  const [to, setTo] = useState("jeanne@icloud.com")
  const [from, setFrom] = useState("peter@reachinbox.com")
  const [fromName, setFromName] = useState("Peter")
  const [subject, setSubject] = useState(`Warmup Welcome`)
  const [body, setBody] = useState(`Hi jeanne,

`)
  const [showVariables, setShowVariables] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSend = async () => {
    setIsSending(true)
    try {
      // Format the data according to the API requirements
      const replyData = {
        fromName,
        from,
        to,
        subject,
        body,
        references: {}, // Add any references if needed
      }

      // Send the reply using the API
      const success = await sendReply(thread.id, replyData)

      if (success) {
        toast({
          title: "Success",
          description: "Reply sent successfully.",
        })
        onSend({
          to,
          from,
          subject,
          body,
        })
      } else {
        throw new Error("Failed to send reply")
      }
    } catch (error) {
      console.error("Error sending reply:", error)
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f9f9f9] dark:bg-[#101113]">
      <div className="p-4 border-b border-[#e0e0e0] dark:border-[#1f1f1f] flex justify-between items-center">
        <h2 className="text-lg font-medium">Reply</h2>
        <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-md">
          <X size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-16 text-sm text-gray-500 dark:text-gray-400">To :</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <span className="w-16 text-sm text-gray-500 dark:text-gray-400">From :</span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <span className="w-16 text-sm text-gray-500 dark:text-gray-400">Subject :</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <textarea
              ref={textareaRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-64 bg-transparent border-none focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#e0e0e0] dark:border-[#1f1f1f] flex items-center">
        <div className="flex-1 flex space-x-2">
          <Button
            onClick={handleSend}
            disabled={isSending}
            className="bg-gradient-to-r from-[#4285f4] to-[#5c7cfa] hover:from-[#3b78e7] hover:to-[#4c6fe3] text-white rounded-md flex items-center"
          >
            {isSending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Sending...
              </>
            ) : (
              "Send"
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            className="text-gray-500 dark:text-gray-400 rounded-md flex items-center"
            onClick={() => setShowVariables(!showVariables)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v3m0 4.5V15m0 3v3" />
              <circle cx="12" cy="12" r="4.5" />
            </svg>
            <span className="ml-2">Variables</span>
          </Button>

          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <Link2 size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <ImageIcon size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <Smile size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <Users size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <Code size={20} className="text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {showVariables && (
        <div className="absolute bottom-16 left-4 w-48 bg-white dark:bg-[#171819] rounded-md shadow-lg z-10 border border-[#e0e0e0] dark:border-[#1f1f1f]">
          <div className="p-2">
            <h3 className="text-sm font-medium mb-2">Insert Variable</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    setBody(body + "{{FIRST_NAME}}")
                    setShowVariables(false)
                  }}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-[#25262b]"
                >
                  FIRST_NAME
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBody(body + "{{LAST_NAME}}")
                    setShowVariables(false)
                  }}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-[#25262b]"
                >
                  LAST_NAME
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBody(body + "{{COMPANY}}")
                    setShowVariables(false)
                  }}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-[#25262b]"
                >
                  COMPANY
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBody(body + "{{EMAIL}}")
                    setShowVariables(false)
                  }}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-[#25262b]"
                >
                  EMAIL
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
