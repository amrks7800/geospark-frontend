"use client"

import { useState, useEffect } from "react"
import { CellProps, TableProps, User } from "@/types"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { changeUserActiveState, deleteUser } from "@/utils"
import { BiTrash } from "react-icons/bi"
import { toast } from "react-toastify"

const Table = ({ headers, users }: TableProps) => {
  return (
    <table className="border border-primary-blue border-spacing-0 me-6 mb-10">
      <thead>
        <tr>
          {headers.map((label, i) => (
            <HeadCell key={i}>{label}</HeadCell>
          ))}
          <HeadCell>
            <div className="flex items-center justify-between">
              <p className="text-primary-blue">تنشيط</p>
              <p className="text-red-600">حذف</p>
            </div>
          </HeadCell>
        </tr>
      </thead>
      <tbody>
        {users?.map(user => (
          <Tr user={user} key={user.id} />
        ))}
      </tbody>
    </table>
  )
}

const HeadCell = ({ children, isEmpty }: CellProps) => {
  return (
    <td
      className={`border border-primary-blue ${
        isEmpty ? "w-14" : "w-[160px]"
      } h-14 ps-2 bg-slate-100 text-primary-blue text-xl`}
    >
      {children}
    </td>
  )
}
const BodyCell = ({ children, isEmpty }: CellProps) => {
  return (
    <td
      className={`border border-primary-blue ${
        isEmpty ? "w-14" : "w-[160px]"
      } h-14 ps-2 bg-white text-gray-600 text-lg`}
    >
      {children}
    </td>
  )
}

const Tr = ({ user }: { user: User }) => {
  const [checked, setChecked] = useState(!!user.subscribed)
  const queryClient = useQueryClient()

  const editMutation = useMutation({
    mutationFn: changeUserActiveState,
    onSuccess: data => {
      queryClient.invalidateQueries(["user"])

      if (data.message.includes("deactivated")) {
        setChecked(false)
      } else {
        setChecked(true)
      }
    },
    onError: (err: { message: string }) => {
      toast(err?.message, { type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      queryClient.invalidateQueries(["user"])

      toast("تم الحذف", {
        type: "success",
      })
    },
    onError: err => {},
  })

  useEffect(() => {
    editMutation.mutate({
      activate: checked,
      id: user.id!,
    })
  }, [checked])
  return (
    <tr>
      <BodyCell>{`${user.firstName} ${user.lastName}`}</BodyCell>
      <BodyCell>{user.email}</BodyCell>
      <BodyCell>
        {user.subscribed ? "مشترك" : "غير مشترك"}
      </BodyCell>
      <BodyCell isEmpty>
        <div className="flex justify-between items-center">
          <input
            type="checkbox"
            className="w-5 aspect-square accent-secondary-blue"
            checked={checked}
            onClick={() => setChecked(prev => !prev)}
          />
          <BiTrash
            color="red"
            size={25}
            className="cursor-pointer"
            onClick={() => deleteMutation.mutate(user?.id!)}
          />
        </div>
      </BodyCell>
    </tr>
  )
}

export default Table
