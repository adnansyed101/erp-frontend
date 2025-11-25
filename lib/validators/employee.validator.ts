import z from "zod";

export const PersonalInformationSchema = z.object({
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
});

export const AdditionalInformationSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  nationalId: z.string(),
  placeOfBirth: z.string(),
  maritalStatus: z.enum([
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
  ]),
  eTIN: z.string(),
  program: z.string(),
  unit: z.string(),
  prlDate: z.date(),
  dateofRegularity: z.date(),
});

export const AddressSchema = z.object({
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

export const spouseInformationSchema =
  ContactInformationSchema.optional().default({
    fullName: "N/A",
    dateOfBirth: new Date(),
    gender: "Male",
    occupation: "N/A",
    nid: "N/A",
    mobileNumber: "N/A",
    email: "n/a@example.com",
  });

export const EmergencyContactSchema = ContactInformationSchema;

export const BankInformationSchema = z.object({
  bankName: z.string().min(1, "Bank name is required."),
  branchName: z.string().min(1, "Branch name is required."),
  accountNumber: z.string().min(1, "Bank Account Number is required."),
  walletType: z.string().optional().default("n/a"),
  walletNumber: z.string().optional().default("n/a"),
});

export const EmployeeSchema = z.object({
  personalInformation: PersonalInformationSchema,
  bankInformation: BankInformationSchema,
  additionalInformation: AdditionalInformationSchema.optional(),
  spouseInformation: ContactInformationSchema.optional(),
  emergencyContact: ContactInformationSchema,
  presentAddress: AddressSchema,
  permanentAddress: AddressSchema,
});
