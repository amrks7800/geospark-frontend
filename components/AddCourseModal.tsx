"use client"

import { addCourse, getCurrentUser } from "@/utils"
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
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { toast } from "react-toastify"

function AddCourseModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useQuery({
    queryFn: getCurrentUser,
    queryKey: [""],
  })

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addCourse,
    onSuccess() {
      queryClient.invalidateQueries(["course"])
      toast(`تم انشاء الكورس بنجاح`, { type: "success" })
      onClose()
    },
  })

  return (
    <>
      <Button
        className="bg-primary-blue rounded-md text-white flex items-center gap-2 w-fit px-4 py-2 font-semibold"
        onClick={onOpen}
      >
        <AiOutlinePlus size={30} />
        إضافة كورس
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-primary-blue">
            أضف كورس جديد.
          </ModalHeader>
          <ModalBody pb={6}>
            <h2 className="text-slate-400 my-2">العنوان</h2>
            <Input
              type="text"
              variant={"filled"}
              placeholder="ادخل عنوان الكورس"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <h2 className="text-slate-400 my-2">الوصف</h2>
            <Textarea
              variant={"filled"}
              placeholder="أدخل الوصف"
              resize={"none"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4E4FEB"
              mr={3}
              onClick={() => {
                if (data) {
                  mutation.mutate({
                    title,
                    description,
                  })
                }
              }}
            >
              حفظ
            </Button>
            <Button onClick={onClose}>إلغاء</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCourseModal
