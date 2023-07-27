import React, {
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react"

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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
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

export type TableProps = {
  headers: (string | ReactNode)[]
} & (
  | {
      type: "users"
      items: User[]
    }
  | {
      type: "videos"
      items: Video[]
    }
)

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
  id?: string
  title: string
  description: string
}

export interface GetAllCoursesResponse {
  courses: Course[]
}

export interface Chapter {
  id?: string
  title: string
  description: string
  courseId?: string
}

export interface GetCourseChaptersResponse {
  chapters: Chapter[]
}

export interface SkillProps {
  title: string
  text: string
  icon: ReactNode
}

export interface Video {
  url: string
  title: string
  id?: string
}

export type AddVideoProps = Video & {
  chapterId: string
}

export interface Exam {
  id: string
  title: string
  courseId: string
  chapterId: string
}

export interface AddExamToChapterProps {
  chapterId: string
  newExam: Partial<Exam>
}

export interface Question {
  id: string
  question: string
  correctAnswer: string
  examId: string
}

export interface AddQuestionToExamProps {
  examId: string
  question: Partial<Question>
}

export interface ExamQuestionsResponse {
  questions: Pick<
    Question,
    "id" | "question" | "correctAnswer"
  >[]
}
