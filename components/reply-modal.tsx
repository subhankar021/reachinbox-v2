"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { Thread } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Link2, ImageIcon, Smile, Users, Code, X, Eye, Zap, Type } from "lucide-react"

interface ReplyModalProps {
  thread: Thread
  onSend: (replyData: {
    to: string
    from: string
    subject: string
    body: string
  }) => void
  onCancel: () => void
  isOpen: boolean
}

export function ReplyModal({ thread, onSend, onCancel, isOpen }: ReplyModalProps) {
  const { toast } = useToast()
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("Hi Jennie\n\n")
  const [showVariables, setShowVariables] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Set the email data based on the thread
  useEffect(() => {
    if (thread) {
      // Extract data from the thread
      if (thread.from.email === "mitrajit2022@gmail.com") {
        // First email format
        setFrom("mitrajit2022@gmail.com")
        setTo("shaw@getmemeetings.com")
        setSubject(`Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E`)
      } else {
        // Second email format
        setFrom("shaw@getmemeetings.com")
        setTo("mitrajit2022@gmail.com")
        setSubject(`Test mail`)
      }
    }
  }, [thread])

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onCancel])

  const handleSend = async () => {
    setIsSending(true)
    try {
      const replyData = {
        from,
        to,
        subject,
        body,
      }

      // const success = await sendReply(thread.id, replyData)

      if (true) {
        toast({
          title: "Success",
          description: "Reply sent successfully.",
        })
        onSend(replyData)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center mb-4 bg-black/50">
      <div
        ref={modalRef}
        className="w-full max-w-[720px] h-[530px] mx-4 md:mx-16 bg-white dark:bg-[#101113] rounded-t-lg shadow-lg flex flex-col"
      >
        <div className="p-2 border-b dark:bg-[#23272c] rounded-t-lg border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="px-2 font-medium text-gray-900 dark:text-gray-100 ">Reply</h2>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-full">
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        <div className="p-4 space-y-3 overflow-auto flex-1">
          <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-2">
            <span className="w-12 text-sm text-gray-500 dark:text-gray-400">From:</span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-2">
            <span className="w-12 text-sm text-gray-500 dark:text-gray-400">To:</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-2">
            <span className="w-12 text-sm text-gray-500 dark:text-gray-400 ">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="pt-2">
            <textarea
              ref={textareaRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-40 bg-transparent border-none focus:outline-none resize-none text-gray-900 dark:text-gray-100"
              placeholder="Type your reply..."
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex-shrink-0">
              <Button
                onClick={handleSend}
                disabled={isSending}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 flex items-center"
              >
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
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
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                className="text-gray-500 dark:text-gray-400 rounded-md flex items-center"
                onClick={() => setShowVariables(!showVariables)}
              >
                <Zap size={20} className="mr-2" />
                <span>Variables</span>
              </Button>
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                className="text-gray-500 dark:text-gray-400 rounded-md flex items-center"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye size={20} className="mr-2" />
                <span>Preview Email</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Type size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Link2 size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <ImageIcon size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Smile size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Users size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
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

        {showPreview && (
          <div className="absolute inset-0 bg-white dark:bg-[#101113] z-20 flex flex-col">
            <div className="p-2 border-b dark:bg-[#23272c] border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="px-2 font-medium text-gray-900 dark:text-gray-100">Email Preview</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreview(false)}
                className="h-8 w-8 rounded-full"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <div className="mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">From: {from}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">To: {to}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Subject: {subject}</div>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-line">{body}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
