"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  studentsNavLink,
  teachersNavLink,
} from "@/constants"
import DashboardLink from "./DashboardLink"
import { useSidebarStore } from "@/store"
import LogOutLink from "./LogOutLink"
import { dashboardIcons as icons } from "@/constants/icons"

const DashboardSidebar = () => {
  const [navLinks, setNavLinks] = useState({
    teachersNavLink,
    studentsNavLink,
  })

  const isOpen = useSidebarStore(state => state.isOpen)

  const pathname = usePathname()
  return (
    <div
      className={`bg-[#fcfbfb] shadow-xl basis-[240px]
      w-60 md:static md:translate-x-0 absolute z-10 ${
        isOpen ? "translate-x-0" : "translate-x-[240px]"
      } h-[88vh] transition-transform duration-300
      flex flex-col overflow-scroll hide-scroll-bars
      `}
    >
      <div className="relative h-screen">
        {pathname.includes("users")
          ? navLinks.studentsNavLink.links.map(
              (link, i) => (
                <DashboardLink
                  {...link}
                  activeIdx={
                    navLinks.studentsNavLink.activeIdx
                  }
                  setNavLinks={setNavLinks}
                  icon={icons[i]}
                  key={i}
                />
              )
            )
          : pathname.includes("teachers")
          ? navLinks.teachersNavLink.links.map(
              (link, i) => (
                <DashboardLink
                  {...link}
                  activeIdx={
                    navLinks.teachersNavLink.activeIdx
                  }
                  setNavLinks={setNavLinks}
                  icon={icons[i]}
                  key={i}
                />
              )
            )
          : null}
        <LogOutLink />
      </div>
    </div>
  )
}
export default DashboardSidebar
