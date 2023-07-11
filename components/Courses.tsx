"use client"

import { SimpleGrid } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"
import { useQuery } from "@tanstack/react-query"
import { getAllCourses } from "@/utils"

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryFn: getAllCourses,
    queryKey: ["course"],
  })

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      className="my-4"
    >
      {courses &&
        courses.courses.map((course, i) => (
          <ProjectCard course={course} key={i} />
        ))}
    </SimpleGrid>
  )
}
export default Courses
