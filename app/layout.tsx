
import "./globals.css"

import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./contexts/NotificationContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <AuthSessionProvider>
            <NavBar />
            {children}
          </AuthSessionProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
