"use client"

import { AddQuestionModal } from "@/components"
import CustomAccordion from "@/components/Accordion"
import { getExamQuestions } from "@/utils"
import { Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

type PageProps = {
  params: {
    examId: string
    user: string
  }
}

const page = ({ params: { examId, user } }: PageProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getExamQuestions(examId),
    queryKey: ["questions"],
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

  if (data) {
    if (user === "teachers") {
      return (
        <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
          <AddQuestionModal examId={examId} />
          <CustomAccordion questions={data.questions} />
        </div>
      )
    } else if (user === "users") {
      return "welcome"
    }
  }
}
export default page
