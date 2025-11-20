"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEmployeeDataStore } from "@/app/store";
import { Employee } from "@/lib/types/types";

const PresentAddressPage = () => {
  const router = useRouter();
  const employeeData = useEmployeeDataStore((state) => state.presentAddress);
  const setEmployeeData = useEmployeeDataStore((state) => state.setData);

  const form = useForm<Partial<Employee>>({
    resolver: zodResolver(EmployeeSchema.partial()),
    defaultValues: {
      presentAddress: {
        division: employeeData?.division || "",
        district: employeeData?.district || "",
        upazilaOrThana: employeeData?.upazilaOrThana || "",
        postOffice: employeeData?.postOffice || "",
        postCode: employeeData?.postCode || "",
        block: employeeData?.block || "",
        houseNoOrVillage: employeeData?.houseNoOrVillage || "",
        roadNo: employeeData?.roadNo || "",
      },
    },
  });

  const onSubmit = (data: Partial<Employee>) => {
    setEmployeeData(data);

    return router.push("/hr-management/create-employee/spouse-information");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={3} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Present Address
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
            className="space-y-2 lg:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="presentAddress.division"
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
                name="presentAddress.district"
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
                name="presentAddress.upazilaOrThana"
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
                name="presentAddress.postOffice"
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
                name="presentAddress.postCode"
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
                name="presentAddress.houseNoOrVillage"
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
              name="presentAddress.roadNo"
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
              name="presentAddress.block"
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
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default PresentAddressPage;
