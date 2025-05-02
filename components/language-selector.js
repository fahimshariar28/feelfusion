"use client"

import { Select } from "antd"
import { GlobalOutlined } from "@ant-design/icons"

const { Option } = Select

export function LanguageSelector({ language, onLanguageChange }) {
  // Define languages with their native names
  const languages = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "bn", name: "বাংলা", dir: "ltr" },
    { code: "hi", name: "हिन्दी", dir: "ltr" },
  ]

  const handleChange = (value) => {
    // Get the selected language direction
    const selectedLang = languages.find((lang) => lang.code === value)

    // Update document direction for RTL languages
    if (selectedLang.dir === "rtl") {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }

    onLanguageChange(value)
  }

  return (
    <Select defaultValue={language} style={{ width: 120 }} onChange={handleChange} suffixIcon={<GlobalOutlined />}>
      {languages.map((lang) => (
        <Option key={lang.code} value={lang.code}>
          {lang.name}
        </Option>
      ))}
    </Select>
  )
}
