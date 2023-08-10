"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import NavMenu from "./Menu"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/utils"
import { Avatar } from "@chakra-ui/react"
import SidebarSwitch from "./SidebarSwitch"
import { useSubscription } from "@/contexts/SubscriptionContext"
import SubscriptionDrawer from "./SubscribtionDrawer"
import { NavLink } from "./NavLink"
import React from "react"

const Navbar = () => {
  const pathname = usePathname()
  const { isOpen, onClose, onOpen } = useSubscription()

  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: [""],
    retry(failureCount) {
      if (failureCount === 3) return false
      return true
    },
  })

  return (
    <header className="shadow-sm bg-[#FCFBFB] h-[80px] flex items-center">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <SidebarSwitch />
          <Link
            href={"/"}
            className="flex items-center justify-center gap-2"
          >
            <Image
              src="/t-rex.png"
              alt="logo"
              width={50}
              height={50}
            />
            <h1 className="text-primary-blue text-2xl font-bold tracking-wider sm:block hidden">
              T-Rex
            </h1>
          </Link>
        </div>
        {!isLoading && (
          <>
            <div className="items-center justify-center gap-8 w-fit md:flex hidden">
              <NavLink
                href="/signin"
                title="تسجيل الدخول"
                hidden={
                  pathname.includes("signin") ||
                  pathname.includes("dashboard") ||
                  !!data?.id ||
                  pathname.includes("signup")
                }
              />
              <NavLink
                href="/signup"
                title="التسجيل"
                hidden={
                  pathname.includes("signin") ||
                  pathname.includes("dashboard") ||
                  !!data?.id ||
                  pathname.includes("signup")
                }
              />

              <NavLink
                href={
                  !!data?.isAdmin
                    ? "/dashboard/teachers"
                    : "/dashboard/users"
                }
                title={
                  !!data?.isAdmin
                    ? "وحدة التحكم"
                    : "الكورسات"
                }
                hidden={
                  pathname.includes("signin") ||
                  pathname.includes("dashboard") ||
                  pathname.includes("signup")
                }
              />

              <h1
                className="text-xl font-bold text-primary-blue flex items-center gap-2 me-2"
                hidden={!pathname.includes("dashboard")}
              >
                <Avatar
                  name={`${data?.firstName} ${data?.lastName}`}
                />

                <span className="sm:block hidden">{`${data?.firstName} ${data?.lastName}`}</span>
              </h1>

              <SubscriptionDrawer
                onClose={onClose!}
                onOpen={onOpen!}
                isOpen={isOpen!}
                withButton
                hidden={
                  !!data?.subscribed || !!data?.isAdmin
                }
              />
            </div>
            <div className="md:hidden flex items-center gap-2">
              <SubscriptionDrawer
                onClose={onClose!}
                onOpen={onOpen!}
                isOpen={isOpen!}
                withButton
                hidden={
                  !!data?.subscribed || !!data?.isAdmin
                }
              />
              <NavMenu data={data} />
            </div>
          </>
        )}
      </div>
    </header>
  )
}
export default Navbar
