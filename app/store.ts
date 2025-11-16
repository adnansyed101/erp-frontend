import { create } from "zustand";
import { Employee } from "@/lib/types/types";

type EmployeeDataState = Partial<Employee> & {
  setData: (data: Partial<Employee>) => void;
};

export const useEmployeeDataStore = create<EmployeeDataState>((set) => ({
  setData: (data) => set(data),
}));
