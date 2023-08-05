import Link from "next/link"
import React from "react"

type NavLinkProps = {
  href: string
  title: string
}

export const NavLink = ({
  href,
  title,
  hidden,
}: NavLinkProps &
  React.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      hidden={hidden}
      href={href}
      className="text-[#2F2D51] text-xl font-semibold transition-all hover:text-primary-blue"
    >
      {title}
    </Link>
  )
}
