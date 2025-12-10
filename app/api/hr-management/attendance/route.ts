import { prisma } from "@/lib/prisma";
import { Attendance } from "@/lib/types/attendance.type";
import { formatError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page"));

  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        employee: {
          include: {
            personalInformation: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    return Response.json({
      success: false,
      data: attendances,
      message: "Fetched all attendances.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}

export async function POST(req: Request) {
  const attendance: Attendance = await req.json();

  try {
    const newClockIn = await prisma.attendance.create({
      data: {
        employeeId: attendance.employeeId,
        checkIn: attendance.checkIn,
        status: attendance.status,
        preferableInTime: attendance.preferableInTime,
      },
    });

    return Response.json({
      success: false,
      data: newClockIn,
      message: "Created attendance.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}
