export interface EmailMessage {
  id: string
  from: {
    name: string
    email: string
  }
  to: string
  cc?: string
  bcc?: string
  subject: string
  body: string
  date: string
}

export interface Email {
  id: string
  subject: string
  from: {
    name: string
    email: string
  }
  to: string
  cc?: string
  body: string
  date: string
  status: "read" | "unread"
  labels: string[]
  messages?: EmailMessage[]
}

export interface Thread {
  id: string
  subject: string
  from: {
    name: string
    email: string
  }
  to: string
  cc?: string
  body: string
  date: string
  messages?: EmailMessage[]
}

export interface Lead {
  name: string
  email: string
  phone: string
  linkedin: string
  company: string
  campaign: {
    name: string
    steps: number
    daysInSequence: number
    currentStep: number
  }
}
