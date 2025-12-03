import { prisma } from "@/lib/prisma";
import { formatError } from "@/lib/utils";
import { Employee } from "@/lib/types/types";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        personalInformation: true,
      },
    });

    return Response.json({
      success: true,
      data: employees,
      message: "Fetched all employees.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}

export async function POST(req: Request, res: Response) {
  const data: Employee = await req.json();
  console.log("daat --> " + data);
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
    return Response.json({
      success: true,
      data: newEmployee,
      message: "Created an employee.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}
