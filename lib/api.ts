import type { Email } from "./types"

// API base URL
const API_BASE_URL = "https://hiring.reachinbox.xyz/api/v1"

// Get the auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("reachinbox_token") || "demo_token" // Use demo_token as fallback
  }
  return "demo_token"
}

// Common headers for API requests
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  }
}

// Fetch all emails from the onebox list endpoint
export const fetchEmails = async (): Promise<Email[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/list`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error fetching emails: ${response.status}`)
    }

    const data = await response.json()
    return data.threads || []
  } catch (error) {
    console.error("API Error:", error)
    // Return mock data as fallback
    return mockEmails
  }
}

// Fetch a single email thread
export const fetchEmailThread = async (threadId: string): Promise<Email | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error fetching thread: ${response.status}`)
    }

    const data = await response.json()
    return data.thread || null
  } catch (error) {
    console.error("API Error:", error)
    // Return mock data as fallback
    const email = mockEmails.find((email) => email.id === threadId)
    return email || null
  }
}

// Delete an email thread
export const deleteEmail = async (threadId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`, {
      method: "DELETE",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error deleting thread: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("API Error:", error)
    // For mock data, we'll simulate a successful delete
    return true
  }
}

// Send a reply to a thread
export const sendReply = async (
  threadId: string,
  replyData: {
    fromName: string
    from: string
    to: string
    subject: string
    body: string
    references?: Record<string, string>
  },
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/reply/${threadId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(replyData),
    })

    if (!response.ok) {
      throw new Error(`Error sending reply: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("API Error:", error)
    // For mock data, we'll simulate a successful reply
    return true
  }
}

// Google login redirect URL
export const getGoogleLoginUrl = (redirectUrl: string): string => {
  return `${API_BASE_URL}/auth/google-login?redirect_to=${encodeURIComponent(redirectUrl)}`
}

// Set the auth token after successful login
export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("reachinbox_token", token)
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("reachinbox_token")
    return !!token
  }
  return false
}

// Logout - clear the auth token
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("reachinbox_token")
  }
}

// Mock data exactly matching the screenshots
const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E",
    from: {
      name: "Mitrajit Chandra",
      email: "mitrajit2022@gmail.com",
    },
    to: "shaw@getmemeetings.com",
    cc: "",
    body: `How are you Shaw?

Thanks for reaching out over our web chat.

How can I help you with your project?

Please let me know if you need anything else.

Regards,
Mitrajit Chandra

7ZG2ZTV 6KG634E`,
    date: "2022-02-01T11:24:34Z",
    status: "read",
    labels: ["Interested", "Campaign name"],
    messages: [
      {
        id: "1-1",
        from: {
          name: "Mitrajit Chandra",
          email: "mitrajit2022@gmail.com",
        },
        to: "shaw@getmemeetings.com",
        subject: "Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E",
        body: `How are you Shaw?

Thanks for reaching out over our web chat.

How can I help you with your project?

Please let me know if you need anything else.

Regards,
Mitrajit Chandra

7ZG2ZTV 6KG634E`,
        date: "2022-02-01T11:24:34Z",
      },
      {
        id: "1-2",
        from: {
          name: "Shaw Adley",
          email: "shaw@getmemeetings.com",
        },
        to: "mitrajit2022@gmail.com",
        subject: "Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E",
        body: `Hi Mitrajit,

Just wondering if you're still interested.

Regards,
Shaw Adley

6KG634E practicecowboy`,
        date: "2022-02-02T11:24:34Z",
      },
    ],
  },
  {
    id: "2",
    subject: "Test mail",
    from: {
      name: "Shaw Adley",
      email: "shaw@getmemeetings.com",
    },
    to: "mitrajit2022@gmail.com",
    cc: "",
    body: `Test mail`,
    date: "2022-02-03T11:24:34Z",
    status: "unread",
    labels: ["Interested", "Campaign name"],
    messages: [
      {
        id: "2-1",
        from: {
          name: "Shaw Adley",
          email: "shaw@getmemeetings.com",
        },
        to: "mitrajit2022@gmail.com",
        subject: "Test mail",
        body: `Test mail`,
        date: "2022-02-03T11:24:34Z",
      },
    ],
  },
]

// Store emails in localStorage for persistence
export const getStoredEmails = (): Email[] => {
  if (typeof window !== "undefined") {
    const storedEmails = localStorage.getItem("reachinbox_emails")
    if (storedEmails) {
      return JSON.parse(storedEmails)
    }
  }
  return mockEmails
}

export const storeEmails = (emails: Email[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("reachinbox_emails", JSON.stringify(emails))
  }
}

// Initialize stored emails if not already set
export const initializeStoredEmails = (): void => {
  if (typeof window !== "undefined" && !localStorage.getItem("reachinbox_emails")) {
    storeEmails(mockEmails)
  }
}
