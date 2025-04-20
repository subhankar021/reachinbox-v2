"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api"
import { useTheme } from "@/components/theme-provider"
import { ChevronDown, Sun, Moon, Menu, X, Home, Users, Mail, Send, BarChart2, List, Bell } from "lucide-react"
import { useState } from "react"

interface OneboxLayoutProps {
  children: ReactNode
}

export function OneboxLayout({ children }: OneboxLayoutProps) {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-black text-black dark:text-white overflow-hidden">
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden" onClick={() => setShowMobileMenu(false)}>
          <div className="w-64 h-full bg-white dark:bg-[#101113] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Image src="/images/m-logo.png" alt="M Logo" width={24} height={24} />
                <span className="ml-2 font-bold">REACHINBOX</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </Button>
            </div>

            <nav className="space-y-4">
              <Link
                href="/onebox/list"
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Home size={20} className="mr-3 text-gray-400" />
                Home
              </Link>

              <Link
                href="/onebox/mail"
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Mail size={20} className="mr-3 text-gray-400" />
                Mail
              </Link>

              <Link
                href="/onebox/contacts"
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Users size={20} className="mr-3 text-gray-400" />
                Contacts
              </Link>
            </nav>
          </div>
        </div>
      )}

      <div className="w-16 bg-black dark:bg-black flex-shrink-0 flex flex-col items-center py-4 border-r border-[#1f1f1f] hidden md:flex">
        <div className="mb-8">
          <div className="w-8 h-8">
            <Image src="/images/m-logo.png" alt="M Logo" width={32} height={32} />
          </div>
        </div>

        <nav className="flex flex-col items-center space-y-6 flex-1">
          <Link href="/onebox/list">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home size={20} className="text-gray-400" />
            </Button>
          </Link>

          <Link href="/onebox/contacts">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Users size={20} className="text-gray-400" />
            </Button>
          </Link>

          <Link href="/onebox/mail">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail size={20} className="text-gray-400" />
            </Button>
          </Link>

          <Link href="/onebox/send">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Send size={20} className="text-gray-400" />
            </Button>
          </Link>

          <Link href="/onebox/kanban">
            <Button variant="ghost" size="icon" className="rounded-full">
              <List size={20} className="text-gray-400" />
            </Button>
          </Link>

          <div className="relative mt-auto">
            <Link href="/onebox/notifications">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={20} className="text-gray-400" />
              </Button>
            </Link>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>

          <Link href="/onebox/analytics">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BarChart2 size={20} className="text-gray-400" />
            </Button>
          </Link>
        </nav>

        <div className="mt-auto mb-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
            <Avatar className="h-8 w-8 bg-green-700">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-black">
        <header className="h-16 border-b border-[#1f1f1f] flex items-center justify-between px-4 bg-black">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setShowMobileMenu(true)}>
              <Menu size={20} className="text-gray-400" />
            </Button>
            <h1 className="text-lg font-semibold text-white">Onebox</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Moon size={20} className="text-gray-400" />
                ) : (
                  <Sun size={20} className="text-gray-400" />
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-white">Tim's Workspace</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-black">{children}</main>
      </div>
    </div>
  )
}
