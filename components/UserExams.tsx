"use client"

import { getChapterExams } from "@/utils"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { BiChevronDown } from "react-icons/bi"

const UserExams = ({
  chapterId,
}: {
  chapterId: string
}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getChapterExams({ chapterId }),
    queryKey: ["exams"],
  })

  useEffect(() => {
    if (data?.exams.length === 0) {
      refetch()
    }
  }, [data?.exams])

  const pathname = usePathname()

  return (
    <div className="w-fit">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<BiChevronDown size={20} />}
              className="text-primary-blue"
            >
              الامتحانات
            </MenuButton>
            {!!data?.exams.length ? (
              <MenuList>
                {data?.exams &&
                  data.exams.map((exam, i) => (
                    <MenuItem
                      key={i}
                      _hover={{
                        backgroundColor:
                          "rgb(241, 245, 249)",
                      }}
                    >
                      <Link
                        href={`${pathname}/exams/${exam.id}`}
                      >
                        {exam.title}
                      </Link>
                    </MenuItem>
                  ))}
              </MenuList>
            ) : (
              <p>ليس هناك امتحانات ف الوقت الحالي</p>
            )}
          </>
        )}
      </Menu>
    </div>
  )
}
export default UserExams
