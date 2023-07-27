"use client"

import { Table } from "@/components"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "@/utils"
import { Spinner } from "@chakra-ui/react"
import {
  MdDriveFileRenameOutline,
  MdOutlineAlternateEmail,
} from "react-icons/md"
import { BsFillGeoFill } from "react-icons/bs"
import ChakraTable from "@/components/ChakraTable"

export default function Page() {
  const { data, error, isLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["user"],
  })

  if (data) {
    return (
      <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
        <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto">
          <div className="w-fit">
            <Table
              headers={[
                <div className="flex items-center gap-1">
                  <MdDriveFileRenameOutline size={25} />
                  الاسم
                </div>,
                <div className="flex items-center gap-1">
                  <MdOutlineAlternateEmail size={25} />
                  البريد الالكتروني
                </div>,
                <div className="flex items-center gap-1">
                  <BsFillGeoFill size={25} />
                  الحالة
                </div>,
              ]}
              items={data?.users}
              type="users"
            />
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="1.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }
}
