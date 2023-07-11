import { AddCourseModal, Courses } from "@/components"

export async function generateMetadata({
  params: { user },
}: {
  params: { user: "teachers" | "users" }
}) {
  if (user === "teachers") return { title: "وحدة التحكم" }

  return { title: "غرفة الفصل" }
}

const Dashboard = ({
  params,
}: {
  params: { user: "teachers" | "users" }
}) => {
  return (
    <div className="flex-1 p-4">
      {params.user === "teachers" && <AddCourseModal />}
      <Courses />
    </div>
  )
}
export default Dashboard
