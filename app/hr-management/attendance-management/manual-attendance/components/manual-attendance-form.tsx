"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, LogOut, Clock } from "lucide-react";

interface AttendanceFormData {
  employeeName: string;
  designation: string;
  department: string;
  loginDate: string;
  loginTime: string;
  weekDay: string;
  preferableInTime: string;
}

export function ManualAttendanceForm() {
  const [formData, setFormData] = useState<AttendanceFormData>({
    employeeName: "",
    designation: "",
    department: "",
    loginDate: "",
    loginTime: "",
    weekDay: "",
    preferableInTime: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Form data saved:", formData);
  };

  return (
    <form className="space-y-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="employeeName" className="text-sm font-medium">
              Emp Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="employeeName"
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="designation" className="text-sm font-medium">
              Designation
            </Label>
            <Input
              id="designation"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="department" className="text-sm font-medium">
              Department
            </Label>
            <Input
              id="department"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="loginDate" className="text-sm font-medium">
                Login Date<span className="text-red-500">*</span>
              </Label>
              <Input
                id="loginDate"
                name="loginDate"
                type="date"
                placeholder="Effective Date"
                value={formData.loginDate}
                onChange={handleInputChange}
                className="mt-1"
              />
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
              />
            </div>
          </div>

          <div>
            <Label htmlFor="loginTime" className="text-sm font-medium">
              Login Time<span className="text-red-500">*</span>
            </Label>
            <Input
              id="loginTime"
              name="loginTime"
              type="time"
              placeholder="In time"
              value={formData.loginTime}
              onChange={handleInputChange}
              className="mt-1"
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
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          type="button"
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white gap-2"
        >
          <span>💾</span>
          Save
        </Button>
      </div>
    </form>
  );
}
