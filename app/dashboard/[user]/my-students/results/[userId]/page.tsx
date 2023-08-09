"use client"

import { ChakraTable, Stats } from "@/components"
import { User } from "@/types"
import { getUserById, getUserResultById } from "@/utils"
import { Stack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { toast } from "react-toastify"

type PageProps = {
  params: {
    userId: string
  }
}

const page = ({ params: { userId } }: PageProps) => {
  const {
    data: results,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getUserResultById(userId),
    queryKey: ["results"],
  })

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryFn: () => getUserById(userId),
    queryKey: ["user"],
  })

  const scoresArray = useMemo(() => {
    return results?.map(item => item.user_score)
  }, [results])

  console.log(scoresArray)

  if (error || userError) {
    toast("حاول مرة اخري", { type: "error" })
    return "😢"
  }

  if (results) {
    return (
      <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
        {userLoading ? (
          "جاري تحميل بيانات الطالب"
        ) : user ? (
          <UserInfo user={user} />
        ) : (
          ""
        )}
        <Stats
          stats={
            scoresArray ? scoresArray : ["not available"]
          }
        />
        <ChakraTable
          headers={["الامتحان", "النتيجة"]}
          type="results"
          bodyItem={results}
        />
      </div>
    )
  }
}

const UserInfo = ({ user }: { user: User }) => {
  const { firstName, lastName, email, subscribed } = user

  return (
    <div className="flex items-center justify-center gap-2 flex-col my-3">
      <p className="my-2 text-xl font-semibold text-primary-blue">
        الاسم:{firstName + " "}
        {lastName}
      </p>
      <p className="my-2 text-xl font-semibold text-primary-blue">
        البريد الالكتروني: {email}
      </p>
      <p className="my-2 text-xl font-semibold text-primary-blue">
        الحالة: {!!subscribed ? "مشترك" : "غير مشترك"}
      </p>
    </div>
  )
}

export default page
