"use server";

import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";

export async function getEmployees() {
  const data = await prisma.employee.findMany({});

  return convertToPlainObject(data);
}
