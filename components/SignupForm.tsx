"use client"

import { CiUser } from "react-icons/ci"
import { AiOutlineMail } from "react-icons/ai"
import { BiLockAlt } from "react-icons/bi"
import { Link } from "@chakra-ui/next-js"
import { Button, Spinner } from "@chakra-ui/react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ThemedInput from "./ThemedInput"
import { signUp } from "@/utils"
import { toast } from "react-toastify"

const SignupForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: response => {
      toast("يمكنك تسجيل الدخول الأن", { type: "success" })

      queryClient.clear()

      router.push("/")
    },
    onError(error) {},
  })

  const handleSignup = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    mutation.mutate({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    })
  }

  return (
    <form className="my-4" onSubmit={handleSignup}>
      <ThemedInput
        name="firstName"
        icon={
          <CiUser
            size={25}
            color="#777"
            className="absolute top-1/2 right-1 -translate-y-1/2"
          />
        }
        placeholder="الاسم الأول"
      />

      <ThemedInput
        name="lastName"
        placeholder="الاسم الثاني"
        icon={
          <CiUser
            size={25}
            color="#777"
            className="absolute top-1/2 right-1 -translate-y-1/2"
          />
        }
      />

      <ThemedInput
        placeholder="البريد الالكتروني"
        name="email"
        type="email"
        icon={
          <AiOutlineMail
            size={25}
            color="#777"
            className="absolute top-1/2 right-1 -translate-y-1/2"
          />
        }
      />

      <ThemedInput
        placeholder="كلمة المرور"
        name="password"
        type="password"
        icon={
          <BiLockAlt
            size={25}
            color="#777"
            className="absolute top-1/2 right-1 -translate-y-1/2"
          />
        }
      />

      <Button
        variant="outline"
        borderColor={"#4E4FEB"}
        textColor={"#4E4FEB"}
        display={"block"}
        mx={"auto"}
        fontSize={"xl"}
        rounded={"full"}
        type="submit"
        disabled={mutation.isLoading}
        className="disabled:bg-[#FCFBFB] w-[150px] flex items-center justify-center"
      >
        {mutation.isLoading ? (
          <Spinner
            thickness="2px"
            speed="1.5s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
        ) : (
          "تسجيل"
        )}
      </Button>
      <Link
        href="/signin"
        className="mx-auto block my-1 mt-3 w-fit"
      >
        لديك حساب بالفعل؟{" "}
        <span className="text-secondary-blue font-semibold">
          تسجيل الدخول
        </span>
      </Link>
    </form>
  )
}

export default SignupForm
