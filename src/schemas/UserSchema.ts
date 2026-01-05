import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
});

export const LoginSchema = z.object({
  email: z.email("Formato de e-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const UserResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
});

// Tipos TypeScript gerados automaticamente
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
export type UserResponse = z.infer<typeof UserResponse>;
