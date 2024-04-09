import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username mustbe atleast 3 characters long." }),
  email: z
    .string()
    .email("Enter a valid Email !!")
    .min(3, { message: "This field has to be filled." }),

  password: z
  .string()
  .min(6, { message: "please make a strong password, More than 6 chars!" }),
});
