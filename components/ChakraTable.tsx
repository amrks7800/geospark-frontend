"use client"

import { ReactNode } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"
import { Exam } from "@/types"
import { BiTrash } from "react-icons/bi"
import { useMutation } from "@tanstack/react-query"
import { deleteExam } from "@/utils"
import { toast } from "react-toastify"
import { usePathname } from "next/navigation"
import Link from "next/link"

type ChakraTableProps = {
  headers: (string | ReactNode)[]
} & {
  type: "exams"
  bodyItem: Exam[]
}

const ChakraTable = ({
  headers,
  type,
  bodyItem,
}: ChakraTableProps) => {
  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      toast("تم", {
        type: "success",
      })
    },
    onError: () => {
      toast("حاول مرة اخري", { type: "error" })
    },
  })

  const pathname = usePathname()

  return (
    <TableContainer
      border={"1px"}
      borderStyle={"solid"}
      borderColor={"#068FFF"}
      rounded={"lg"}
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {headers.map((header, i) => (
              <Th
                textColor={"#4E4FEB"}
                key={i}
                fontSize={"lg"}
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {bodyItem.map(exam => (
            <Tr key={exam.id}>
              <Td>
                <Link
                  href={`${pathname}/exams/${exam.id}`}
                  className="hover:underline"
                >
                  {exam.title}
                </Link>
              </Td>
              <Td>
                <BiTrash
                  size={25}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    deleteExamMutation.mutate(exam.id)
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default ChakraTable
