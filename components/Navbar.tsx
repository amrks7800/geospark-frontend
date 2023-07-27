"use client"

import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import { usePathname } from "next/navigation"
import NavMenu from "./Menu"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/utils"
import { Avatar } from "@chakra-ui/react"
import SidebarSwitch from "./SidebarSwitch"

const Navbar = () => {
  const pathname = usePathname()

  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: [""],
    retry(failureCount) {
      if (failureCount === 3) return false
      return true
    },
  })

  return (
    <header className="shadow-sm bg-[#FCFBFB] h-[80px]">
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

        {pathname === "/signup" ||
        pathname === "/signin" ||
        pathname.includes("dashboard") ||
        data?.id ? (
          <Link
            href={`/dashboard/${
              data?.isAdmin ? "teachers" : "users"
            }`}
            className={`me-2 text-primary-blue text-lg ${
              pathname !== "/" ? "hidden" : "block"
            }`}
          >
            {`${data?.firstName}, اهلا بك | ${
              data?.isAdmin ? "وحدة التحكم" : "كورساتي"
            }`}
          </Link>
        ) : (
          <>
            <div
              className="md:flex items-center justify-center gap-2 hidden"
              hidden={isLoading}
            >
              <Link href="/signin">
                <Button
                  text="تسجيل الدخول"
                  type="button"
                  style="tracking-wide"
                />
              </Link>
              <Link
                href="/signup"
                className="text-primary-blue font-semibold text-xl w-32 text-center"
              >
                الــتــســجيل
              </Link>
            </div>
            <div className="md:hidden inline">
              <NavMenu />
            </div>
          </>
        )}

        {pathname.includes("dashboard") &&
        data?.firstName ? (
          <h1 className="text-xl font-bold text-primary-blue flex items-center gap-2 me-2">
            <Avatar
              name={`${data?.firstName} ${data?.lastName}`}
            />

            <span className="sm:block hidden">{`${data?.firstName} ${data?.lastName}`}</span>
          </h1>
        ) : (
          ""
        )}
      </div>
    </header>
  )
}
export default Navbar
