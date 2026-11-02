"use client"

import { useNotification } from "../contexts/NotificationContext"

export default function Notification() {
  const { notification } = useNotification()

  if (!notification) return null

  return (
    <div
      role="alert"
      data-testid="notification"
      className={`fixed right-5 top-5 z-50 max-w-sm rounded-lg px-5 py-4 text-sm font-semibold text-white shadow-lg ${
        notification.type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {notification.message}
    </div>
  )
}
