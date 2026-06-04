/**
 * Reads a required environment variable, throwing a descriptive error if it is missing.
 */
export function requireEnv(name: string): string {
  const envValue = process.env[name]
  if (!envValue) {
    throw new Error(`${name} is not set`)
  }
  return envValue
}
