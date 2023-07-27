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
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
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
  const queryClient = useQueryClient()

  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries(["exams"])
      toast("تم", {
        type: "success",
      })
    },
    onError: () => {
      toast("حاول مرة اخري", { type: "error" })
    },
  })

  const pathname = usePathname()

  if (bodyItem.length) {
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
            {bodyItem.map((exam, i) => (
              <Tr key={exam.id}>
                <Td>
                  <Link
                    href={`${pathname}/exams/${exam.id}`}
                    className="hover:underline"
                  >
                    {exam.title}
                  </Link>
                </Td>
                <Td>{i + 1}</Td>
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
  } else {
    return <h1>ليس هناك امتحانات مدرجة بعد</h1>
  }
}
export default ChakraTable
