import { ButtonProps } from "@/types"

const Button = ({
  text,
  type,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`py-3 px-4 bg-primary-blue rounded-full text-white text-xl ${style} shadow-sm`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
export default Button
