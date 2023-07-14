"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  studentsNavLink,
  teachersNavLink,
} from "@/constants"
import DashboardLink from "./DashboardLink"
import SidebarSwitch from "./SidebarSwitch"
import { FaChalkboardTeacher } from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi"
import { SidebarSwitchProps } from "@/types"
import { useSidebarStore } from "@/store"
import LogOutLink from "./LogOutLink"

const DashboardSidebar = () => {
  const [navLinks, setNavLinks] = useState({
    teachersNavLink,
    studentsNavLink,
  })

  const isOpen = useSidebarStore(state => state.isOpen)
  const setIsOpen = useSidebarStore(
    state => state.setIsOpen
  )

  const pathname = usePathname()
  return (
    <div
      className={`bg-[#fcfbfb] shadow-xl basis-[240px]
      w-60 md:static md:translate-x-0 absolute z-10 ${
        isOpen ? "translate-x-0" : "translate-x-[240px]"
      } h-screen transition-transform duration-300
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
                  icon={
                    i === 0 ? (
                      <FaChalkboardTeacher size={25} />
                    ) : (
                      <PiStudentFill size={25} />
                    )
                  }
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
                  icon={
                    i === 0 ? (
                      <FaChalkboardTeacher size={25} />
                    ) : (
                      <PiStudentFill size={25} />
                    )
                  }
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
