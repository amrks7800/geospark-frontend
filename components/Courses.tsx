"use client"

import { SimpleGrid } from "@chakra-ui/react"
import ProjectCard from "./ProjectCard"

const Courses = () => {
  const Arr: string[] = Array(1).fill("")
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      className="my-4"
    >
      {Arr.map((_, i) => (
        <ProjectCard key={i} />
      ))}
    </SimpleGrid>
  )
}
export default Courses
