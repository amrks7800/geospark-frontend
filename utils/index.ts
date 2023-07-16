import {
  CurrentUserResponse,
  SignInRequest,
  AuthResponse,
  SignUpRequest,
  ChangeUserActiveStateRequest,
  ChangeUserActiveStateResponse,
  UsersEndpointResponse,
  Course,
  GetAllCoursesResponse,
  GetCourseChaptersResponse,
  Chapter,
  Video,
  AddVideoProps,
} from "@/types"
import { toast } from "react-toastify"

const api = "https://geospark.onrender.com"

const handleErrorMiddleware = (code: number) => {
  if (typeof window !== "object") return

  if (code === 403) {
    if (location.pathname.includes("signin"))
      throw new Error("الحساب ليس موجود")

    if (!location.pathname.includes("signin"))
      throw new Error("ليس لديك الصلاحية")
  } else if (code === 401) {
    if (!location.pathname.includes("signin")) {
      location.pathname = "/signin"
      toast("يجب تسجيل الدخول من جديد", { type: "error" })
    }

    throw new Error("قم بتسجيل الدخول")
  } else {
    throw new Error("حدث خطا")
  }
}

export const SignIn = async (
  data: SignInRequest
): Promise<AuthResponse> => {
  const request = await fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const signUp = async (
  formData: SignUpRequest
): Promise<AuthResponse> => {
  const logout = await logOut()

  console.log(logout)

  const request = await fetch(`${api}/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getCurrentUser =
  async (): Promise<CurrentUserResponse> => {
    const request = await fetch(`${api}/currentuser`, {
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!request.ok) {
      handleErrorMiddleware(request.status)
    }

    const response = await request.json()

    return response
  }

export const changeUserActiveState = async ({
  id,
  activate,
}: ChangeUserActiveStateRequest): Promise<ChangeUserActiveStateResponse> => {
  let request
  if (activate)
    request = await fetch(`${api}/activate/${id}`, {
      method: "PATCH",
      credentials: "include",
    })

  if (!activate)
    request = await fetch(`${api}/deactivate/${id}`, {
      method: "PATCH",
      credentials: "include",
    })

  if (!request?.ok) {
    handleErrorMiddleware(request?.status!)
  }

  const response = await request?.json()

  return response
}

export const getAllUsers =
  async (): Promise<UsersEndpointResponse> => {
    const request = await fetch(`${api}/Allusers`, {
      credentials: "include",
    })

    if (!request.ok) {
      handleErrorMiddleware(request.status)
    }

    const response = await request.json()

    return response
  }

export const deleteUser = async (id: string) => {
  const request = await fetch(`${api}/deleteUser/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const addCourse = async (newCourse: Course) => {
  const request = await fetch(`${api}/courses`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(newCourse),
    headers: {
      "Content-type": "application/json",
    },
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getAllCourses =
  async (): Promise<GetAllCoursesResponse> => {
    const request = await fetch(`${api}/courses`, {
      credentials: "include",
    })

    if (!request.ok) {
      handleErrorMiddleware(request.status)
    }

    const response = await request.json()

    return response
  }

export const getCourseById = async (
  id: string
): Promise<Course> => {
  const request = await fetch(`${api}/courses/${id}`, {
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const deleteCourse = async (id: string) => {
  const request = await fetch(`${api}/courses/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const logOut = async () => {
  const request = await fetch(`${api}/logout`)

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getCourseChapters = async (
  id: string
): Promise<GetCourseChaptersResponse> => {
  const request = await fetch(
    `${api}/courses/${id}/chapters`,
    {
      cache: "no-store",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const addChapter = async ({
  newChapter,
  courseId,
}: {
  newChapter: Chapter
  courseId: string
}) => {
  const request = await fetch(
    `${api}/courses/${courseId}/chapters`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(newChapter),
      cache: "no-store",
      headers: {
        "Content-type": "application/json",
      },
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const deleteChapter = async (id: string) => {
  const request = await fetch(`${api}/chapters/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getChapterVideos = async (
  chapterId: string
): Promise<{ videos: Video[] }> => {
  const request = await fetch(
    `${api}/chapters/${chapterId}/videos`,
    {
      cache: "no-store",
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const deleteVideoById = async (videoId: string) => {
  const request = await fetch(`${api}/videos/${videoId}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const addVideo = async (newVideo: AddVideoProps) => {
  const request = await fetch(
    `${api}/chapters/${newVideo.chapterId}/videos`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-type": "application/json",
      },
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}
