"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Building,
  User,
  MapPin,
  Banknote,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { Employee } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

const EmployeeDetailsPage = () => {
  const { id } = useParams();

  const {
    data: employee,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee"],
    queryFn: async (): Promise<{
      success: boolean;
      message: string;
      data: Employee;
    }> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hr-management/all-employees/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch all employee");
      }

      return response.json();
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/all-employees">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Button>
        </Link>

        {isLoading || isPending ? (
          <p>Loading</p>
        ) : (
          <>
            {/* Header Card */}
            <Card className="overflow-hidden mb-8">
              <CardHeader className="p-0">
                <img
                  src={employee.data.imageUrl || "/placeholder.svg"}
                  alt={employee.data.fullName}
                  className="w-full h-80 object-cover"
                />
              </CardHeader>

              <CardContent className="p-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {employee.data.fullName}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <p className="text-xl font-semibold text-primary">
                    {employee.data.currentDesignation}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  <p className="text-lg text-muted-foreground">
                    {employee.data.program}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="spouse">Spouse</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Full Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Gender
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Birth
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.dateOfBirth.toString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Nationality
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.nationality}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Marital Status
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.maritalStatus || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Religion
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.religion}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Father Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.fatherName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Mother Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.motherName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          National ID
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.nationalId || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          eTIN
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.eTIN || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Disability
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.disability ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Place of Birth
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.placeOfBirth || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-border my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Office Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.officeEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Personal Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.personalEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Office Phone
                            </p>
                            <a className="text-primary hover:underline">
                              {employee.data.officeNumber}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Personal Phone
                            </p>
                            <a className="text-primary hover:underline">
                              {employee.data.personalNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        Present Address
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Division
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.division}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            District
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.district}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Upazila/Thana
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.upazilaOrThana}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Office
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.postOffice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Code
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.postCode}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            House No./Village
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.houseNoOrVillage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Road No.
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.roadNo || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Block
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.block || "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        Permanent Address
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Division
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.division}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            District
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.district}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Upazila/Thana
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.upazilaOrThana}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Office
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.postOffice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Code
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.postCode}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            House No./Village
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.houseNoOrVillage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Road No.
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.roadNo || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Block
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.block || "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Spouse Information Tab */}
              <TabsContent value="spouse">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      Spouse Information
                    </h2>
                  </CardHeader>
                  <CardContent>
                    {employee.data.spouseInformation ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Full Name
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Gender
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Date of Birth
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.dateOfBirth.toString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Occupation
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.occupation}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            NID
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.nid}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Mobile Number
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.spouseInformation.mobileNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.spouseInformation.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No spouse information available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Banking Information Tab */}
              <TabsContent value="banking">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Banknote className="w-6 h-6 text-primary" />
                      Banking Information
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Bank Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Branch Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.branchName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Account Number
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Wallet Type
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.walletType || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Wallet Number
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.walletNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Employment Information Tab */}
              <TabsContent value="employment">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold">
                      Employment Information
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Employee Type
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.employeeType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Employee Status
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.employeeStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Joining Designation
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.joiningDesignation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Current Designation
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.currentDesignation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Confirmation
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.dateOfConfirmation.toString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Program
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.program || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Unit
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.unit || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          PRL Date
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.prlDate?.toString() || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Regularity
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.dateofRegularity || "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </main>
  );
};

export default EmployeeDetailsPage;
