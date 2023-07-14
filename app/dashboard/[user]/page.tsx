import { AddCourseModal, Courses } from "@/components"

type DashboardParams = {
  params: { user: "teachers" | "users" }
}

export async function generateMetadata({
  params: { user },
}: DashboardParams) {
  if (user === "teachers") return { title: "وحدة التحكم" }

  return { title: "غرفة الفصل" }
}

const Dashboard = ({ params }: DashboardParams) => {
  return (
    <div className="flex-1 p-4 h-[88vh] overflow-y-scroll">
      {params.user === "teachers" && <AddCourseModal />}
      <Courses />
    </div>
  )
}
export default Dashboard
