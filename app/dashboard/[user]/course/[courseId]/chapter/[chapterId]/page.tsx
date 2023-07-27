"use client"

import { useMemo } from "react"
import {
  AddExamModal,
  AddVideoModal,
  ChakraTable,
  StepCounter,
  Table,
  VideoPlayer,
} from "@/components"
import {
  getChapterExams,
  getChapterVideos,
  getExam,
} from "@/utils"
import { Button } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineSubtitles } from "react-icons/md"
import { BiLinkAlt } from "react-icons/bi"
import { useProgressStore } from "@/store"

type PageProps = {
  params: {
    chapterId: string
    courseId: string
    user: "teachers" | "users"
  }
}

const Page = ({ params }: PageProps) => {
  const [active, setActive] = useState(1)

  const setNewChapter = useProgressStore(
    state => state.setNewChapter
  )

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: videosResult } = useQuery({
    queryFn: () => getChapterVideos(params.chapterId),
    queryKey: ["video"],
  })

  const progressPercentage = useMemo(() => {
    if (videosResult?.videos.length) {
      return (active / videosResult?.videos.length) * 100
    }
  }, [active])

  useEffect(() => {
    router.push(`${pathname}?v=${active}`)

    if (progressPercentage) {
      setNewChapter({
        id: params.chapterId,
        progress: progressPercentage,
      })
    }
  }, [active])

  useEffect(() => {
    if (searchParams.get("v")) {
      setActive(+searchParams.get("v")!)
    }
  }, [pathname])

  const { data: exams, isError } = useQuery({
    queryFn: () =>
      getChapterExams({ chapterId: params.chapterId }),
    queryKey: ["exams"],
  })

  if (videosResult && exams) {
    if (params.user === "teachers") {
      return (
        <div className="p-4 flex-1 h-[88vh] overflow-y-scroll">
          <AddVideoModal chapterId={params.chapterId} />
          <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto mb-5">
            <div className="w-fit">
              <Table
                headers={[
                  <div className="flex items-center gap-1">
                    <MdOutlineSubtitles size={25} />
                    العنوان
                  </div>,
                  <div className="flex items-center gap-1">
                    <BiLinkAlt size={25} />
                    الرابط
                  </div>,
                ]}
                items={videosResult.videos}
                type="videos"
              />
            </div>
          </div>
          <AddExamModal chapterId={params.chapterId} />
          <ChakraTable
            headers={["عنوان الامتحان", "الترتيب", "حذف"]}
            type="exams"
            bodyItem={exams?.exams}
          />
        </div>
      )
    } else if (params.user === "users") {
      return (
        <div className="p-4 flex-1 h-[88vh] overflow-y-scroll">
          <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto">
            <StepCounter
              steps={videosResult.videos}
              activeIdx={active}
            />
          </div>
          <VideoPlayer
            video={videosResult.videos[active - 1]}
          />
          {!!videosResult.videos.length && (
            <div className="max-w-[560px] my-3 flex items-center justify-between mx-auto">
              <Button
                onClick={() => {
                  if (active === 1) return
                  setActive(prev => prev - 1)
                }}
                variant={"outline"}
              >
                السابق
              </Button>
              <Button
                onClick={() => {
                  if (active === videosResult.videos.length)
                    return
                  setActive(prev => prev + 1)
                }}
                variant={"outline"}
              >
                التالي
              </Button>
            </div>
          )}
        </div>
      )
    }
  }
}
export default Page
