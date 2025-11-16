"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import z from "zod";
import { EmployeeSchema } from "@/lib/validators/employee.validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import CreateEmployeeSteps from "../component/create-employee-steps";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEmployeeDataStore } from "@/app/store";
import { toast } from "sonner";

const BankInformationSchema = EmployeeSchema.pick({
  bankInformation: true,
});

type BankInformation = z.infer<typeof BankInformationSchema>;

const BankInformationPage = () => {
  const personalInformation = useEmployeeDataStore(
    (state) => state.personalInformation
  );
  const permanentAddress = useEmployeeDataStore(
    (state) => state.permanentAddress
  );
  const presentAdress = useEmployeeDataStore((state) => state.presentAddress);
  const spouseInformation = useEmployeeDataStore(
    (state) => state.spouseInformation
  );
  const bankInformation = useEmployeeDataStore(
    (state) => state.bankInformation
  );

  const form = useForm<BankInformation>({
    resolver: zodResolver(BankInformationSchema),
    defaultValues: {
      bankInformation: {
        bankName: bankInformation?.bankName || "",
        branchName: bankInformation?.branchName || "",
        accountNumber: bankInformation?.accountNumber || "",
        walletType: bankInformation?.walletType || "",
        walletNumber: bankInformation?.walletNumber || "",
      },
    },
  });

  const onSubmit = (data: BankInformation) => {
    console.log({
      ...data,
      personalInformation,
      permanentAddress,
      presentAdress,
      spouseInformation,
    });

    // TO clear zod state.
    useEmployeeDataStore.setState(useEmployeeDataStore.getInitialState(), true);
    // To clear the persisted data:
    useEmployeeDataStore.persist.clearStorage();
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={4} />
      <Card className="px-4 flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="bankInformation.bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Bank Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankInformation.branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankInformation.accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Account Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankInformation.walletType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Type (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select wallet type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="nagad">Nagad</SelectItem>
                        <SelectItem value="rocket">Rocket</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankInformation.walletNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Wallet Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-x-2">
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  useEmployeeDataStore.persist.clearStorage();
                  useEmployeeDataStore.setState(
                    useEmployeeDataStore.getInitialState(),
                    true
                  );
                  return toast.success("Data is cleared.");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BankInformationPage;
