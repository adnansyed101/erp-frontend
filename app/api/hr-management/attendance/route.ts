import { prisma } from "@/lib/prisma";
import { formatError } from "@/lib/utils";

export async function POST(req: Request) {
  const { employeeId }: { employeeId: string } = await req.json();

  console.log(employeeId);

  try {
    const newClockIn = await prisma.attendance.create({
      data: {
        employeeId: employeeId,
        checkIn: new Date(),
        status: "In",
      },
    });

    return Response.json({
      success: false,
      data: newClockIn,
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
