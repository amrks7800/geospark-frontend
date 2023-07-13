"use client"

import { Course } from "@/types"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi"
import DeleteCourseModal from "./DeleteCourseModal"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser } from "@/utils"
import { useQuery } from "@tanstack/react-query"

const ProjectCard = ({ course }: { course: Course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const pathname = usePathname()

  const { data } = useQuery({
    queryFn: getCurrentUser,
  })

  return (
    <Card className="relative group">
      {data?.isAdmin && (
        <BiTrash
          color="red"
          size={25}
          className="cursor-pointer absolute top-4 left-2 hidden group-hover:block"
          onClick={() => onOpen()}
        />
      )}
      <DeleteCourseModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        courseName={course.title}
        courseId={course.id!}
      />
      <CardHeader>
        <Heading size="md" color={"#4E4FEB"}>
          {course.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{course.description}</Text>
      </CardBody>
      <CardFooter>
        <Button
          variant={"outline"}
          color="#4E4FEB"
          onClick={() =>
            router.push(`${pathname}/course/${course.id}`)
          }
        >
          عرض
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProjectCard
