"use client";

import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/lib/types/types";
import { EmployeeCard } from "./components/employee-card";

const EmployeeListPage = () => {
  const {
    data: employees,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async (): Promise<{
      success: boolean;
      message: string;
      data: Employee[];
    }> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hr-management/all-employees`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch all employee");
      }

      return response.json();
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">Employee List</h1>
      {isLoading || isPending ? (
        "Loading...."
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.data.map((employee) => (
            <EmployeeCard
              key={employee.id}
              id={employee.id || "1"}
              imgUrl={employee.imageUrl}
              fullName={employee.fullName}
              officeEmail={employee.officeEmail}
              personalNumber={employee.personalNumber}
              currentDesignation={employee.currentDesignation}
              jobTitle={employee.branchName}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default EmployeeListPage;
