import {
  CurrentUserResponse,
  SignInRequest,
  AuthResponse,
  SignUpRequest,
  ChangeUserActiveStateRequest,
  ChangeUserActiveStateResponse,
  UsersEndpointResponse,
  Course,
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
      next: {
        revalidate: 10,
      },
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
      "Content-type": "application/json"
    }
  })
}
