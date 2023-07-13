"use client"

import { AiOutlineMail } from "react-icons/ai"
import { BiLockAlt } from "react-icons/bi"
import { Link } from "@chakra-ui/next-js"
import { Button } from "@chakra-ui/react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ThemedInput from "./ThemedInput"
import { SignIn } from "@/utils"
import { toast } from "react-toastify"

const SigninForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: SignIn,
    onSuccess: data => {
      queryClient.clear()
      if (data.data.user.isAdmin) {
        router.push("/dashboard/teachers")
      } else {
        router.push("/")
      }
      toast("تم تسجيل الدخول بنجاح", { type: "success" })
    },
    onError(error: { message: string }) {
      console.log(error)
      toast(error.message, { type: "error" })
    },
  })

  const handleSignin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    mutation.mutate({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    e.currentTarget.reset()
  }

  return (
    <form className="my-4" onSubmit={handleSignin}>
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
      >
        تسجيل الدخول
      </Button>
      <Link
        href="/signup"
        className="mx-auto block my-1 mt-3 w-fit"
      >
        ليس لديك حساب؟{" "}
        <span className="text-secondary-blue font-semibold">
          تسجيل
        </span>
      </Link>
    </form>
  )
}
export default SigninForm
