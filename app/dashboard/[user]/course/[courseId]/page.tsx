import { CourseChapter } from "@/components"
import AddChapterModal from "@/components/AddChapterModal"
import {
  getCourseById,
  getCourseChapters,
  getCurrentUser,
} from "@/utils"

type CourseProps = {
  params: { courseId: string }
}

const Course = async ({
  params: { courseId },
}: CourseProps) => {
  // const { chapters } = await getCourseChapters(courseId)
  // const course = await getCourseById(courseId)
  // const { isAdmin } = await getCurrentUser()
  const [{ chapters }, course, { isAdmin }] =
    await Promise.all([
      getCourseChapters(courseId),
      getCourseById(courseId),
      getCurrentUser(),
    ])

  return (
    <div className="p-4 flex-1">
      <h1 className="mb-5 text-2xl text-primary-blue">
        {course.title}
      </h1>
      {isAdmin && <AddChapterModal courseId={courseId} />}
      <div>
        {chapters &&
          chapters.map((chapter, i) => (
            <CourseChapter chapter={chapter} key={i} />
          ))}
      </div>
    </div>
  )
}
export default Course
