import { Dispatch, SetStateAction, ReactNode } from "react"

export interface User {
  firstName: string
  lastName: string
  email?: string
  password?: string
  isAdmin?: number
  subscribed?: number
  id?: string
}

export interface ButtonProps {
  text: string
  type?: "button" | "submit"
  style?: string
}

export interface ThemedInputProps {
  icon: ReactNode
  name: string
  placeholder: string
  type?: string
}

export interface DashboardLinkProps {
  href: string
  activeIdx: number
  id: number
  title: string
  setNavLinks: Dispatch<
    SetStateAction<{
      teachersNavLink: {
        links: {
          href: string
          active: boolean
          id: number
          title: string
        }[]
        activeIdx: number
      }
      studentsNavLink: {
        links: {
          href: string
          id: number
          title: string
        }[]
        activeIdx: number
      }
    }>
  >
  icon?: React.ReactNode
}

export interface SidebarSwitchProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface TableProps {
  headers: string[]
  users?: User[]
}

export interface CellProps {
  children: ReactNode
  isEmpty?: boolean
}

export interface AuthResponse {
  status: string
  token: string
  data: {
    user: User
  }
}

export interface SignInRequest {
  email: FormDataEntryValue | null | string
  password: FormDataEntryValue | null | string
}

export interface SignUpRequest {
  firstName: FormDataEntryValue | null | string
  lastName: FormDataEntryValue | null | string
  email: FormDataEntryValue | null | string
  password: FormDataEntryValue | null | string
}

export interface CurrentUserResponse {
  id: string
  firstName: string
  lastName: string
  isAdmin: number
  subscribed: number
}

export interface ChangeUserActiveStateRequest {
  id: string
  activate: boolean
}

export interface ChangeUserActiveStateResponse {
  message: string
}

export interface UsersEndpointResponse {
  users: User[]
}

export interface Course {
  title: string
  description: string
}
