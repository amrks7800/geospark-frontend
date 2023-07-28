"use client"

import {
  Radio,
  RadioGroup,
  Stack,
  Divider,
} from "@chakra-ui/react"
import { useState, Dispatch, SetStateAction } from "react"
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
}

export function ExamQuestion({
  question,
  idx,
  setScore,
}: ExamQuestionProps) {
  const mutation = useMutation({
    mutationFn: checkAnswer,
    onSuccess: data => {
      console.log(data.isCorrect)
      if (data.isCorrect) {
        setScore(prev => prev + 1)
      }
    },
    onError() {
      toast("حدث خطأ اختر من جديد", {
        type: "info",
      })
    },
  })

  return (
    <div className="my-8">
      <p className="text-[#2F2D51] text-lg font-semibold my-2">
        {++idx}-{question.question}
      </p>
      <RadioGroup
        onChange={e => {
          mutation.mutate({
            questionId: question.id,
            answer: e,
          })
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
      <Divider className="mt-5" />
    </div>
  )
}
