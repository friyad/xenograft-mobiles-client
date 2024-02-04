import { z } from "zod";

export const smartPhoneValidation = z
  .object({
    name: z
      .string()
      .min(10, "Must be at least 10 characters")
      .max(100, "Can't be more than 100 characters")
      .trim(),
    price: z.coerce.number().min(1),
    quantity: z.coerce.number().min(0),
    images: z.array(z.string().trim(), {
      required_error: "Please upload your images",
    }),
    releasedDate: z.string(),
    brand: z.string().min(2, "Must be at least 2 characters").trim(),
    model: z.string().min(2, "Must be at least 2 characters").trim(),
    opSystem: z.string().min(2, "Must be at least 2 characters").trim(),
    storageCapacityGB: z.coerce.number().min(1),
    storageCapacityGB2: z.coerce.number().optional(),
    ram: z.coerce.number().min(1),
    ram2: z.coerce.number().optional(),
    processor: z.string().min(2, "Must be at least 2 characters").trim(),
    screenSize: z.coerce.number().min(1),
    color: z.string().min(2, "Must be at least 2 characters").trim(),
    cellularTechnology: z
      .string()
      .min(2, "Must be at least 2 characters")
      .trim(),
    battery: z.coerce.number().min(1),
    simCard: z.string().min(2, "Must be at least 2 characters").trim(),
    camera: z.coerce.number().min(1),
    camera2: z.coerce.number().optional(),
    charger: z.coerce.number().min(1),
    usbType: z.string().min(2, "Must be at least 2 characters").trim(),
    aboutThisPhone: z.string().min(30, "Must be at least 30 characters"),
    condition: z
      .string()
      .min(2, "Must be at least 2 characters")
      .includes("New")
      .or(z.string().includes("Used")),
    // rating: z.coerce.number().min(1).optional(),
    // sells: z.coerce.number().min(1).optional(),
    // inStock: z.boolean().optional(),
  })
  .required();
