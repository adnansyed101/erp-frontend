import z from "zod";

export const AttendanceSchema = z.object({
  checkIn: z.date().default(new Date()),
  checkOut: z.date().nullable(),
  status: z.enum(["In", "Out"]),
  employeeId: z.string(),
});
