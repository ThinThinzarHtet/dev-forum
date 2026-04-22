import * as z from "zod";

export const postBaseSchema = {
  title: z.string().min(3).max(255),
  body: z.string().min(3),
};
