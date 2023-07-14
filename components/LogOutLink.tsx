"use client"

import { logOut } from "@/utils"
import { Button } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const LogOutLink = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return (
    <Button
      textColor={"#4E4FEB"}
      onClick={async () => {
        await logOut().then(() => {
          queryClient.clear()
          router.push("/signin")
        })
      }}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 text-primary-blue"
    >
      LogOutLink
    </Button>
  )
}
export default LogOutLink
