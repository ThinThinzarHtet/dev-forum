import { postBaseSchema } from "./postBase";
import * as z from "zod";

export const postUpdateSchema = z.object({
  id: z.string(),
  ...postBaseSchema,
});
