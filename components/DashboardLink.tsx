"use client"

import Link from "next/link"
import { DashboardLinkProps } from "@/types"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const DashboardLink = ({
  href,
  id,
  title,
  activeIdx,
  setNavLinks,
  icon,
}: DashboardLinkProps) => {
  function callback(prev: any) {
    return {
      studentsNavLink: {
        ...prev.studentsNavLink,
        activeIdx: id,
      },
      teachersNavLink: {
        ...prev.teachersNavLink,
        activeIdx: id,
      },
    }
  }

  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes(href)) {
      setNavLinks(prev => ({
        studentsNavLink: {
          ...prev.studentsNavLink,
          activeIdx: id,
        },
        teachersNavLink: {
          ...prev.teachersNavLink,
          activeIdx: id,
        },
      }))
    }
  }, [])

  return (
    <Link
      onClick={() => {
        setNavLinks(callback)
      }}
      key={id}
      href={href}
      className={`w-full py-2 text-lg font-semibold text-primary-blue px-3 flex items-center gap-2 ${
        activeIdx === id
          ? "bg-slate-100 border-e-4 border-solid border-primary-blue"
          : ""
      }`}
    >
      {icon}
      {title}
    </Link>
  )
}
export default DashboardLink
