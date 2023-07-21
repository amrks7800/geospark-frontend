"use client"

import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react"
import { AiOutlinePlus } from "react-icons/ai"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { addExamToChapter } from "@/utils"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type ModalProps = {
  chapterId: string
}

const AddExamModal = ({ chapterId }: ModalProps) => {
  const [title, setTitle] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const queryClient = useQueryClient()

  const addExam = useMutation({
    mutationFn: addExamToChapter,
    onSuccess: () => {
      toast("تم", { type: "success" })
      router.refresh()
      queryClient.invalidateQueries(["exam"])
      onClose()
    },
    onError: () => {
      toast("حاول مرة اخري", { type: "error" })
    },
  })

  return (
    <>
      <Button
        className="bg-primary-blue rounded-md text-white flex items-center gap-2 w-fit px-4 py-2 font-semibold my-3"
        onClick={onOpen}
      >
        <AiOutlinePlus size={30} />
        إضافة امتحان
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>امتحان جديد</ModalHeader>
          <ModalBody>
            <Input
              placeholder="عنوان الامتحان"
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant={"filled"}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              className="text-black hover:text-white"
            >
              إلغاء
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                addExam.mutate({
                  chapterId,
                  newExam: { title },
                })
              }}
            >
              إضافة
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddExamModal
