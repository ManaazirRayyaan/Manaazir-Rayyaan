import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(100),
  email: z.string().trim().email("Valid email is required."),
  message: z.string().trim().min(20, "Please share a few details about your project.").max(5000),
  website: z.string().optional().default(""),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const initialInquiryValues: InquiryFormValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function formatInquiryEmail(values: InquiryFormValues) {
  return `
New freelance inquiry

Name: ${values.name}
Email: ${values.email}

Project message:
${values.message}
`.trim();
}
