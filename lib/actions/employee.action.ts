"use server";

import { prisma } from "../prisma";
import { convertToPlainObject, formatError } from "../utils";
import { Employee } from "../types/types";

// Get all employees.
export async function getEmployees() {
  const data = await prisma.employee.findMany({
    include: {
      personalInformation: true,
    },
  });

  return convertToPlainObject(data);
}

// Create new employee
export async function createEmployee(data: Employee) {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        personalInformation: {
          create: {
            ...data.personalInformation,
          },
        },
        additionalInformation: {
          create: {
            ...data.additionalInformation,
          },
        },
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
        bankInformation: {
          create: {
            ...data.bankInformation,
          },
        },
      },
    });
    return convertToPlainObject(newEmployee);
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getEmployeeById(id: string) {
  const employeeById = await prisma.employee.findFirst({
    where: { id: id },
    include: {
      personalInformation: true,
      presentAddress: true,
      permanentAddress: true,
      spouseInformation: true,
      emergencyContact: true,
      additionalInformation: true,
      bankInformation: true,
    },
  });
 
  return convertToPlainObject(employeeById)
}
