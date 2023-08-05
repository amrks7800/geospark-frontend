"use client"

import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Avatar,
} from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import SubscriptionDrawer from "./SubscribtionDrawer"
import { NavLink } from "./NavLink"
import { usePathname } from "next/navigation"
import { CurrentUserResponse } from "@/types"

type MenuProps = {
  data: CurrentUserResponse | undefined
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const NavMenu = ({
  data,
  isOpen,
  onClose,
  onOpen,
}: MenuProps) => {
  const pathname = usePathname()
  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        as={Button}
        rightIcon={
          <GiHamburgerMenu
            size={35}
            color="#777"
            className="inline me-3"
          />
        }
      ></MenuButton>
      <MenuList
        className="py-2 shadow-md border border-solid border-[#f6f6f6] me-3 rounded-md bg-white"
        position={"relative"}
        zIndex={500}
      >
        <div className="items-center justify-center gap-8 w-fit md:flex hidden">
          <NavLink
            href="/signin"
            title="تسجيل الدخول"
            hidden={
              pathname.includes("signin") ||
              pathname.includes("dashboard") ||
              !!data?.id ||
              pathname.includes("signin")
            }
          />
          <NavLink
            href="/signup"
            title="التسجيل"
            hidden={
              pathname.includes("signin") ||
              pathname.includes("dashboard") ||
              !!data?.id ||
              pathname.includes("signin")
            }
          />

          <NavLink
            href={
              !!data?.isAdmin
                ? "/dashboard/teachers"
                : "/dashboard/users"
            }
            title={
              !!data?.isAdmin ? "وحدة التحكم" : "الكورسات"
            }
            hidden={
              pathname.includes("signin") ||
              pathname.includes("dashboard") ||
              pathname.includes("signin")
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
            hidden={!data?.subscribed}
          />
        </div>
      </MenuList>
    </Menu>
  )
}
export default NavMenu
