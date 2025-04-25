// Environment variable validation and access
export const env = {
  TEXT_API_KEY: process.env.TEXT_API_KEY,
  TEXT_ENDPOINT: process.env.TEXT_ENDPOINT,
}

export function validateEnv() {
  if (!env.TEXT_API_KEY || !env.TEXT_ENDPOINT) {
    throw new Error("Missing required environment variables: TEXT_API_KEY and TEXT_ENDPOINT must be defined")
  }
}
