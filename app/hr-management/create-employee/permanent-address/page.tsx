"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { EmployeeSchema } from "@/app/lib/validators/employee.validator";
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
import { Button } from "@/components/ui/button";

const PermanentAddressSchema = EmployeeSchema.pick({
  permanentAddress: true,
});

type PermanentAddress = z.infer<typeof PermanentAddressSchema>;

const PermanentAddressPage = () => {
  const form = useForm<PermanentAddress>({
    resolver: zodResolver(PermanentAddressSchema),
    defaultValues: {
      permanentAddress: {
        division: "",
        district: "",
        upazilaOrThana: "",
        postOffice: "",
        postCode: "",
        block: "",
        houseNoOrVillage: "",
        roadNo: "",
      },
    },
  });

  const onSubmit = (data: PermanentAddress) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={1} />
      <Card className="px-4 flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="permanentAddress.division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="permanentAddress.upazilaOrThana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upazila/Thana</FormLabel>
                    <FormControl>
                      <Input placeholder="Mirpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress.postOffice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Office</FormLabel>
                    <FormControl>
                      <Input placeholder="Mirpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="permanentAddress.postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder="1216" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress.houseNoOrVillage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House No./Village</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="permanentAddress.roadNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Road No. (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Road 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanentAddress.block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Block (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Navigation Buttons */}
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default PermanentAddressPage;
