import { SidebarSwitchProps } from "@/types"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const SidebarSwitch = ({
  isOpen,
  setIsOpen,
}: SidebarSwitchProps) => {
  return (
    <div
      className="md:hidden absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-solid border-primary-blue
    flex items-center justify-end bg-white right-[85%] -z-10 cursor-pointer"
      onClick={() => setIsOpen(prev => !prev)}
    >
      {isOpen ? (
        <FaAngleRight size={20} color={"#4E4FEB"} />
      ) : (
        <FaAngleLeft size={20} color={"#4E4FEB"} />
      )}
    </div>
  )
}
export default SidebarSwitch
