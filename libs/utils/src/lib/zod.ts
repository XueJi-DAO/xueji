import { z, object, string } from "zod"

export const SignInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

// signInSchema.parse({ email: "Ludwig" });

// extract the inferred type
export type SignIn = z.infer<typeof SignInSchema>;


// https://zod.dev/?id=basic-usage
// // creating a schema for strings
// const mySchema = z.string();

// // parsing
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError

// // "safe" parsing (doesn't throw error if validation fails)
// mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
// mySchema.safeParse(12); // => { success: false; error: ZodError }
