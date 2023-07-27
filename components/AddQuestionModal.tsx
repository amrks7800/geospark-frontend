"use client"

import { ABC } from "@/constants"
import { addQuestionToExam } from "@/utils"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import React, { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { toast } from "react-toastify"

const AddQuestionModal = ({
  examId,
}: {
  examId: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [answersLength, setAnswersLength] = useState(
    Array(3).fill("")
  )

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addQuestionToExam,
    onSuccess() {
      queryClient.invalidateQueries(["questions"])
      toast(`تم انشاء السؤال بنجاح`, { type: "success" })
      onClose()
    },
  })

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const question = {
      question: String(formData.get("question")),
      option1: String(formData.get("option1")),
      option2: String(formData.get("option2")),
      option3: String(formData.get("option3")),
      correctAnswer: String(formData.get("correctAnswer")),
    }

    mutation.mutate({
      examId,
      question,
    })
  }

  return (
    <>
      <Button
        className="bg-primary-blue rounded-md text-white flex items-center gap-2 w-fit px-4 py-2 font-semibold"
        onClick={onOpen}
      >
        <AiOutlinePlus size={30} />
        إضافة سؤال
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader className="text-primary-blue">
              أضف سؤال جديد.
            </ModalHeader>
            <ModalBody pb={6}>
              <h2 className="text-slate-400 my-2">
                العنوان
              </h2>
              <Textarea
                variant={"filled"}
                placeholder="ادخل عنوان السؤال"
                name="question"
              ></Textarea>
              <h2 className="text-slate-400 my-2">
                الاجابات
              </h2>
              {answersLength.map((_, i) => (
                <Input
                  variant={"filled"}
                  placeholder={ABC[i]}
                  className="my-2"
                  key={i}
                  name={`option${++i}`}
                />
              ))}

              <h2 className="text-slate-400 my-2">
                ادخل رمز الاجابة الصحيحة
              </h2>

              <Input
                variant={"filled"}
                placeholder={"a, b, c...."}
                name="correctAnswer"
                maxLength={1}
                className="my-2"
              />
            </ModalBody>

            <ModalFooter>
              <Button bg="#4E4FEB" mr={3} type={"submit"}>
                حفظ
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  setAnswersLength([""])
                }}
                type="button"
              >
                إلغاء
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
export default AddQuestionModal
