import { SignupForm } from "@/components"

export const metadata = {
  title: "التسجيل",
}

const Signup = () => {
  return (
    <div className="grid place-items-center min-h-[75vh]">
      <div className="shadow-main rounded-xl py-4 sm:px-20 px-8 my-auto">
        <h1 className="mx-auto mt-4 w-fit text-2xl text-secondary-blue font-bold">
          اهلا بك عزيزي الطالب.
        </h1>
        <span className="block mx-auto w-fit text-[#777] mb-8">
          قم بإكمال البيانات للتسجيل
        </span>
        <SignupForm />
      </div>
    </div>
  )
}
export default Signup
