"use client"

import { useState, useEffect } from "react"
import { CellProps, TableProps, User, Video } from "@/types"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import {
  changeUserActiveState,
  deleteUser,
  deleteVideoById,
} from "@/utils"
import { BiTrash } from "react-icons/bi"
import { toast } from "react-toastify"

const Table = ({ headers, items, type }: TableProps) => {
  return (
    <table className="border border-primary-blue border-spacing-0 rounded-lg">
      <thead>
        <tr>
          {headers.map((label, i) => (
            <HeadCell key={i}>{label}</HeadCell>
          ))}
          {type === "users" ? (
            <HeadCell>
              <div className="flex items-center justify-between">
                <p className="text-primary-blue">تنشيط</p>
                <p className="text-red-600">حذف</p>
              </div>
            </HeadCell>
          ) : (
            <HeadCell>
              <p className="text-red-600">حذف</p>
            </HeadCell>
          )}
        </tr>
      </thead>
      <tbody>
        {type === "users"
          ? items?.map(item => (
              <UserTr user={item} key={item.id} />
            ))
          : items?.map(item => (
              <VideoTr video={item} key={item.id} />
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

const UserTr = ({ user }: { user: any }) => {
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
            onChange={() => {}}
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

const VideoTr = ({ video }: { video: any }) => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteVideoById,
    onSuccess() {
      toast("تم الحذف", { type: "success" })
      queryClient.invalidateQueries(["video"])
    },
  })
  return (
    <tr>
      <BodyCell>{video.title}</BodyCell>
      <BodyCell>
        <a
          href={video.url.replace("embed", "watch")}
          className="text-primary-blue text-xl no-underline hover:underline"
        >
          شاهد
        </a>
      </BodyCell>
      <BodyCell isEmpty>
        <div className="flex justify-between items-center">
          <BiTrash
            color="red"
            size={25}
            className="cursor-pointer"
            onClick={() => {
              if (video.id) {
                deleteMutation.mutate(video?.id)
              }
            }}
          />
        </div>
      </BodyCell>
    </tr>
  )
}

export default Table
