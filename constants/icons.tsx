import { BiBadgeCheck } from "react-icons/bi"
import {
  FaChalkboardTeacher,
  FaMicroscope,
} from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi"
import { VscVmActive } from "react-icons/vsc"

export const dashboardIcons = [
  <FaChalkboardTeacher size={25} />,
  <PiStudentFill size={25} />,
]

export const skillsIcon = [
  <VscVmActive
    size={55}
    className="mx-auto"
    color={"#4E4FEB"}
  />,
  <BiBadgeCheck
    size={55}
    className="mx-auto"
    color={"#4E4FEB"}
  />,
  <FaMicroscope
    size={55}
    className="mx-auto"
    color={"#4E4FEB"}
  />,
]
