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

type ModalProps = {
  chapterId: string
}

const AddExamModal = ({ chapterId }: ModalProps) => {
  const [title, setTitle] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()
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
            <Button variant="ghost">إضافة</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddExamModal
