import { DashboardSidebar } from "@/components"
import React from "react"

const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-stretch justify-stretch min-h-[88vh]">
      <DashboardSidebar />
      {children}
    </div>
  )
}
export default layout
