import { LucideIcon } from "lucide-react";
import z from "zod";
import { EmployeeSchema } from "../validators/employee.validator";

export type Links = {
  label: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}[];

export type Employee = z.infer<typeof EmployeeSchema>;
