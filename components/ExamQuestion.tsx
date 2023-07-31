"use client"

import {
  Button,
  Divider,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { Question } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { checkAnswer } from "@/utils"
import { toast } from "react-toastify"

type ExamQuestionProps = {
  question: Pick<
    Question,
    "id" | "question" | "option1" | "option2" | "option3"
  >
  idx: number
  setScore: Dispatch<SetStateAction<number>>
  setCurrentQuestion: Dispatch<SetStateAction<number>>
  length: number
}

export function ExamQuestion({
  question,
  idx,
  setScore,
  setCurrentQuestion,
  length,
}: ExamQuestionProps) {
  const [answer, setAnswer] = useState("")

  const mutation = useMutation({
    mutationFn: checkAnswer,
    onSuccess: data => {
      console.log(data.isCorrect)
      if (data.isCorrect) {
        setScore(prev => {
          if (prev !== length) {
            return prev + 1
          }
          return prev
        })
      }
    },
    onError() {
      toast("حدث خطأ اختر من جديد", {
        type: "info",
      })
    },
  })

  return (
    <div className="my-8" key={idx}>
      <p className="text-[#2F2D51] text-lg font-semibold my-2">
        {++idx}-{question.question}
      </p>
      <RadioGroup
        onChange={e => {
          setAnswer(e)
        }}
      >
        <Stack direction="column" spacing="1">
          <div>
            <Radio value="a" size="lg">
              a) {question.option1}
            </Radio>
          </div>
          <div>
            <Radio value="b" size="lg">
              b) {question.option2}
            </Radio>
          </div>
          <div>
            <Radio value="c" size="lg">
              c) {question.option3}
            </Radio>
          </div>
        </Stack>
      </RadioGroup>

      <Button
        variant="outline"
        className="mx-auto block border-primary-blue text-primary-blue my-3"
        onClick={() => {
          if (answer !== "") {
            mutation.mutate({
              questionId: question.id,
              answer,
            })
            setCurrentQuestion(prev => {
              if (prev + 1 !== length) {
                return prev + 1
              }
              return prev
            })
          } else {
            toast("قم باختيار اجابة من فضلك", {
              type: "info",
            })
          }
        }}
      >
        التالي
      </Button>

      <Divider className="mt-5" />
    </div>
  )
}
