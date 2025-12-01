"use client";

import { useEmployeeStore } from "@/app/stores/employee.store";
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
import { useRouter } from "next/router";
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
  const employeeData = useEmployeeStore((state) => state.formData);
  const router = useRouter();

  const handleContinue = async () => {
    await createEmployee(employeeData);

    toast.success(`Employee Created Successfully.`);

    resetForm();
    useEmployeeStore.persist.clearStorage();
    useEmployeeStore.setState(useEmployeeStore.getInitialState());
    setIsConfirmed(false);

    return router.push("/hr-management/employee-list");
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
