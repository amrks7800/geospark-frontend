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
} from "@/types"

const api = "https://geospark.onrender.com"

export const SignIn = async (
  data: SignInRequest
): Promise<AuthResponse> => {
  return fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  }).then(data => data.json())
}

export const signUp = async (
  formData: SignUpRequest
): Promise<AuthResponse> =>
  fetch(`${api}/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  }).then(data => data.json())

export const getCurrentUser =
  async (): Promise<CurrentUserResponse> => {
    return fetch(`${api}/currentuser`, {
      credentials: "include",
      cache: "no-store",
    }).then(data => data.json())
  }

export const changeUserActiveState = async ({
  id,
  activate,
}: ChangeUserActiveStateRequest): Promise<ChangeUserActiveStateResponse> => {
  if (activate)
    return fetch(`${api}/activate/${id}`, {
      method: "PATCH",
      credentials: "include",
    }).then(res => res.json())

  return fetch(`${api}/deactivate/${id}`, {
    method: "PATCH",
    credentials: "include",
  }).then(res => res.json())
}

export const getAllUsers =
  async (): Promise<UsersEndpointResponse> => {
    const apiHit = await fetch(`${api}/Allusers`, {
      credentials: "include",
    })

    const response = await apiHit.json()

    return response
  }

export const deleteUser = async (id: string) => {
  return fetch(`${api}/deleteUser/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(response => response.json())
}

export const addCourse = async (newCourse: Course) => {
  return fetch(`${api}/courses`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(newCourse),
    headers: {
      "Content-type": "application/json",
    },
  })
}

export const getAllCourses =
  async (): Promise<GetAllCoursesResponse> => {
    return fetch(`${api}/courses`, {
      credentials: "include",
    }).then(resp => resp.json())
  }

export const getCourseById = async (
  id: string
): Promise<Course> => {
  return fetch(`${api}/courses/${id}`, {
    credentials: "include",
  }).then(resp => resp.json())
}

export const deleteCourse = async (id: string) => {
  return fetch(`${api}/courses/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(resp => resp.json())
}

export const logOut = async () => {
  return fetch(`${api}/logout`).then(resp => resp.json())
}

export const getCourseChapters = async (
  id: string
): Promise<GetCourseChaptersResponse> => {
  return fetch(`${api}/courses/${id}/chapters`).then(resp =>
    resp.json()
  )
}

export const addChapter = async ({
  newChapter,
  courseId,
}: {
  newChapter: Chapter
  courseId: string
}) => {
  return fetch(`${api}/courses/${courseId}/chapters`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(newChapter),
    headers: {
      "Content-type": "application/json",
    },
  })
}
