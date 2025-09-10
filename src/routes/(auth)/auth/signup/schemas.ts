import { z } from "zod";
 
// Define the signup schema using Zod
export const signupSchema = z.object({
	name: z.string().min(4, "Name must be at least 4 characters long."),
   email: z.string().email("Please enter a valid email."),
   password: z.string().min(8, "Password must be at least 8 characters long."),
});