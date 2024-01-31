import { z } from "zod";

export const smartPhoneValidation = z
  .object({
    name: z
      .string()
      .min(10, "Must be at least 10 characters")
      .max(200, "Can't be more than 200 characters")
      .trim(),
    price: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1),
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

// export const smartPhoneValidation = z
//   .object({
//     name: z.string().max(200, "Name can't be more than 200 characters").trim(),
//     price: z.number(),
//     quantity: z.number(),
//     images: z.array(z.string().trim()),
//     releasedDate: z.string(),
//     brand: z.string().trim(),
//     model: z.string().trim(),
//     opSystem: z.string().trim(),
//     storageCapacityGB: z.array(z.number()),
//     ram: z.array(z.number()),
//     processor: z.string().trim(),
//     screenSize: z.number(),
//     color: z.string().trim(),
//     cellularTechnology: z.string().trim(),
//     battery: z.number(),
//     simCard: z.string().trim(),
//     camera: z.array(z.number()),
//     charger: z.number(),
//     usbType: z.string().trim(),
//     aboutThisPhone: z.string(),
//     condition: z.string().includes("New").includes("Used").trim(),
//     rating: z.number(),
//     sells: z.number(),
//     inStock: z.boolean(),
//   })
//   .required();
