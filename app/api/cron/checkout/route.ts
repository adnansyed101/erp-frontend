import { prisma } from "@/lib/prisma";
import { formatError } from "@/lib/utils";

export async function GET() {
  try {
    const updatedActiveUsers = await prisma.attendance.updateMany({
      where: {
        status: "In",
        checkOut: null,
      },
      data: {
        status: "Out",
        checkOut: new Date(),
      },
    });
    
    return Response.json({
      success: true,
      data: updatedActiveUsers,
      message: "Updated users who have not clocked out.",
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: [],
      message: formatError(error),
    });
  }
}
