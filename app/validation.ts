// app/validation.ts file 
import { Status } from "@prisma/client";
import {z} from 'zod'

export const IssueSchema = z.object({
  id:z.string().optional(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  status : z.enum(Object.values(Status) as [Status])
});


export type IssueFormType = z.infer<typeof IssueSchema>;