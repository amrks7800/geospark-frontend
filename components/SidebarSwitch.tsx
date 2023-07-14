"use client"

import { useSidebarStore } from "@/store"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { usePathname } from "next/navigation"

const SidebarSwitch = () => {
  const isOpen = useSidebarStore(state => state.isOpen)
  const setIsOpen = useSidebarStore(
    state => state.setIsOpen
  )
  const pathname = usePathname()

  if (pathname.includes("dashboard")) {
    return (
      <div
        className="md:hidden w-12 h-12 rounded-full border-2 border-solid border-primary-blue
      flex items-center justify-center bg-white right-[85%] cursor-pointer"
        onClick={() => setIsOpen()}
      >
        {isOpen ? (
          <FaAngleRight size={20} color={"#4E4FEB"} />
        ) : (
          <FaAngleLeft size={20} color={"#4E4FEB"} />
        )}
      </div>
    )
  }
}
export default SidebarSwitch
