import { SkillProps } from "@/types"
import { skillsContent } from "@/constants"
import Image from "next/image"
import { skillsIcon } from "@/constants/icons"

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen py-20 relative"
    >
      <h1 className="w-fit mx-auto mb-10 font-bold text-primary-blue text-2xl">
        ما نقدمه للطلاب
      </h1>
      <div className="container mx-auto flex items-center justify-center gap-8 flex-wrap">
        {skillsContent.map((item, i) => (
          <Skill
            {...item}
            icon={skillsIcon[i]}
            key={item.id}
          />
        ))}
      </div>
      <Image
        src="/wave.svg"
        alt="wave"
        width={1366}
        height={300}
        className="absolute w-full z-10 bottom-0"
      />
    </section>
  )
}

const Skill = ({ title, text, icon }: SkillProps) => {
  return (
    <div className="skill w-[250px] text-center">
      {icon}
      <h2 className="text-primary-blue text-xl my-4">
        {title}
      </h2>
      <p className="text-[#777] font-bold">{text}</p>
    </div>
  )
}

export default Skills
