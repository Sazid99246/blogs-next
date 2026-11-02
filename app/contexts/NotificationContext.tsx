
"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

type NotificationType = "success" | "error"

type Notification = {
  message: string
  type: NotificationType
}

type NotificationContextType = {
  notification: Notification | null
  showNotification: (
    message: string,
    type: NotificationType
  ) => void
}

const NotificationContext =
  createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [notification, setNotification] =
    useState<Notification | null>(null)

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotification({ message, type })
    },
    []
  )

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      setNotification(null)
    }, 4000)

    return () => clearTimeout(timer)
  }, [notification])

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification }}
    >
      {children}

      {notification && (
        <div
          role="alert"
          className={`fixed right-5 top-5 z-50 max-w-sm rounded-lg px-5 py-4 text-sm font-semibold text-white shadow-lg ${
            notification.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      "useNotification must be used within NotificationProvider"
    )
  }

  return context
}
