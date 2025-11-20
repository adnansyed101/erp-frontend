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
import { useRouter } from "next/navigation";
import { useEmployeeDataStore } from "@/app/store";
import { Employee } from "@/lib/types/types";

const SpouseInformationPage = () => {
  const router = useRouter();

  const spouseInformation = useEmployeeDataStore(
    (state) => state.spouseInformation
  );
  const setEmployeeData = useEmployeeDataStore((state) => state.setData);

  const form = useForm<Partial<Employee>>({
    resolver: zodResolver(EmployeeSchema.partial()),
    defaultValues: {
      spouseInformation: {
        fullName: spouseInformation?.fullName || "",
        dateOfBirth: spouseInformation?.dateOfBirth || new Date(),
        gender: spouseInformation?.gender || "Male",
        occupation: spouseInformation?.occupation || "",
        nid: spouseInformation?.nid || "",
        mobileNumber: spouseInformation?.mobileNumber || "",
        email: spouseInformation?.email || "",
      },
    },
  });

  const onSubmit = (data: Partial<Employee>) => {
    setEmployeeData(data);

    return router.push("/hr-management/create-employee/emergency-contact");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={4} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Spouse Information
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="spouseInformation.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Spouse full name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="spouseInformation.dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spouseInformation.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Male" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="spouseInformation.occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Job title"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spouseInformation.nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="National ID"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="spouseInformation.mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+880"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spouseInformation.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="spouse@email.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SpouseInformationPage;
