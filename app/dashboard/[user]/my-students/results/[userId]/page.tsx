"use client"

import { ChakraTable, Stats } from "@/components"
import { getUserResultById } from "@/utils"
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

  const scoresArray = useMemo(() => {
    return results?.map(item => item.user_score)
  }, [results])

  console.log(scoresArray)

  if (error) {
    toast("حاول مرة اخري", { type: "error" })
    return "😢"
  }

  if (results) {
    return (
      <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
        <ChakraTable
          headers={["الامتحان", "النتيجة"]}
          type="results"
          bodyItem={results}
        />
        <Stats
          stats={
            scoresArray ? scoresArray : ["not available"]
          }
        />
      </div>
    )
  }
}
export default page
