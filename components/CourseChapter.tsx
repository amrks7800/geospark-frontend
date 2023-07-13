"use client"

import { Chapter } from "@/types"
import { Progress } from "@chakra-ui/react"
import Button from "./Button"

type CourseChapterProps = {
  chapter: Chapter
}

const CourseChapter = ({ chapter }: CourseChapterProps) => {
  const PROGRESS_VALUE = Math.floor(Math.random() * 100)
  return (
    <div className="my-5 p-3 border border-solid border-gray-400 lg:w-full">
      <div className="flex sm:items-center items-start justify-between mb-3 sm:flex-row flex-col">
        <div>
          <h1 className="text-xl my-2 text-secondary-blue">
            {chapter.title}
          </h1>
          <p className="my-2 text-lg text-[#777]">
            {chapter.description}
            <span className="block">
              التحق يوم: Sep 21, 2022
            </span>
          </p>
        </div>
        <Button
          text="متابعة"
          style="me-8 block sm:mb-0 mb-3"
        />
      </div>
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
    </div>
  )
}
export default CourseChapter
