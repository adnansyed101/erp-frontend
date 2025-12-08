"use client";

import React from "react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut, Clock, ChevronDownIcon } from "lucide-react";
import { SearchDropdown } from "./search-dropdown";
import { useQuery } from "@tanstack/react-query";
import { EmployeeWithId } from "@/lib/types/employee.types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface AttendanceFormData {
  loginDate: Date;
  loginTime: Date;
  weekDay: string;
  preferableInTime: string;
}

export function ManualAttendanceForm() {
  const {
    data: employees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async (): Promise<{
      success: boolean;
      message: string;
      data: EmployeeWithId[];
    }> => {
      const response = await fetch(`/api/hr-management/employees`);

      if (!response.ok) {
        throw new Error("Failed to fetch all employee");
      }

      return response.json();
    },
    initialData: { success: false, message: "Fetching Data", data: [] },
  });
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState<EmployeeWithId | null>(null)

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [formData, setFormData] = useState<AttendanceFormData>({
    loginDate: new Date(),
    loginTime: new Date(),
    weekDay: weekday[new Date().getDay()],
    preferableInTime: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form data saved:", formData);
    console.log("Form data saved:", employee);
  };

  const handleSelect = (value: EmployeeWithId) => {
    setEmployee(value)
  };

  return (
    <form className="space-y-6" onSubmit={(e) => handleSave(e)}>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="bg-slate-600 hover:bg-slate-700 text-white gap-2"
        >
          <LogIn className="w-4 h-4" />
          Log In Time
        </Button>
        <Button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out Time
        </Button>
        <Button
          type="button"
          className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2"
        >
          <Clock className="w-4 h-4" />
          Both Time
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 py-6">
        <div>
          <Label htmlFor="employeeName" className="text-sm font-medium mb-1">
            Emp Name <span className="text-red-500">*</span>
          </Label>
          <SearchDropdown
            placeholder="Enter Employee Name"
            items={employees.data}
            onSelect={handleSelect}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="loginDate" className="text-sm font-medium">
              Login Date<span className="text-red-500">*</span>
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between"
                >
                  {formData.loginDate
                    ? formData.loginDate.toLocaleDateString()
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar   
                  mode="single"
                  selected={formData.loginDate}
                  captionLayout="dropdown"
                  onSelect={() => {
                    setFormData((prev) => ({
                      ...prev,
                      loginDate: new Date(),
                    }));
                    setOpen(false);
                  
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="weekDay" className="text-sm font-medium">
              Week day
            </Label>
            <Input
              id="weekDay"
              name="weekDay"
              placeholder="Week day"
              value={formData.weekDay}
              onChange={handleInputChange}
              className="mt-1"
              disabled
            />
          </div>
        </div>
        <div>
         <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="11:00 AM"
          value={format(formData.loginTime, "p")}
          onChange={handleInputChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
        </div>
        <div>
          <Label htmlFor="preferableInTime" className="text-sm font-medium">
            Preferable In Time
          </Label>
          <Input
            id="preferableInTime"
            name="preferableInTime"
            type="time"
            placeholder="Preferable In Time"
            value={formData.preferableInTime}
            onChange={handleInputChange}
            className="mt-1"
            
          />
        </div>
        <Button onClick={()=> setFormData(prev => {
          console.log("hello")
          return {...prev, loginTime:new Date()}
        })}>Current Time</Button>
      </div>
      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white gap-2"
        >
          <span>💾</span>
          Save
        </Button>
      </div>
    </form>
  );
}
