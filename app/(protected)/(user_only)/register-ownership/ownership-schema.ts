import * as z from "zod";

const RegisterOwnershipSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.email("Invalid email address"),
  panNumber: z
    .string()
    .min(10, "PAN Number must be 10 characters")
    .max(10, "PAN Number must be 10 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address is too long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
});

export type RegisterOwnershipSchema = z.infer<typeof RegisterOwnershipSchema>;

export { RegisterOwnershipSchema };
