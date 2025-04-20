"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { setAuthToken } from "@/lib/api"

export default function GoogleLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processToken = () => {
      const hash = window.location.hash
      if (hash && hash.includes("token=")) {
        const token = hash.split("token=")[1].split("&")[0]
        if (token) {
          setAuthToken(token)
          router.push("/onebox/list")
          return
        }
      }

      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get("token")
      if (token) {
        setAuthToken(token)
        router.push("/onebox/list")
        return
      }

      const errorMsg = urlParams.get("error")
      if (errorMsg) {
        setError(errorMsg)
        return
      }

      const timer = setTimeout(() => {
        setError("No authentication token received. Please try again.")
      }, 3000)

      return () => clearTimeout(timer)
    }

    processToken()
  }, [router])

  const handleRetry = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1a1a1a] rounded-lg">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">REACHINBOX</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          {error ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-red-500">Authentication Error</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Authenticating with Google</h2>
              <div className="flex justify-center mb-6">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
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
              <p className="text-gray-400">Please wait while we complete the authentication process...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
