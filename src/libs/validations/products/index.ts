import { z } from "zod";

export const VSProducts = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  desc: z.string({ required_error: "Description is required" }),
  category: z.string({ required_error: "Category is required" }),
  price: z.string({ required_error: "Price is required" }),
  stock: z.string({ required_error: "Stock is required" }),
  image: z.string().optional(),
});
