import { Inter } from "next/font/google"
import "./globals.css"
import { ConfigProvider } from "antd"
import ThemeProvider from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FeelFusion: Emotion and Sentiment Detector",
  description: "Analyze text sentiment with FeelFusion",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ConfigProvider>{children}</ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
