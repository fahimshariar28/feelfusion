"use server"

import { revalidatePath } from "next/cache"
import { env, validateEnv } from "./env"

export async function analyzeSentiment(text, language = "en") {
  try {
    validateEnv()

    // Map language codes to what Azure Text Analytics supports
    const languageCode =
      language === "en"
        ? "en"

    const response = await fetch(`${env.TEXT_ENDPOINT}/text/analytics/v3.0/sentiment`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": env.TEXT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documents: [
          {
            id: "1",
            language: languageCode,
            text: text,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Revalidate the path to ensure fresh data
    revalidatePath("/")

    return {
      sentiment: data.documents[0].sentiment,
      scores: {
        positive: data.documents[0].confidenceScores.positive,
        neutral: data.documents[0].confidenceScores.neutral,
        negative: data.documents[0].confidenceScores.negative,
      },
    }
  } catch (error) {
    console.error("Error in analyzeSentiment:", error)
    throw error
  }
}
