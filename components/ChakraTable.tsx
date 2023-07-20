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
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default ChakraTable
