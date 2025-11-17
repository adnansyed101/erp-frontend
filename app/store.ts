import { create } from "zustand";
import { Employee } from "@/lib/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

export type EmployeeDataState = Partial<Employee> & {
  setData: (data: Partial<Employee>) => void;
};

export const useEmployeeDataStore = create<EmployeeDataState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-data-storage",
    storage: createJSONStorage(()=> localStorage)
  }),
);
