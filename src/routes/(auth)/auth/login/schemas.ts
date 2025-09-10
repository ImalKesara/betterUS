import { z } from "zod";
 
// Define the signup schema using Zod
export const loginSchema = z.object({
   email: z.string().email("Please enter a valid email."),
   password: z.string().min(8, "Password must be at least 8 characters long."),
});