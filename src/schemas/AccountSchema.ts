import { z } from "zod";

export const CreateAccountSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  bank: z.string().optional(),
  balance: z.number().optional(),
  userId: z.string(),
});

export const UpdateAccountSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  bank: z
    .string()
    .min(3, "O banco deve ter pelo menos 3 caracteres")
    .optional(),
  balance: z.number().optional(),
  userId: z.string().optional(),
});

export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof UpdateAccountSchema>;
