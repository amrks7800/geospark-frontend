"use client"

import { useState, useEffect } from "react"
import {
  AddQuestionModal,
  ExamQuestion,
} from "@/components"
import CustomAccordion from "@/components/Accordion"
import { getExamQuestions } from "@/utils"
import { Button, Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

type PageProps = {
  params: {
    examId: string
    user: string
  }
}

const page = ({ params: { examId, user } }: PageProps) => {
  const [score, setScore] = useState(0)

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
      return (
        <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
          {data.questions.map((question, i) => (
            <ExamQuestion
              idx={i}
              question={question}
              key={i}
              setScore={setScore}
            />
          ))}
          <Button variant="outline">تسليم</Button>
        </div>
      )
    }
  }
}
export default page
