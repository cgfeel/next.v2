import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(4).max(16),
    email: z.string().email(),
    zipcode: z.coerce.number().min(100000).max(999999),
    subcribe: z.coerce.boolean().optional(),
});