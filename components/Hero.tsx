import Image from "next/image"
import Button from "./Button"
import { AiOutlineArrowDown } from "react-icons/ai"
import Link from "next/link"

const Hero = () => {
  return (
    <div
      className="flex items-center justify-center py-14 container mx-auto cut-viewport-height relative sm:flex-row flex-col
    bg-white rounded-xl p-2"
    >
      <div className="flex-1 self-center max-sm:text-center">
        <h1 className="text-3xl sm:text-6xl text-[#2F2D51]">
          اتعلم جيولوجيا
          <span className="font-bold ms-2">صح </span>
        </h1>
        <p className="text-[#777] my-5  leading-5 text-lg font-semibold max-sm:mx-auto">
          اتعلم الجيولوجيا بكل سهولة مع مستر أحمد الفرنواني
        </p>
        <Link href="#about">
          <Button
            text="ابدأ"
            style="font-bold px-5 py-4 rounded-lg w-[150px]"
          />
        </Link>
      </div>
      <div className="flex-1 self-center flex justify-end">
        <Image
          src="/ms.png"
          alt="mister"
          width={300}
          height={600}
          className="drop-shadow-main md:w-[300px] md:h-[450px] w-[95vw] max-md:mx-auto"
        />
      </div>
      <Link
        href={"/#skills"}
        className="flex flex-col justify-center items-center absolute bottom-10 right-1/2 translate-x-1/2 up-down
        z-10"
      >
        <Image
          src="/Dino.png"
          alt="dinosaur"
          width={150}
          height={100}
        />
        <AiOutlineArrowDown size={28} color="#4E4FEB" />
      </Link>
    </div>
  )
}
export default Hero
