import { EmployeeCard } from "./components/employee-card";
import { getEmployees } from "@/lib/actions/employee.action";

const EmployeeListPage = async () => {
  const employees = await getEmployees();

  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">Employee List</h1>
      {employees.length === 0 && <p>No Employees Registered</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee) => (
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
    </main>
  );
};

export default EmployeeListPage;
