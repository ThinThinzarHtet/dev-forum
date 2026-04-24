import z from "zod";
import { postBaseSchema } from "./postBase";

export const postCreateSchema = z.object({
  ...postBaseSchema,
});
