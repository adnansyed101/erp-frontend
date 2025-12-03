"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  loginDate: string;
  loginTime: string;
  outTime: string;
}

export function AttendanceTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sample data - replace with real data from API
  const records: AttendanceRecord[] = [];

  const handleExcel = () => {
    console.log("Export to Excel");
  };

  const handleCSV = () => {
    console.log("Export to CSV");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExcel}
            variant="outline"
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-1"
          >
            <FileText className="w-4 h-4" />
            Excel
          </Button>
          <Button
            onClick={handleCSV}
            variant="outline"
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white border-none gap-1"
          >
            <Download className="w-4 h-4" />
            CSV
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-1"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>

        <div>
          <span className="text-sm text-gray-600 mr-2">Search:</span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Employee Id</TableHead>
              <TableHead className="font-semibold">Employee Name</TableHead>
              <TableHead className="font-semibold">Designation</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Login Date</TableHead>
              <TableHead className="font-semibold">Login Time</TableHead>
              <TableHead className="font-semibold">Out Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.designation}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.loginDate}</TableCell>
                  <TableCell>{record.loginTime}</TableCell>
                  <TableCell>{record.outTime}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {Math.min(records.length, entriesPerPage)} to{" "}
          {Math.min(records.length, entriesPerPage)} of {records.length} entries
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
