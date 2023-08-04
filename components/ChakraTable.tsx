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
import { Exam, Result } from "@/types"
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
} & (
  | {
      type: "exams"
      bodyItem: Exam[]
    }
  | {
      type: "results"
      bodyItem: Result[]
    }
)

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
          {type === "exams" ? (
            <Tbody>
              {bodyItem.map((item, i) => (
                <Tr key={item.id}>
                  <Td>
                    <Link
                      href={`${pathname}/exams/${item.id}`}
                      className="hover:underline"
                    >
                      {item.title}
                    </Link>
                  </Td>
                  <Td>{i + 1}</Td>
                  <Td>
                    <BiTrash
                      size={25}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => {
                        deleteExamMutation.mutate(item.id)
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              {bodyItem.map((item, i) => (
                <Tr key={item.id}>
                  <Td>{item.exam_title}</Td>

                  <Td>{item.user_score}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    )
  } else {
    return <h1>ليس هناك امتحانات مدرجة بعد</h1>
  }
}
export default ChakraTable
