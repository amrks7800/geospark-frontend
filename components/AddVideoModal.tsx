"use client"

import { addVideo } from "@/utils"
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

function AddVideoModal({
  chapterId,
}: {
  chapterId: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addVideo,
    onSuccess() {
      queryClient.invalidateQueries(["video"])
      toast(`تم انشاء الفيديو بنجاح`, { type: "success" })
      onClose()
    },
  })

  return (
    <>
      <Button
        className="bg-primary-blue rounded-md text-white flex items-center gap-2 w-fit px-4 py-2 font-semibold my-3"
        onClick={onOpen}
      >
        <AiOutlinePlus size={30} />
        إضافة فيديو
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-primary-blue">
            أضف فيديو جديد.
          </ModalHeader>
          <ModalBody pb={6}>
            <h2 className="text-slate-400 my-2">العنوان</h2>
            <Input
              type="text"
              variant={"filled"}
              placeholder="ادخل عنوان الفيديو"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <h2 className="text-slate-400 my-2">الرابط</h2>
            <Textarea
              variant={"filled"}
              placeholder="أدخل الرابط"
              resize={"none"}
              value={url}
              onChange={e => setUrl(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#4E4FEB"
              mr={3}
              onClick={() => {
                mutation.mutate({
                  title,
                  url,
                  chapterId,
                })
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

export default AddVideoModal
