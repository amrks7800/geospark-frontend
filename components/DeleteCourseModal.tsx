import { deleteCourse } from "@/utils"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "react-toastify"

type DeleteCourseModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  courseName: string
  courseId: string
}

export default function DeleteCourseModal({
  isOpen,
  onClose,
  onOpen,
  courseId,
  courseName,
}: DeleteCourseModalProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast(`تم حذف ${courseName}`, { type: "success" })
      onClose()
      queryClient.invalidateQueries(["course"])
    },
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className="text-xl text-primary-blue font-bold my-5">
            حذف {courseName}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              bgColor="#4E4FEB"
            >
              الغاء
            </Button>
            <Button
              bgColor="#4E4FEB"
              onClick={() =>
                deleteMutation.mutate(courseId)
              }
            >
              حذف
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
