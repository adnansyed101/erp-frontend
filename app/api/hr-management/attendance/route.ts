import { prisma } from "@/lib/prisma";
import {
  Attendance,
  AttendanceWithEmployeeData,
} from "@/lib/types/attendance.type";
import { formatError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

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

    const dataCount = await prisma.attendance.count();

    return Response.json({
      success: false,
      data: attendances,
      totalPages: Math.ceil(dataCount / limit),
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
    const checkedInEmployee = await prisma.attendance.findFirst({
      where: {
        employeeId: attendance.employeeId,
        status: "In",
      },
    });

    if (checkedInEmployee) {
      return Response.json({
        success: false,
        data: null,
        message: "Employee already checked in.",
      });
    }

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

export async function PATCH(req: Request) {
  const attendance: AttendanceWithEmployeeData = await req.json();
  try {
    const updatedAttendance = await prisma.attendance.update({
      where: {
        id: attendance.id,
      },
      data: {
        checkOut: attendance.checkOut,
        status: attendance.status,
        // preferableOutTime: attendance.preferableOutTime,
      },
    });
    return Response.json({
      success: false,
      data: updatedAttendance,
      message: "Updated attendance.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}
