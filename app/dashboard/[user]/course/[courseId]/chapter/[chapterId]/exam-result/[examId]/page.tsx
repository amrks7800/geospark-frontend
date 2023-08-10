"use client"

import { ChakraTable } from "@/components"
import { getExamResults } from "@/utils"
import { Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

type PageProps = {
  params: { examId: string }
}

const page = ({ params: { examId } }: PageProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getExamResults(examId),
    queryKey: ["results"],
  })

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="1.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        m={"4"}
      />
    )

  return (
    <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
      {!!data?.length ? (
        <ChakraTable
          type="examResults"
          headers={["الاسم", "النتيجة"]}
          bodyItem={data}
        />
      ) : (
        "🤔 ليس هناك نتائج"
      )}
    </div>
  )
}
export default page
