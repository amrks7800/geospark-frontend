"use client"

import {
  AddVideoModal,
  StepCounter,
  Table,
  VideoPlayer,
} from "@/components"
import { getChapterVideos } from "@/utils"
import { Button } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

type PageProps = {
  params: { chapterId: string; user: "teachers" | "users" }
}

const Page = ({ params }: PageProps) => {
  const [active, setActive] = useState(1)

  const router = useRouter()

  const { data, isError } = useQuery({
    queryFn: () => getChapterVideos(params.chapterId),
    queryKey: ["video"],
  })

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    router.push(`${pathname}?v=${active}`)
  }, [active])

  useEffect(() => {
    if (searchParams.get("v")) {
      setActive(+searchParams.get("v")!)
    }
  }, [pathname])

  if (isError) {
    toast("انت غير مشترك او حدث خطأ", { type: "error" })
  }

  if (data) {
    if (params.user === "teachers") {
      return (
        <div className="p-4 flex-1 h-[88vh] overflow-y-scroll">
          <AddVideoModal chapterId={params.chapterId} />
          <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto">
            <div className="w-fit">
              <Table
                headers={["العنوان", "الرابط"]}
                items={data.videos}
                type="videos"
              />
            </div>
          </div>
        </div>
      )
    } else if (params.user === "users") {
      return (
        <div className="p-4 flex-1 h-[88vh] overflow-y-scroll">
          <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto">
            <StepCounter
              steps={data.videos}
              activeIdx={active}
            />
          </div>
          <VideoPlayer video={data.videos[active - 1]} />
          <div className="max-w-[560px] my-3 flex items-center justify-between mx-auto">
            <Button
              onClick={() => {
                if (active === data.videos.length) return
                setActive(prev => prev - 1)
              }}
              variant={"outline"}
            >
              السابق
            </Button>
            <Button
              onClick={() => {
                if (active === data.videos.length) return
                setActive(prev => prev + 1)
              }}
              variant={"outline"}
            >
              التالي
            </Button>
          </div>
        </div>
      )
    }
  }
}
export default Page
