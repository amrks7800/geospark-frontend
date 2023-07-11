import { SigninForm } from "@/components"

export const metadata = {
  title: "تسجيل الدخول",
}

const Signin = async () => {
  return (
    <div className="grid place-items-center min-h-[75vh]">
      <div className="shadow-main rounded-xl py-4 sm:px-20 px-8 my-auto">
        <h1 className="mx-auto mt-4 w-fit text-2xl text-secondary-blue font-bold">
          مرحبا بك من جديد
        </h1>
        <span className="block mx-auto w-fit text-[#777] mb-8">
          ادخل بياناتك لتسجيل الدخول
        </span>
        <SigninForm />
      </div>
    </div>
  )
}
export default Signin
