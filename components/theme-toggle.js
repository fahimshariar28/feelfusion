"use client"

import { Button } from "antd"
import { BulbOutlined, BulbFilled } from "@ant-design/icons"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type="default"
      shape="circle"
      icon={theme === "dark" ? <BulbOutlined /> : <BulbFilled />}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    />
  )
}
