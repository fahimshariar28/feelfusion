"use client"

import { Button, Space } from "antd"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function TextSuggestions({ onSelectSuggestion, language }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const suggestions = {
    en: [
      "I'm having a wonderful day!",
      "This product is disappointing.",
      "The weather is okay today.",
      "I'm extremely happy with the service!",
      "I'm feeling quite frustrated right now.",
    ],
    bn: [
      "আমার দিনটা খুব ভালো যাচ্ছে!",
      "এই পণ্যটি হতাশাজনক।",
      "আজকের আবহাওয়া ঠিকঠাক আছে।",
      "আমি সেবা নিয়ে অত্যন্ত খুশি!",
      "আমি এখন বেশ হতাশ বোধ করছি।",
    ],
    hi: [
      "मेरा दिन बहुत अच्छा जा रहा है!",
      "यह उत्पाद निराशाजनक है।",
      "आज का मौसम ठीक है।",
      "मैं सेवा से बहुत खुश हूँ!",
      "मैं अभी काफी निराश महसूस कर रहा हूँ।",
    ],
  }

  const currentSuggestions = suggestions[language] || suggestions.en

  // Only render motion components on the client side
  if (!isClient) {
    return null
  }

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-sm text-gray-500 mb-2">Try these examples:</p>
      <Space wrap>
        {currentSuggestions.map((suggestion, index) => (
          <Button key={index} size="small" onClick={() => onSelectSuggestion(suggestion)}>
            {suggestion.length > 25 ? suggestion.substring(0, 25) + "..." : suggestion}
          </Button>
        ))}
      </Space>
    </motion.div>
  )
}
