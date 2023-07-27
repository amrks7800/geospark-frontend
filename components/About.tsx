"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import SocialMediaIcons from "./SocialMediaIcons"

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      <Image
        src={"/blob.svg"}
        alt="blob"
        className="absolute -top-24 -right-32 md:block hidden z-10"
        width={500}
        height={500}
      />
      <Image
        src={"/blob.svg"}
        alt="blob"
        className="absolute -bottom-24 -left-32 md:block hidden z-10"
        width={500}
        height={500}
      />
      <h1 className="w-fit mx-auto mb-10 font-bold text-primary-blue text-2xl">
        تعرف علي مدرسك
      </h1>
      <div className="container mx-auto flex items-stretch justify-center gap-5 sm:flex-row flex-col mt-24">
        <div className="sm:basis-[30%]">
          <div className="relative sm:mx-0 mx-auto shadow-main w-full h-60 z-10">
            <motion.div
              initial={{
                scale: 0.725,
                translateX: "50%",
                transformOrigin: "bottom",
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-0 w-[230px] right-1/2"
            >
              <Image
                src="/ms.png"
                alt="mister"
                height={345}
                width={230}
              />
            </motion.div>
          </div>
        </div>
        <div className="basis-[30%] sm:mx-0 mx-auto sm:text-start text-center sm:pt-0 ">
          <h2 className="text-xl font-bold text-primary-blue">
            أحمد الفرنواني
          </h2>
          <p className="my-4 text-[#777] font-semibold leading-5 sm:max-w-[425px] w-[93vw] sm:mx-0 mx-auto">
            مدرس الجيولوجيا للثانوية العامة و اللغات، حاصل
            علي بكالوريوس العلوم في الجيولوجيا من كلية
            العلوم، جامعة كفرالشيخ، دراسات عليا في جيولوجيا
            الصخور الرخوة و الحفريات.
          </p>
          <SocialMediaIcons />
        </div>
      </div>
    </section>
  )
}
export default About
