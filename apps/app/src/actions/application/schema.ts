import { z } from "zod";

export const createApplicationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

export const getApplicationSchema = z.object({
  appId: z.string(),
});