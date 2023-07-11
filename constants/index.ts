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

// export const teacherIcons = [
//   <FaChalkboardTeacher size={25} />,
//   <PiStudentFill size={25} />,
// ]

// export const studentsIcons = [
//   <FaChalkboardTeacher size={25} />,
// ]
