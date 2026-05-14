import { z } from 'zod'

// branded type for validated email addresses — distinguishes a validated email from a raw string
export type Email = string & { readonly _brand: 'Email' }

export const emailSchema = z.email('Invalid email address').transform((value) => value as Email)

export const userTypeSchema = z.enum(['job_seeker', 'founder', 'investor'])
export type UserType = z.infer<typeof userTypeSchema>

export const waitlistRequestSchema = z.object({
  email: emailSchema,
  userTypes: z.array(userTypeSchema).min(1).max(3).optional(),
  turnstileToken: z.string().optional(),
})
export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>

// discriminated union matching the actual API response shapes
export type WaitlistApiResponse = { success: true } | { error: string }
