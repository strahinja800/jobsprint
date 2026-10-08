import z from 'zod'

export const APPLICATION_STATUSES = [
  'saved',
  'applied',
  'interview',
  'offer',
  'rejected',
] as const

export const applicationStatusSchema = z.enum(APPLICATION_STATUSES)

export const jobApplicationSchema = z.object({
  id: z.uuid(),
  company: z.string().trim().min(1, 'Enter a company name'),
  position: z.string().trim().min(1, 'Enter a position name'),
  url: z
    .url('Enter a valid URL starting with https://')
    .trim()
    .refine(val => val.startsWith('https://'), {
      message: 'URL must start with https://',
    }),
  status: applicationStatusSchema,
  nextStep: z.string().trim().min(1, 'Enter a next step'),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type JobApplication = z.infer<typeof jobApplicationSchema>
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>

export const jobApplicationFormSchema = jobApplicationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type JobApplicationFormValues = z.infer<typeof jobApplicationFormSchema>

export const jobApplicationArraySchema = z.array(jobApplicationFormSchema)
