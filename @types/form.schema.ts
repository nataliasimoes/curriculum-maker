export const generalDataSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(16).max(100),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string().min(1),
  summary: z.string().min(1).max(350),
  image: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024)
    .refine(
      (file: File) => file.type === "image/png" || file.type === "image/jpeg"
    )
    .optional(),
});

export type GeneralData = Zod.input<typeof generalDataSchema>;

export const qualificationSchema = z.object({
  item: z.object({
    institution: z.string(),
    description: z.string(),
    workload: z.string(),
  }),
});

export type Qualification = Zod.input<typeof qualificationSchema>;

export const experiencesSchema = z.object({
  item: z.object({
    institution: z.string(),
    function: z.string(),
    period: z.string(),
  }),
});

export type Experience = Zod.input<typeof experiencesSchema>;

export const academicSchema = z.object({
  item: z.object({
    institution: z.string(),
    description: z.string(),
    startYear: z.string().min(4).max(4),
    endYear: z.string().min(4).max(4).optional(),
  }),
});

export type Academic = Zod.input<typeof academicSchema>;
