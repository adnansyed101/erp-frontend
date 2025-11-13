import React from "react";
import CreateEmployeeForm from "./component/create-employee-form";

const CreateEmployeePage = () => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Create Employee
        </h1>
        <div>
          <CreateEmployeeForm />
        </div>
      </div>
    </main>
  );
};

export default CreateEmployeePage;
