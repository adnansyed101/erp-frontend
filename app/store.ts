import { create } from "zustand";
import { Employee } from "@/lib/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

export type EmployeeDataState = Partial<Employee> & {
  setData: (data: Partial<Employee>) => void;
};

export const useEmployeeDataStore = create<EmployeeDataState>()(
  persist(
    (set) => ({
      additionalInformation: {
        fatherName: "N/A",
        motherName: "N/A",
        nationalId: "N/A",
        placeOfBirth: "N/A",
        maritalStatus: "Single",
        eTIN: "N/A",
        program: "N/A",
        unit: "N/A",
        prlDate: new Date(),
        dateofRegularity: new Date(),
      },
      spouseInformation: {
        fullName: "N/A",
        dateOfBirth: new Date(),
        gender: "Male",
        occupation: "N/A",
        nid: "N/A",
        mobileNumber: "N/A",
        email: "n/a",
      },
      setData: (data) => set(data),
    }),
    {
      name: "employee-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
