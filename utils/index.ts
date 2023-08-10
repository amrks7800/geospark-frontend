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
  AddExamToChapterProps,
  Exam,
  AddQuestionToExamProps,
  Question,
  ExamQuestionsResponse,
  AddUserResultProps,
  User,
  Result,
} from "@/types"
import { toast } from "react-toastify"

const api = "https://geospark.onrender.com"

const handleErrorMiddleware = (statusCode: number) => {
  if (typeof window !== "object") return

  if (statusCode === 403) {
    if (location.pathname.includes("signin"))
      throw new Error("الحساب ليس موجود")

    if (!location.pathname.includes("signin"))
      throw new Error("ليس لديك الصلاحية")
  } else if (statusCode === 401) {
    if (!location.pathname.includes("signin")) {
      location.pathname = "/signin"
      toast("يجب تسجيل الدخول من جديد", { type: "error" })
    }

    throw new Error("قم بتسجيل الدخول")
  } else {
    throw new Error("حدث خطأ، رجاءاً حاول مرة اخري")
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

export const getUserDataById = async (
  userId: string
): Promise<User> => {
  const request = await fetch(`${api}/Allusers/${userId}`, {
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

export const addExamToChapter = async ({
  chapterId,
  newExam,
}: AddExamToChapterProps): Promise<any> => {
  const request = await fetch(
    `${api}/chapters/${chapterId}/exams`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(newExam),
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

export const getExam = async (
  examId: string
): Promise<Partial<Exam>> => {
  const request = await fetch(`${api}/exams/${examId}`, {
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const addQuestionToExam = async ({
  examId,
  question,
}: AddQuestionToExamProps): Promise<any> => {
  const request = await fetch(
    `${api}/exams/${examId}/questions`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(question),
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

export const getQuestion = async (
  questionId: string
): Promise<Partial<Question>> => {
  const request = await fetch(
    `${api}/questions/${questionId}`,
    {
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const checkAnswer = async ({
  questionId,
  answer,
}: {
  questionId: string
  answer: string
}): Promise<{ isCorrect: boolean }> => {
  const request = await fetch(
    `${api}/questions/${questionId}/check`,
    {
      method: "POST",
      body: JSON.stringify({
        answer,
      }),
      credentials: "include",
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

export const getChapterExams = async ({
  chapterId,
}: {
  chapterId: string
}): Promise<{ exams: Exam[] }> => {
  const request = await fetch(
    `${api}/chapters/${chapterId}/exams`,
    {
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const deleteExam = async (
  examId: string
): Promise<any> => {
  const request = await fetch(`${api}/exams/${examId}`, {
    credentials: "include",
    method: "DELETE",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getExamQuestions = async (
  examId: string
): Promise<ExamQuestionsResponse> => {
  const request = await fetch(
    `${api}/exams/${examId}/questions`,
    {
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const addUserResultByExamId = async ({
  examId,
  userId,
  score,
}: AddUserResultProps): Promise<{ message: string }> => {
  const request = await fetch(
    `${api}/exams/${examId}/result`,
    {
      method: "POST",
      body: JSON.stringify({
        score,
        userId,
        examId,
      }),
      credentials: "include",
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

export const getUserResultById = async (
  userId: string
): Promise<Result[]> => {
  const request = await fetch(
    `${api}/users/${userId}/results`,
    {
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getUserById = async (
  userId: string
): Promise<User> => {
  const request = await fetch(`${api}/users/${userId}`, {
    credentials: "include",
  })

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}

export const getExamResults = async (
  examId: string
): Promise<Result[]> => {
  const request = await fetch(
    `${api}/exams/${examId}/results`,
    {
      credentials: "include",
    }
  )

  if (!request.ok) {
    handleErrorMiddleware(request.status)
  }

  const response = await request.json()

  return response
}
