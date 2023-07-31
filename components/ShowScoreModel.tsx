"use client"

import { ShowScoreModalProps } from "@/types"
import { addUserResultByExamId } from "@/utils"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const ShowScoreModal = ({
  score,
  questions,
  userId,
  examId,
}: ShowScoreModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const middlePoint = Math.floor(questions / 2)

  const mutation = useMutation({
    mutationFn: addUserResultByExamId,
    onSuccess: () => {
      toast("تم ارسال نتيحتك", { type: "success" })
      router.back()
    },
  })

  return (
    <>
      <Button
        variant="outline"
        className="mx-auto block border-primary-blue text-primary-blue"
        onClick={onOpen}
      >
        تسليم
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="block mx-auto text-primary-blue">
            لقد احرزت
          </ModalHeader>
          <ModalBody>
            <h1 className="text-5xl text-primary-blue font-bold mb-5 w-fit mx-auto">
              {score}/{questions}
            </h1>
            <p
              className={
                score > middlePoint
                  ? "text-green-600 text-xl w-fit mx-auto"
                  : "text-red-600 text-xl w-fit mx-auto"
              }
            >
              {score >= middlePoint
                ? "اجتياز 👍"
                : score === questions
                ? "ممتاز 🙌💖✔"
                : "رسوب 😢"}
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              className="bg-primary-blue text-white block mx-auto"
              onClick={() => {
                mutation.mutate({
                  examId,
                  userId,
                  score,
                })
              }}
            >
              حسنا
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ShowScoreModal
