"use client"

import { useState } from "react"
import {
  AddQuestionModal,
  ExamQuestion,
} from "@/components"
import CustomAccordion from "@/components/Accordion"
import { getCurrentUser, getExamQuestions } from "@/utils"
import { Button, Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import ShowScoreModal from "@/components/ShowScoreModel"

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
  const { data: currentUser } = useQuery({
    queryFn: getCurrentUser,
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
          {!!currentUser && (
            <ShowScoreModal
              score={score}
              examId={examId}
              userId={currentUser.id}
              questions={data.questions.length}
            />
          )}
        </div>
      )
    }
  }
}
export default page
