"use client"

import { Chapter } from "@/types"
import { Progress } from "@chakra-ui/react"
import Button from "./Button"
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { deleteChapter, getCurrentUser } from "@/utils"
import { BiTrash } from "react-icons/bi"
import { toast } from "react-toastify"
import { usePathname, useRouter } from "next/navigation"

type CourseChapterProps = {
  chapter: Chapter
}

const CourseChapter = ({ chapter }: CourseChapterProps) => {
  const PROGRESS_VALUE = Math.floor(Math.random() * 100)
  const pathname = usePathname()

  const { data } = useQuery({
    queryFn: getCurrentUser,
    queryKey: [""],
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: deleteChapter,
    onSuccess: data => {
      router.refresh()
      toast("تم حذف الشابتر بنجاح", { type: "success" })
    },
  })

  return (
    <div className="my-5 p-3 border border-solid border-gray-400 lg:w-full group relative">
      {!!data?.isAdmin && (
        <BiTrash
          color="red"
          size={25}
          className="cursor-pointer absolute top-4 left-2 hidden group-hover:block"
          onClick={() =>
            chapter?.id && mutation.mutate(chapter?.id)
          }
        />
      )}
      <div className="flex sm:items-center items-start justify-between mb-3 sm:flex-row flex-col">
        <div>
          <h1 className="text-xl my-2 text-secondary-blue">
            {chapter.title}
          </h1>
          <p className="my-2 text-lg text-[#777]">
            {chapter.description}
            <span className="block">
              بتاريخ: Sep 21, 2022
            </span>
          </p>
        </div>
        <Button
          text={!!data?.isAdmin ? "تعديل" : "متابعة"}
          style="me-8 block sm:mb-0 mb-3"
          onClick={() =>
            router.push(`${pathname}/chapter/${chapter.id}`)
          }
        />
      </div>
      {!data?.isAdmin && (
        <div className="bg-[#F6F6F6] -m-3 p-3">
          <h2 className="text-base my-2 text-secondary-blue">
            التقدم
          </h2>
          <div className="flex gap-2 items-center">
            <Progress
              value={PROGRESS_VALUE}
              size="sm"
              colorScheme="blue"
              className="rounded-full flex-1"
            />
            <span>{PROGRESS_VALUE}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default CourseChapter
