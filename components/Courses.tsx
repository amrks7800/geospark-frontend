"use client"

import { SimpleGrid } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"
import { useQuery } from "@tanstack/react-query"
import { getAllCourses, getCurrentUser } from "@/utils"

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryFn: getAllCourses,
    queryKey: ["course"],
  })
  const { data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["course"],
  })

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      className="my-4"
    >
      {courses?.courses ? (
        courses.courses.map((course, i) => (
          <ProjectCard course={course} key={i} />
        ))
      ) : (
        <h1>
          {user?.isAdmin
            ? "أضف الكورس الاول 😍👌."
            : "انتظر من فضلك"}
        </h1>
      )}
    </SimpleGrid>
  )
}
export default Courses
