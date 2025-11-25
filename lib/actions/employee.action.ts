"use server";

import z from "zod";
import { prisma } from "../prisma";
import { convertToPlainObject, formatError } from "../utils";
import { EmployeeSchema } from "../validators/employee.validator";

// Get all employees.
export async function getEmployees() {
  const data = await prisma.employee.findMany({});

  return convertToPlainObject(data);
}

// Create new employee
export async function createEmployee(data: z.infer<typeof EmployeeSchema>) {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        ...data,
        presentAddress: {
          create: {
            ...data.presentAddress,
          },
        },
        permanentAddress: {
          create: {
            ...data.permanentAddress,
          },
        },
        spouseInformation: {
          create: {
            ...data.spouseInformation,
          },
        },
        emergencyContact: {
          create: {
            ...data.emergencyContact,
          },
        },
        additionalInformation: {
          create: {
            ...data.additionalInformation,
          },
        },
      },
    });
    return convertToPlainObject(newEmployee);
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
