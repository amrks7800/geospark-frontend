"use client"

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from "@chakra-ui/react"
import { default as CustomButton } from "./Button"
import { useRef } from "react"
import { toast } from "react-toastify"

type DrawerProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  withButton: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function SubscriptionDrawer({
  isOpen,
  onOpen,
  onClose,
  withButton,
  hidden,
}: DrawerProps) {
  const phoneRef = useRef<HTMLSpanElement>(null)
  return (
    <div className="w-fit" hidden={hidden}>
      {withButton && (
        <CustomButton
          text="اشترك"
          style="font-bold px-5 py-4 rounded-lg w-[150px]"
          onClick={onOpen}
        />
      )}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex items-center gap-5 height-24 border-b border-solid border-[#777]">
            <DrawerCloseButton className="static" />
            <DrawerHeader
              className=" text-primary-blue flex-1"
              dir="rtl"
            >
              اشترك معنا
            </DrawerHeader>
          </div>

          <DrawerBody>
            <p className="text-[#2F2D51] text-xl leading-10 font-semibold">
              للأشتراك في المنصة ابعت 60 جنية فقط عن طريق
              فودافون كاش ع الرقم ده{" "}
              <span
                className="text-primary-blue font-bold"
                ref={phoneRef}
              >
                01004499596
              </span>{" "}
              <button
                className="p-2 bg-indigo-700 text-white mx-2 rounded-lg"
                onClick={() => {
                  if (
                    phoneRef.current &&
                    phoneRef.current?.textContent
                  ) {
                    navigator.clipboard
                      .writeText(
                        phoneRef.current?.textContent
                      )
                      .then(() =>
                        toast("تم نسخ الرقم", {
                          type: "success",
                        })
                      )
                  }
                }}
              >
                نسخ الرقم
              </button>
              بعد متبعت المبلغ خد اسكرين شوت بصوره التحويل
              وإبعتها للمستر وهيديك صلاحيه تستعمل المنصه لكل
              الصفوف لمده 30يوم فقط من بداية إرسالك للاشتراك
              يرجى تسجيل الدخول أولا قبل الدفع ...
            </p>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              className="block w-fit mx-auto"
              mr={3}
              onClick={onClose}
            >
              تمام
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
