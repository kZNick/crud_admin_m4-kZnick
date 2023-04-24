import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  admin: z.boolean().optional(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
});

const createUserPatchSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  admin: z.boolean().optional(),
});

export { createUserSchema,createUserPatchSchema };
