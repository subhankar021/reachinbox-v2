"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { OneboxLayout } from "@/components/onebox-layout"
import { EmailThread } from "@/components/email-thread"
import { LeadDetails } from "@/components/lead-details"
import { ReplyComposer } from "@/components/reply-composer"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useToast } from "@/hooks/use-toast"
import { fetchEmailThread, deleteEmail, isAuthenticated } from "@/lib/api"
import type { Thread, Lead } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function ThreadPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const threadId = params.thread_id as string

  const [thread, setThread] = useState<Thread | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showReplyComposer, setShowReplyComposer] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    const loadThread = async () => {
      try {
        const data = await fetchEmailThread(threadId)
        if (data) {
          setThread({
            id: data.id,
            subject: data.subject,
            from: data.from,
            to: data.to,
            cc: data.cc,
            body: data.body,
            date: data.date,
          })

          // Set the lead details
          setSelectedLead({
            name: data.from.name,
            email: data.from.email,
            phone: "9999999999", // From the screenshot
            linkedin: "www.linkedin.com/johndoe", // From the screenshot
            company: "ReachInbox", // From the screenshot
            campaign: {
              name: "Campaign name",
              steps: 3,
              daysInSequence: 5,
              currentStep: 2,
            },
          })
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch thread:", error)
        toast({
          title: "Error",
          description: "Failed to load thread details. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadThread()
  }, [threadId, toast])

  const handleDeleteThread = async () => {
    if (!thread) return

    try {
      const success = await deleteEmail(thread.id)
      if (success) {
        setShowDeleteConfirmation(false)
        toast({
          title: "Success",
          description: "Email deleted successfully.",
        })
        router.push("/onebox/list")
      } else {
        throw new Error("Failed to delete email")
      }
    } catch (error) {
      console.error("Failed to delete email:", error)
      toast({
        title: "Error",
        description: "Failed to delete email. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReply = () => {
    setShowReplyComposer(true)
  }

  const handleSendReply = async (replyData: {
    to: string
    from: string
    subject: string
    body: string
  }) => {
    try {
      // This is now handled in the ReplyComposer component
      toast({
        title: "Success",
        description: "Reply sent successfully.",
      })

      setShowReplyComposer(false)
      router.push("/onebox/list")
    } catch (error) {
      console.error("Failed to send reply:", error)
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancelReply = () => {
    setShowReplyComposer(false)
  }

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    d: () => {
      if (thread) {
        setShowDeleteConfirmation(true)
      }
    },
    r: () => {
      if (thread) {
        handleReply()
      }
    },
  })

  return (
    <OneboxLayout>
      <div className="flex h-full">
        <div className="w-3/4 border-r border-gray-800">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
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
          ) : thread ? (
            <>
              {showReplyComposer ? (
                <ReplyComposer thread={thread} onSend={handleSendReply} onCancel={handleCancelReply} />
              ) : (
                <EmailThread thread={thread} onReply={handleReply} onDelete={() => setShowDeleteConfirmation(true)} />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-gray-400">Thread not found</p>
              <Button onClick={() => router.push("/onebox/list")} className="mt-4">
                Back to Inbox
              </Button>
            </div>
          )}
        </div>

        <div className="w-1/4">{selectedLead && <LeadDetails lead={selectedLead} />}</div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">Are you sure?</h3>
            <p className="text-gray-400 text-center mb-6">Your selected email will be deleted.</p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)} className="w-1/2 mr-2">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteThread} className="w-1/2 ml-2">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </OneboxLayout>
  )
}
