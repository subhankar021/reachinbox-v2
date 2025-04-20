"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { OneboxLayout } from "@/components/onebox-layout"
import { EmailList } from "@/components/email-list"
import { EmailThread } from "@/components/email-thread"
import { LeadDetails } from "@/components/lead-details"
import { ReplyModal } from "@/components/reply-modal"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useToast } from "@/hooks/use-toast"
import { fetchEmails, deleteEmail, getStoredEmails, storeEmails, initializeStoredEmails } from "@/lib/api"
import type { Email, Thread, Lead, EmailMessage } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function OneboxListPage() {
  const router = useRouter()
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { toast } = useToast()

  // Initialize stored emails
  useEffect(() => {
    initializeStoredEmails()
    loadEmails()
  }, [])

  const loadEmails = async () => {
    setIsLoading(true)
    try {
      // Try to fetch from API first
      const apiEmails = await fetchEmails()
      if (apiEmails && apiEmails.length > 0) {
        setEmails(apiEmails)
      } else {
        // Fallback to stored emails
        const storedEmails = getStoredEmails()
        setEmails(storedEmails)
      }
    } catch (error) {
      console.error("Failed to load emails:", error)
      // Fallback to stored emails
      const storedEmails = getStoredEmails()
      setEmails(storedEmails)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectThread = async (threadId: string) => {
    const thread = emails.find((email) => email.id === threadId)
    if (thread) {
      setSelectedThread(thread)

      // Set the lead details
      setSelectedLead({
        name: "Orlando",
        email: "orlando@gmail.com",
        phone: "+54-9062827869",
        linkedin: "linkedin.com/in/timvadde/",
        company: "Reachinbox",
        campaign: {
          name: "Campaign Name",
          steps: 3,
          daysInSequence: 5,
          currentStep: 3,
        },
      })
    }
  }

  const handleDeleteThread = async () => {
    if (!selectedThread) return

    try {
      // Try to delete via API
      const success = await deleteEmail(selectedThread.id)

      if (success) {
        // Update local state
        const updatedEmails = emails.filter((email) => email.id !== selectedThread.id)
        setEmails(updatedEmails)
        storeEmails(updatedEmails) // Update stored emails

        setSelectedThread(null)
        setShowDeleteConfirmation(false)

        toast({
          title: "Success",
          description: "Email deleted successfully.",
        })
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
    setShowReplyModal(true)
  }

  const handleSendReply = async (replyData: {
    to: string
    from: string
    subject: string
    body: string
  }) => {
    try {
      if (!selectedThread) return

      // Create a new message for the thread
      const newMessage: EmailMessage = {
        id: `${selectedThread.id}-${(selectedThread.messages?.length || 0) + 1}`,
        from: {
          name: "You",
          email: replyData.from,
        },
        to: replyData.to,
        subject: replyData.subject,
        body: replyData.body,
        date: new Date().toISOString(),
      }

      // Update the thread with the new message
      const updatedThread = {
        ...selectedThread,
        messages: [...(selectedThread.messages || []), newMessage],
      }

      // Update the emails array
      const updatedEmails = emails.map((email) => (email.id === selectedThread.id ? updatedThread : email))

      setEmails(updatedEmails)
      storeEmails(updatedEmails) // Update stored emails
      setSelectedThread(updatedThread)

      toast({
        title: "Success",
        description: "Reply sent successfully.",
      })

      setShowReplyModal(false)
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
    setShowReplyModal(false)
  }

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    d: () => {
      if (selectedThread) {
        setShowDeleteConfirmation(true)
      }
    },
    r: () => {
      if (selectedThread) {
        handleReply()
      }
    },
  })

  return (
    <OneboxLayout>
      <div className="flex h-full bg-black">
        {/* Email List - Exactly 278px width */}
        <div className="w-[278px] min-w-[278px] max-w-[278px] border-r border-[#1f1f1f] md:block hidden">
          <EmailList
            emails={emails}
            isLoading={isLoading}
            onSelectThread={handleSelectThread}
            selectedThreadId={selectedThread?.id}
          />
        </div>

        {/* Email Thread - Fill remaining space */}
        <div className="flex-1 border-r border-[#1f1f1f]">
          {selectedThread ? (
            <EmailThread
              thread={selectedThread}
              onReply={handleReply}
              onDelete={() => setShowDeleteConfirmation(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white dark:bg-[#101113]">
              <div className="w-32 h-32 mb-6 bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">It&apos;s the beginning of a legendary sales pipeline</h2>
              <p className="text-gray-400">
                When you have inbound E-mails
                <br />
                you&apos;ll see them here
              </p>
            </div>
          )}
        </div>

        {/* Lead Details - Exactly 278px width */}
        <div className="w-[278px] min-w-[278px] max-w-[278px] lg:block hidden">
          {selectedLead && <LeadDetails lead={selectedLead} />}
        </div>
      </div>

      {/* Mobile view controls - only visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#101113] border-t border-[#1f1f1f] p-4 flex justify-around">
        <Button variant="ghost" size="sm" className="flex flex-col items-center">
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-xs mt-1">Inbox</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex flex-col items-center">
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs mt-1">Leads</span>
        </Button>
      </div>

      {/* Reply Modal */}
      {selectedThread && (
        <ReplyModal
          thread={selectedThread}
          onSend={handleSendReply}
          onCancel={handleCancelReply}
          isOpen={showReplyModal}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#171819] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-black dark:text-white">Are you sure ?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Your selected email will be deleted.</p>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirmation(false)}
                className="w-1/2 mr-2 border-[#e0e0e0] dark:border-[#1f1f1f] text-black dark:text-white"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteThread}
                className="w-1/2 ml-2 bg-[#e53935] hover:bg-[#d32f2f]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </OneboxLayout>
  )
}
