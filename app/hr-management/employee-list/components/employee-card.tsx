import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface EmployeeCardProps {
  id: string;
  imgUrl: string;
  fullName: string;
  officeEmail: string;
  personalNumber: string;
  currentDesignation: string;
  jobTitle: string;
}

export function EmployeeCard({
  id,
  imgUrl,
  fullName,
  officeEmail,
  personalNumber,
  currentDesignation,
  jobTitle,
}: EmployeeCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0">
      <CardHeader className="p-0">
        <img
          src={imgUrl || "/placeholder.svg"}
          alt={fullName}
          className="w-full h-60 object-cover rounded-t-2xl"
        />
      </CardHeader>
      <CardContent className="p-6">
        {/* Employee Name */}
        <h2 className="text-xl font-semibold text-foreground mb-1">
          {fullName}
        </h2>

        {/* Job Title and currentDesignation */}
        <p className="text-sm font-medium text-primary mb-4">{jobTitle}</p>
        <p className="text-sm text-muted-foreground mb-4">
          {currentDesignation}
        </p>

        {/* Divider */}
        <div className="h-px bg-border my-4" />

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {officeEmail}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {personalNumber}
            </span>
          </div>
        </div>

        {/* Details Button */}
        <Button className="w-full mt-6" asChild>
          <Link href={`/hr-management/employee-list/${id}`}>Show Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
