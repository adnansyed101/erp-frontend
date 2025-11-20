import z from "zod";

// The Employee Validation is exported at the bottom.

const EmployeePersonalInformationSchema = z.object({
  fullName: z.string().min(2, "At least 2 characters are needed."),
  imageUrl: z.string().min(2, "At least 2 characters are needed."),
  officeEmail: z.email(),
  personalEmail: z.email(),
  personalNumber: z.string().min(2, "Personal Phone Number is required."),
  officeNumber: z.string().min(2, "Office Phone Number is required."),
  employeeType: z.string().min(2, "Employee Type is required"),
  employeeStatus: z.string().min(2, "Employee Status is required"),
  nationality: z.string().min(2, "Nationality is required."),
  disability: z.boolean(),
  gender: z.enum(["Male", "Female", "Other"]),
  religion: z.string().min(1, "Religion status is required."),
  joiningDesignation: z.string().min(1, "Joining Designation is required."),
  currentDesignation: z.string().min(1, "Current Designation is required"),
  dateOfBirth: z.date(),
  dateOfConfirmation: z.date(),
  fatherName: z.string().optional().default("n/a"),
  motherName: z.string().optional().default("n/a"),
  nationalId: z.string().optional().default("n/a"),
  placeOfBirth: z.string().optional().default("n/a"),
  maritalStatus: z
    .enum(["Single", "Married", "Divorced", "Widowed", "Separated"])
    .optional()
    .default("Single"),
  eTIN: z.string().optional().default("n/a"),
  program: z.string().optional().default("n/a"),
  unit: z.string().optional().default("n/a"),
  prlDate: z.date().optional().default(new Date()),
  dateofRegularity: z.date().optional().default(new Date()),
});

const AddressSchema = z.object({
  division: z.string().min(1, "Division is required."),
  district: z.string().min(1, "District is required."),
  upazilaOrThana: z.string().min(1, "Upazila is required"),
  postOffice: z.string().min(1, "Post Office is required."),
  postCode: z.string().min(1, "Post Code is required."),
  houseNoOrVillage: z.string().min(1, "House No./Village is required."),
  block: z.string().min(1, "Block is required."),
  roadNo: z.string().optional(),
});

const ContactInformationSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  occupation: z.string(),
  nid: z.string(),
  mobileNumber: z.string(),
  email: z.email(),
});

const BankInformationSchema = z.object({
  bankName: z.string().min(1, "Bank name is required."),
  branchName: z.string().min(1, "Branch name is required."),
  accountNumber: z.string().min(1, "Bank Account Number is required."),
  walletType: z.string().optional().default("n/a"),
  walletNumber: z.string().optional().default("n/a"),
});

export const EmployeeSchema = z.object({
  id: z.string().optional(),
  ...EmployeePersonalInformationSchema.shape,
  ...BankInformationSchema.shape,
  spouseInformation: ContactInformationSchema.optional(),
  emergencyContact: ContactInformationSchema,
  presentAddress: AddressSchema,
  permanentAddress: AddressSchema,
});
