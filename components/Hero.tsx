import Image from "next/image"
import Button from "./Button"
import { AiOutlineArrowDown } from "react-icons/ai"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="flex items-center justify-center py-14 container mx-auto min-h-[85vh] relative sm:flex-row flex-col">
      <div className="flex-1 self-center max-sm:text-center">
        <h1 className="sm:text-3xl text-2xl font-bold text-primary-blue">
          اكتشف كل ما لا تعرفه عن الجيولوجيا.
        </h1>
        <p className="text-[#777] sm:my-5 my-2 max-w-[350px] leading-5 text-lg font-semibold max-sm:mx-auto">
          أفضل مجموعة متنوعه من كورسات مادة الجيولوجي
          للثانوية العامة، بطريقة تفاعلية و تقييمية.
        </p>
        <Link href="#about">
          <Button text="اكتشف" style="font-bold px-7" />
        </Link>
      </div>
      <div className="flex-1 self-center flex justify-end">
        <Image
          src="/layers.png"
          alt="layers"
          width={600}
          height={500}
          className="max-w-full drop-shadow-main md:w-[600px] md:h-[450px] w-[95vw] max-md:mx-auto"
        />
      </div>
      <Link
        href={"/#skills"}
        className="flex flex-col justify-center items-center absolute bottom-10 right-1/2 translate-x-1/2 up-down"
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
