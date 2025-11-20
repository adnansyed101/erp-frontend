"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { Card, CardTitle } from "@/components/ui/card";
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
import { EmployeeDataState, useEmployeeDataStore } from "@/app/store";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "@/lib/types/types";
import { useRouter } from "next/navigation";

const BankInformationPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["employees"],
    mutationFn: async (newEmployee: Omit<EmployeeDataState, "setState">) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hr-management/create-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        }
      );
      if (!response.ok) {
        return console.log("Error occured in creating employee.");
      }

      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch queries after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created");
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`);
    },
  });

  const employeeInformation = useEmployeeDataStore((state) => state);

  const form = useForm<Partial<Employee>>({
    resolver: zodResolver(EmployeeSchema.partial()),
    defaultValues: {
      bankName: employeeInformation.bankName || "",
      branchName: employeeInformation.branchName || "",
      accountNumber: employeeInformation.accountNumber || "",
      walletType: employeeInformation.walletType || "",
      walletNumber: employeeInformation.walletNumber || "",
    },
  });

  const onSubmit = (data: Partial<Employee>) => {
    employeeInformation.setData(data);

    mutate({ ...employeeInformation, ...data });

    useEmployeeDataStore.setState(useEmployeeDataStore.getInitialState(), true);
    useEmployeeDataStore.persist.clearStorage();
    return router.push("/hr-management/employee-list");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={6} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Bank Information
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="bankName"
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
                name="branchName"
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
                name="accountNumber"
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
                name="walletType"
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
                name="walletNumber"
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
