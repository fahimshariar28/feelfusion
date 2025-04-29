"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export function ConfettiEffect({ sentiment }) {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (sentiment === "positive") {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [sentiment])

  if (!isClient || !showConfetti) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.15}
      colors={["#1890ff", "#52c41a", "#722ed1", "#faad14", "#eb2f96"]}
    />
  )
}
