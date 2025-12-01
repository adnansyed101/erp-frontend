"use client";

import {
  useBankInformationState,
  useEmployeeAdditionalInformation,
  useEmployeeEmergencyContact,
  useEmployeePermanentAddress,
  useEmployeePersonalInformationDataStore,
  useEmployeePresentAddress,
  useEmployeeSpouseInformation,
} from "@/app/stores/employee.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createEmployee } from "@/lib/actions/employee.action";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type ConfirmationModalProps = {
  setIsConfirmed: Dispatch<SetStateAction<boolean>>;
  resetForm: () => void;
};

const ConfirmationModal = ({
  setIsConfirmed,
  resetForm,
}: ConfirmationModalProps) => {
  const personalInformation = useEmployeePersonalInformationDataStore(
    (state) => state.personalInformation
  );
  const additionalInformation = useEmployeeAdditionalInformation(
    (state) => state.addtionalInformation
  );
  const presentAddress = useEmployeePresentAddress(
    (state) => state.presentAddress
  );
  const permanentAddress = useEmployeePermanentAddress(
    (state) => state.permanentAddress
  );
  const spouseInformation = useEmployeeSpouseInformation(
    (state) => state.spouseInformation
  );
  const emergencyContact = useEmployeeEmergencyContact(
    (state) => state.emergencyContact
  );
  const bankInformation = useBankInformationState(
    (state) => state.bankInformation
  );

  const stores = [
    useEmployeePersonalInformationDataStore,
    useEmployeeAdditionalInformation,
    useEmployeePresentAddress,
    useEmployeePermanentAddress,
    useEmployeeSpouseInformation,
    useEmployeeEmergencyContact,
    useBankInformationState,
  ];

  function resetStores() {
    stores.forEach((store) => {
      store.persist.clearStorage();
      store.setState(store.getInitialState());
    });
  }

  const employeeData = {
    personalInformation,
    additionalInformation,
    presentAddress,
    permanentAddress,
    spouseInformation,
    emergencyContact,
    bankInformation,
  };

  const handleContinue = async () => {
    await createEmployee(employeeData);

    toast.success(`Employee Created Successfully.`);

    resetForm();
    resetStores();

    useEmployeePersonalInformationDataStore.setState(
      useEmployeePersonalInformationDataStore.getInitialState()
    );
    useEmployeeAdditionalInformation.setState(
      useEmployeeAdditionalInformation.getInitialState()
    );
    useEmployeePresentAddress.setState(
      useEmployeePresentAddress.getInitialState()
    );
    useEmployeePermanentAddress.setState(
      useEmployeePermanentAddress.getInitialState()
    );
    useEmployeeSpouseInformation.setState(
      useEmployeeSpouseInformation.getInitialState()
    );
    useEmployeeEmergencyContact.setState(
      useEmployeeEmergencyContact.getInitialState()
    );
    useBankInformationState.setState(useBankInformationState.getInitialState());

    return setIsConfirmed(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Submit Data</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
