"use client"

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Box,
} from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import { NavLink } from "./NavLink"
import { usePathname } from "next/navigation"
import { CurrentUserResponse } from "@/types"
import React from "react"

type MenuProps = {
  data: CurrentUserResponse | undefined
}

const NavMenu = ({ data }: MenuProps) => {
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
        <MenuItem>
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
        </MenuItem>

        <MenuItem>
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
        </MenuItem>

        <MenuItem>
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
        </MenuItem>

        <MenuItem>
          <h1
            className="text-xl font-bold text-primary-blue flex items-center gap-2 me-2"
            hidden={!pathname.includes("dashboard")}
          >
            <Avatar
              name={`${data?.firstName} ${data?.lastName}`}
            />

            <span className="sm:block hidden">{`${data?.firstName} ${data?.lastName}`}</span>
          </h1>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default NavMenu
