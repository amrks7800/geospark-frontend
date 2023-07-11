"use client"

import { ThemedInputProps } from "@/types"
import { Input } from "@chakra-ui/react"

const ThemedInput = ({
  icon,
  placeholder,
  name,
  type,
}: ThemedInputProps) => {
  return (
    <div className="w-fit relative my-3">
      <Input
        variant="flushed"
        className="bg-[#f6f6f6] text-[#777] sm:w-[350px] w-[230px] px-5 ps-8 text-lg"
        placeholder={placeholder}
        name={name}
        type={type ? type : "text"}
      />
      {icon}
    </div>
  )
}
export default ThemedInput
