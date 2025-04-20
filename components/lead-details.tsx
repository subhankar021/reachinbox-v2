import type { Lead } from "@/lib/types"

interface LeadDetailsProps {
  lead: Lead
}

export function LeadDetails({ lead }: LeadDetailsProps) {
  const displayLead = {
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
  }

  return (
    <div className="h-full flex flex-col w-[278px] dark:bg-[#000000] bg-[#f9f9f9]">
      <div className="dark:bg-[#000000] bg-[#f9f9f9] rounded-md mx-2 mt-4">
        <h4 className="p-2 rounded-lg text-md font-semibold mb-4 bg-[#eceff3] dark:bg-[#353533]">Lead Details</h4>

        <div className="space-y-4 mx-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Name</span>
            <span className="font-medium text-gray-700 dark:text-gray-500 truncate ml-2 max-w-[150px]">
              {displayLead.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Contact No</span>
            <span className="font-medium text-gray-700 dark:text-gray-500 truncate ml-2 max-w-[150px]">
              {displayLead.phone}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Email ID</span>
            <span className="font-medium text-gray-700 dark:text-gray-500 truncate ml-2 max-w-[150px]">
              {displayLead.email}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">LinkedIn</span>
            <span className="font-medium text-gray-700 dark:text-gray-500 truncate ml-2 max-w-[150px]">
              {displayLead.linkedin}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Company Name</span>
            <span className="font-medium text-gray-700 dark:text-gray-500 truncate ml-2 max-w-[150px]">
              {displayLead.company}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2 dark:bg-[#000000] rounded-md mb-4 mt-4">
        <h4 className="p-2 rounded-lg text-md font-semibold mb-4 dark:bg-[#353533] bg-[#eceff3]">Activities</h4>

        <div className="mb-6 mx-6">
          <h4 className="font-medium mb-4 truncate">{displayLead.campaign.name}</h4>

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm">
              <span className="font-semibold mr-1">{displayLead.campaign.steps}</span>
              <span className="text-slate-500">Steps</span>
            </p>
            <p className="text-sm">
              <span className="font-semibold mr-1">{displayLead.campaign.daysInSequence}</span>
              <span className="text-slate-500">Days in Sequence</span>
            </p>
          </div>

          <div className="space-y-6 mt-6">
            {/* Step 1 */}
            <div className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="w-8 h-8 dark:bg-[#25262b] bg-[#e5e8ec] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-gray-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="w-0.5 h-12 dark:bg-[#25262b] bg-[#e5e8ec] mx-auto"></div>
              </div>
              <div>
                <div className="font-medium">Step 1: Email</div>
                <div className="flex items-center text-xs text-gray-800 dark:text-gray-400 mt-1">
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
                    className="mr-1 text-gray-800 dark:text-gray-400"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                  <span>Sent 3rd, Feb</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex" style={{ marginTop: "0px" }}>
              <div className="mr-4 flex flex-col items-center">
                <div className="w-8 h-8 dark:bg-[#25262b] bg-[#e5e8ec] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-gray-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="w-0.5 h-12 dark:bg-[#25262b] bg-[#e5e8ec] mx-auto"></div>
              </div>
              <div>
                <div className="font-medium">Step 2: Email</div>
                <div className="flex items-center text-xs text-gray-800 dark:text-gray-400 mt-1">
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
                    className="mr-1 text-yellow-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Opened 5th, Feb</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex" style={{ marginTop: "0px" }}>
              <div className="mr-4 flex flex-col items-center">
                <div className="w-8 h-8 dark:bg-[#25262b] bg-[#e5e8ec] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-gray-400 "
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="w-0.5 h-0 dark:bg-[#25262b] mx-auto"></div>
              </div>
              <div>
                <div className="font-medium">Step 3: Email</div>
                <div className="flex items-center text-xs text-gray-400 mt-1">
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
                    className="mr-1 text-yellow-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Opened 8th, Feb</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
