"use client"

import { Button, Tooltip } from "antd"
import { SoundOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

export function TextToSpeech({ text, sentiment }) {
  const [speaking, setSpeaking] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const speak = () => {
    if (!isClient || !text || !sentiment) return

    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance()
      utterance.text = `The sentiment is ${sentiment}. ${text}`

      // Adjust pitch based on sentiment
      switch (sentiment) {
        case "positive":
          utterance.pitch = 1.2
          break
        case "negative":
          utterance.pitch = 0.8
          break
        default:
          utterance.pitch = 1.0
      }

      setSpeaking(true)

      utterance.onend = () => {
        setSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <Tooltip title="Read text aloud">
      <Button
        type={speaking ? "primary" : "default"}
        shape="circle"
        icon={<SoundOutlined />}
        onClick={speak}
        loading={speaking}
      />
    </Tooltip>
  )
}
