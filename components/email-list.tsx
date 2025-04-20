"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Email } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ChevronDown, RefreshCw, Search } from "lucide-react"

interface EmailListProps {
  emails: Email[]
  isLoading: boolean
  onSelectThread: (threadId: string) => void
  selectedThreadId?: string
}

export function EmailList({ emails, isLoading, onSelectThread, selectedThreadId }: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("New Replies")
  const [sortOrder, setSortOrder] = useState("Newest")

  // Filter emails based on search query and filter
  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply additional filters based on the selected filter
    if (filter === "New Replies") {
      return matchesSearch
    }

    return matchesSearch
  })

  // Sort emails based on sort order
  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (sortOrder === "Newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  return (
    <div className="h-full flex flex-col w-[278px] dark:bg-[#000000] bg-[#fafafa]">
      <div className="p-4 border-b dark:border-[#1f1f1f] border-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-[#4285f4] font-semibold text-2xl">All Inbox(s)</h2>
            <ChevronDown size={16} className="ml-1 text-[#4285f4]" />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <RefreshCw size={16} className="text-gray-400" />
          </Button>
        </div>
        <div className="text-sm text-gray-400 mb-4">
          <span className="font-bold text-lg dark:text-white text-slate-800">25/25</span> Inboxes selected
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 dark:bg-[#1f1f1f] bg-[#f4f6f8] dark:border-[#1f1f1f] border-[#e6eaee] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border-b dark:border-[#1f1f1f] border-none">
        <div className="flex items-center">
          <Badge className="dark:bg-[#1f1f1f] bg-[#ececec] text-[#5c7cfa] rounded-full mr-2 px-2 py-0.5 text-xs">
            {emails.length}
          </Badge>
          <span className="text-sm font-medium">{filter}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">{sortOrder}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
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
        ) : sortedEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-gray-400">No emails found</p>
          </div>
        ) : (
          <ul>
            {sortedEmails.map((email) => (
              <li
                key={email.id}
                className={cn(
                  "border-b dark:border-[#1f1f1f] border-none hover:bg-[#171819]/50 cursor-pointer",
                  selectedThreadId === email.id && "dark:bg-[#000000] bg-[#fafafa]",
                )}
                onClick={() => onSelectThread(email.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-medium">{email.from.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(email.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {email.subject}
                    {email.subject.includes("7ZG2ZTV 6KG634E") ? "" : ""}
                  </p>
                  <div className="flex items-center">
                    <Badge className="dark:bg-green-900/30 bg-[#f0f0f0] text-green-400 text-xs rounded-full mr-2 px-2 py-0.5">
                      Interested
                    </Badge>
                    <Badge className="dark:bg-green-900/30 bg-[#f0f0f0]  text-gray-400 text-xs rounded-full flex items-center px-2 py-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                      </svg>
                      Campaign name
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
