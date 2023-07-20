import { DashboardSidebar } from "@/components"
import React from "react"

const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-stretch justify-stretch cut-viewport-height">
      <DashboardSidebar />
      {children}
    </div>
  )
}
export default layout
