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
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  nationalId: z.string().optional(),
  placeOfBirth: z.string().optional(),
  maritalStatus: z
    .enum(["Single", "Married", "Divorced", "Widowed", "Separated"])
    .optional(),
  eTIN: z.string().optional(),
  program: z.string().optional(),
  unit: z.string().optional(),
  prlDate: z.date().optional(),
  dateofRegularity: z.string().optional(),
});

const PresentAddressSchema = z.object({
  division: z.string().min(1, "Division is required."),
  district: z.string().min(1, "District is required."),
  upazilaOrThana: z.string().min(1, "Upazila is required"),
  postOffice: z.string().min(1, "Post Office is required."),
  postCode: z.string().min(1, "Post Code is required."),
  block: z.string().min(1, "Block is required.").optional(),
  houseNoOrVillage: z.string().min(1, "House No./Village is required."),
  roadNo: z.string().optional(),
});

const PermanentAddressSchema = PresentAddressSchema;

const SpouseInformationSchema = z
  .object({
    fullName: z.string(),
    dateOfBirth: z.date(),
    gender: z.string(),
    occupation: z.string(),
    nid: z.string(),
    mobileNumber: z.string(),
    email: z.email(),
  })
  .optional();

const BankInformationSchema = z.object({
  bankName: z.string().min(1, "Bank name is required."),
  branchName: z.string().min(1, "Branch name is required."),
  accountNumber: z.string().min(1, "Bank Account Number is required."),
  walletType: z.string().optional(),
  walletNumber: z.string().optional(),
});

export const EmployeeSchema = z.object({
  personalInformation: EmployeePersonalInformationSchema,
  presentAddress: PresentAddressSchema,
  permanentAddress: PermanentAddressSchema,
  spouseInformation: SpouseInformationSchema,
  bankInformation: BankInformationSchema,
});
