import { create } from "zustand";
import { Employee } from "@/lib/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

export type EmployeeDataState = Partial<Employee> & {
  setData: (data: Partial<Employee>) => void;
};

export const useEmployeeDataStore = create<EmployeeDataState>()(
  persist(
    (set) => ({
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
