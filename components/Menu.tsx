"use client"

import { Link } from "@chakra-ui/next-js"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"

const NavMenu = () => {
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
          <Link
            href="/signin"
            className="py-2 px-3 text-lg text-primary-blue cursor-pointer hover:bg-light-gray w-[200px]"
          >
            تسجيل الدخول
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/signup"
            className="w-full py-2 px-3 text-lg text-primary-blue cursor-pointer hover:bg-light-gray"
          >
            الــتــســجيل
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default NavMenu
