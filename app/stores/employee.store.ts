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

type EmployeePersonalInformationState = {
  personalInformation: PersonalInformation;
  setData: (data: PersonalInformation) => void;
};

export const useEmployeePersonalInformationDataStore =
  create<EmployeePersonalInformationState>()(
    persist(
      (set) => ({
        personalInformation: {
          fullName: "",
          imageUrl: "",
          officeEmail: "",
          personalEmail: "",
          personalNumber: "",
          officeNumber: "",
          employeeType: "",
          employeeStatus: "",
          nationality: "",
          disability: false,
          gender: "Male",
          religion: "",
          joiningDesignation: "",
          currentDesignation: "",
          dateOfBirth: new Date(),
          dateOfConfirmation: new Date(),
        },
        setData: (data) => set({ personalInformation: data }),
      }),
      {
        name: "employee-personal-information-data-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

type AdditionalInformationState = {
  addtionalInformation: AddtionalInformation;
  setData: (data: AddtionalInformation) => void;
};

export const useEmployeeAdditionalInformation =
  create<AdditionalInformationState>()(
    persist(
      (set) => ({
        addtionalInformation: {
          fatherName: "",
          motherName: "",
          nationalId: "",
          placeOfBirth: "",
          maritalStatus: "Single",
          eTIN: "",
          program: "",
          unit: "",
          prlDate: new Date(),
          dateofRegularity: new Date(),
        },
        setData: (data) => set({ addtionalInformation: data }),
      }),
      {
        name: "employee-additional-information-data-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

type PresentAddressState = {
  presentAddress: PresentAddress;
  setData: (data: PresentAddress) => void;
};

export const useEmployeePresentAddress = create<PresentAddressState>()(
  persist(
    (set) => ({
      presentAddress: {
        division: "",
        district: "",
        upazilaOrThana: "",
        postOffice: "",
        postCode: "",
        houseNoOrVillage: "",
        block: "",
        roadNo: "",
      },

      setData: (data) => set({ presentAddress: data }),
    }),
    {
      name: "employee-present-address-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type PermanentAddressState = {
  permanentAddress: PermanentAddress;
  setData: (data: PermanentAddress) => void;
};

export const useEmployeePermanentAddress = create<PermanentAddressState>()(
  persist(
    (set) => ({
      permanentAddress: {
        division: "",
        district: "",
        upazilaOrThana: "",
        postOffice: "",
        postCode: "",
        houseNoOrVillage: "",
        block: "",
        roadNo: "",
      },
      setData: (data) => set({ permanentAddress: data }),
    }),
    {
      name: "employee-permanent-address-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type SpouseInformationState = {
  spouseInformation: SpouseInformation;
  setData: (data: SpouseInformation) => void;
};

export const useEmployeeSpouseInformation = create<SpouseInformationState>()(
  persist(
    (set) => ({
      spouseInformation: {
        fullName: "",
        dateOfBirth: new Date(),
        gender: "Male",
        occupation: "",
        nid: "",
        mobileNumber: "",
        email: "",
      },
      setData: (data) => set({ spouseInformation: data }),
    }),
    {
      name: "employee-spouse-information-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type EmergencyContactState = {
  emergencyContact: EmergencyContact;
  setData: (data: EmergencyContact) => void;
};

export const useEmployeeEmergencyContact = create<EmergencyContactState>()(
  persist(
    (set) => ({
      emergencyContact: {
        fullName: "",
        dateOfBirth: new Date(),
        gender: "Male",
        occupation: "",
        nid: "",
        mobileNumber: "",
        email: "",
      },
      setData: (data) => set({ emergencyContact: data }),
    }),
    {
      name: "employee-emrgency-contact-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type BankInformationState = {
  bankInformation: BankInformation;
  setData: (data: BankInformation) => void;
};

export const useBankInformationState = create<BankInformationState>()(
  persist(
    (set) => ({
      bankInformation: {
        bankName: "",
        branchName: "",
        accountNumber: "",
        walletType: "",
        walletNumber: "",
      },
      setData: (data) => set({ bankInformation: data }),
    }),
    {
      name: "employee-bank-information-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
