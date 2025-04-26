"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SentimentEmoji({ sentiment, size = 64 }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getEmoji = () => {
    switch (sentiment) {
      case "positive":
        return "😄"
      case "negative":
        return "😔"
      case "neutral":
        return "😐"
      case "mixed":
        return "😕"
      default:
        return "🤔"
    }
  }

  const getColor = () => {
    switch (sentiment) {
      case "positive":
        return "#f6ffed"
      case "negative":
        return "#fff2f0"
      case "neutral":
        return "#e6f7ff"
      case "mixed":
        return "#fffbe6"
      default:
        return "#f5f5f5"
    }
  }

  const getBorderColor = () => {
    switch (sentiment) {
      case "positive":
        return "#b7eb8f"
      case "negative":
        return "#ffccc7"
      case "neutral":
        return "#91caff"
      case "mixed":
        return "#ffe58f"
      default:
        return "#d9d9d9"
    }
  }

  // Only render motion components on the client side
  if (!isClient) {
    return null
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="emoji-container"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: getColor(),
        border: `2px solid ${getBorderColor()}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: size * 0.6 }}>{getEmoji()}</span>
    </motion.div>
  )
}
