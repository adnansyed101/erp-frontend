"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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

const AdditionalInformationPage = () => {
  const router = useRouter();

  const additionalInformation = useEmployeeDataStore(
    (state) => state.additionalInformation
  );
  const setEmployeeData = useEmployeeDataStore((state) => state.setData);

  const form = useForm<Partial<Employee>>({
    resolver: zodResolver(EmployeeSchema.partial()),
    defaultValues: {
      additionalInformation: {
        fatherName: additionalInformation?.fatherName || "",
        motherName: additionalInformation?.motherName || "",
        nationalId: additionalInformation?.nationalId || "",
        placeOfBirth: additionalInformation?.placeOfBirth || "",
        maritalStatus: additionalInformation?.maritalStatus || "Single",
        eTIN: additionalInformation?.eTIN || "",
        program: additionalInformation?.program || "",
        unit: additionalInformation?.unit || "",
        prlDate: additionalInformation?.prlDate || new Date(),
        dateofRegularity: additionalInformation?.dateofRegularity || new Date(),
      },
    },
  });

  const onSubmit = (data: Partial<Employee>) => {
    setEmployeeData(data);

    return router.push("/hr-management/create-employee/permanent-address");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={2} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Additional Information
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="additionalInformation.fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Father full name"
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
                name="additionalInformation.motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mother full name"
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
                name="additionalInformation.nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID No.</FormLabel>
                    <Input
                      placeholder="National Id"
                      {...field}
                      value={field.value || ""}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="additionalInformation.placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place Of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Place of Birth"
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
                name="additionalInformation.maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Single" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                          <SelectItem value="Separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="additionalInformation.eTIN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>eTIN Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12***"
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
                name="additionalInformation.program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Program"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="additionalInformation.unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Unit"
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
                name="additionalInformation.prlDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PRL Date</FormLabel>
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
                name="additionalInformation.dateofRegularity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Regularity</FormLabel>
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
            </div>
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionalInformationPage;
