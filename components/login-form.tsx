"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getGoogleLoginUrl, setAuthToken, isAuthenticated } from "@/lib/api"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/onebox/list")
    }

    // Check for JWT token in URL (after Google OAuth redirect)
    const hash = window.location.hash
    if (hash && hash.includes("token=")) {
      const token = hash.split("token=")[1].split("&")[0]
      if (token) {
        setAuthToken(token)
        router.push("/onebox/list")
      }
    }
  }, [router])

  const handleGoogleLogin = () => {
    setIsLoading(true)
    // Get the current origin for the redirect URL
    const redirectUrl = `${window.location.origin}/google-login`
    // Redirect to Google login
    window.location.href = getGoogleLoginUrl(redirectUrl)
  }

  const handleCreateAccount = () => {
    // For demo purposes, we'll just redirect to the Google login flow
    handleGoogleLogin()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 border-b border-[#707172]">
        <div className="flex items-center">
          <div className="bg-white p-1 rounded mr-2">
            <Image src="/images/m-logo.png" alt="M Logo" width={24} height={24} />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">REACHINBOX</span>
        </div>
      </div>

      <div className="w-[460px] h-[312px] rounded-[4px] border border-[#707172] bg-[#121212] mt-16">
        <div className="p-8 pt-8 pb-8">
          <h2 className="text-center text-white text-lg font-medium mb-6">Create a new account</h2>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 mb-6 space-x-2 text-sm text-white bg-black border border-[#707172] rounded-[4px] h-[48px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>

          <div className="flex items-center justify-center mb-6">
            <button
              onClick={handleCreateAccount}
              className="w-[195px] h-[48px] bg-[#4B63DD] hover:bg-[#0524BF] text-white rounded-[4px] text-sm"
            >
              Create an Account
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[#707172] py-4">
        <div className="text-center text-xs text-gray-500">© 2023 Reachinbox. All rights reserved.</div>
      </div>
    </div>
  )
}
