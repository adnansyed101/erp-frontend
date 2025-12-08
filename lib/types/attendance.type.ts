import z from "zod";
import { AttendanceSchema } from "../validators/attendance.schema";

export type Attendance = z.infer<typeof AttendanceSchema>;
