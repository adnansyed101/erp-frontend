import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  PersonalInformation,
  AddtionalInformation,
  PermanentAddress,
  PresentAddress,
  SpouseInformation,
  EmergencyContact,
  BankInformation,
} from "@/lib/types/employee.types";

type EmployeePersonalInformationState = Partial<PersonalInformation> & {
  setData: (data: Partial<PersonalInformation>) => void;
};

export const useEmployeePersonalInformationDataStore =
  create<EmployeePersonalInformationState>()(
    persist(
      (set) => ({
        setData: (data) => set(data),
      }),
      {
        name: "employee-personal-information-data-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

type AdditionalInformationState = Partial<AddtionalInformation> & {
  setData: (data: Partial<AddtionalInformation>) => void;
};

export const useEmployeeAdditionalInformation =
  create<AdditionalInformationState>()(
    persist((set) => ({ setData: (data) => set(data) }), {
      name: "employee-additional-information-data-storage",
      storage: createJSONStorage(() => localStorage),
    })
  );

type PresentAddressState = Partial<PresentAddress> & {
  setData: (data: Partial<PresentAddress>) => void;
};

export const useEmployeePresentAddress = create<PresentAddressState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-present-address-data-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

type PermanentAddressState = Partial<PermanentAddress> & {
  setData: (data: Partial<PermanentAddress>) => void;
};

export const useEmployeePermanentAddress = create<PermanentAddressState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-permanent-address-data-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

type SpouseInformationState = Partial<SpouseInformation> & {
  setData: (data: Partial<SpouseInformation>) => void;
};

export const useEmployeeSpouseInformation = create<SpouseInformationState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-permanent-address-data-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

type EmergencyContactState = Partial<EmergencyContact> & {
  setData: (data: Partial<EmergencyContact>) => void;
};

export const useEmployeeEmergencyContact = create<EmergencyContactState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-permanent-address-data-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

type BankInformationState = Partial<BankInformation> & {
  setData: (data: Partial<BankInformation>) => void;
};

export const useBankInformationState = create<BankInformationState>()(
  persist((set) => ({ setData: (data) => set(data) }), {
    name: "employee-bank-information-data-storage",
    storage: createJSONStorage(() => localStorage),
  })
);
