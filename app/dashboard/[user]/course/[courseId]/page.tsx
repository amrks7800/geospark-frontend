import { CourseChapter } from "@/components"
import AddChapterModal from "@/components/AddChapterModal"
import { getCourseById, getCourseChapters } from "@/utils"

type CourseProps = {
  params: { courseId: string; user: string }
}

const Course = async ({
  params: { courseId, user },
}: CourseProps) => {
  const [{ chapters }, course] = await Promise.all([
    getCourseChapters(courseId),
    getCourseById(courseId),
  ])

  return (
    <div className="p-4 flex-1 overflow-y-scroll cut-viewport-height">
      <div>
        <h1 className="mb-5 text-2xl text-primary-blue">
          {course.title}
        </h1>
        {user === "teachers" && (
          <AddChapterModal courseId={courseId} />
        )}
        <div>
          {chapters ? (
            chapters.map((chapter, i) => (
              <CourseChapter chapter={chapter} key={i} />
            ))
          ) : (
            <h1>ليس هناك شباتر هنا بعد</h1>
          )}
        </div>
      </div>
    </div>
  )
}
export default Course
