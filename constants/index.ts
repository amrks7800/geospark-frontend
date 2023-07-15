import { FaChalkboardTeacher } from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi"

export const studentsNavLink = {
  links: [
    {
      href: "/dashboard/users/",
      id: 1,
      title: "كورساتي",
    },
  ],
  activeIdx: 1,
}

export const teachersNavLink = {
  links: [
    {
      href: "/dashboard/teachers/",
      active: true,
      id: 1,
      title: "كورساتي",
    },
    {
      href: "/dashboard/teachers/my-students",
      active: false,
      id: 2,
      title: "الطلاب",
    },
  ],
  activeIdx: 1,
}

export const skillsContent = [
  {
    id: 1,
    title: "تعليم تفاعلي",
    text: "أحصل علي تجربة تعليمية فريدة و تقييمية.",
  },
  {
    id: 2,
    title: "إختبارات دائمة",
    text: "أسئلة متعددة و  متنوعة تقيس مدي فهم الطالب",
  },
  {
    id: 3,
    title: "مراقبة مستمرة",
    text: "يتم تقييمك بشكل مستمر من خلال مدرس المادة",
  },
]
