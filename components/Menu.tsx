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
        <MenuItem
          hidden={
            pathname.includes("signin") ||
            pathname.includes("dashboard") ||
            !!data?.id ||
            pathname.includes("signin")
          }
        >
          <NavLink href="/signin" title="تسجيل الدخول" />
        </MenuItem>

        <MenuItem
          hidden={
            pathname.includes("signin") ||
            pathname.includes("dashboard") ||
            !!data?.id ||
            pathname.includes("signin")
          }
        >
          <NavLink href="/signup" title="التسجيل" />
        </MenuItem>

        <MenuItem
          hidden={
            pathname.includes("signin") ||
            pathname.includes("dashboard") ||
            pathname.includes("signin")
          }
        >
          <NavLink
            href={
              !!data?.isAdmin
                ? "/dashboard/teachers"
                : "/dashboard/users"
            }
            title={
              !!data?.isAdmin ? "وحدة التحكم" : "الكورسات"
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

            <span className="">{`${data?.firstName} ${data?.lastName}`}</span>
          </h1>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default NavMenu
