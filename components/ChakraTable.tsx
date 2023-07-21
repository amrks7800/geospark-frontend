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
              <Td>{exam.title}</Td>
              <Td>
                <BiTrash size={25} color="red" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default ChakraTable
