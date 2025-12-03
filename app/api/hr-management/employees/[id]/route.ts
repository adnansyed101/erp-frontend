import { prisma } from "@/lib/prisma";
import { formatError } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
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

    return Response.json({
      success: true,
      data: employeeById,
      message: "Fetched employee by id.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}
