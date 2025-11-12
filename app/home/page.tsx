"use client";

import {
  Boxes,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckSquare,
  ShoppingCart,
  GitBranch,
  Zap,
  Package,
  Building2,
  Heart,
  CreditCard,
  Banknote,
  Truck,
  Shield,
  HandshakeIcon,
} from "lucide-react";
import ActivityCard from "./components/activity-card";

const activities = [
  {
    icon: Boxes,
    title: "Supply Chain Management System",
  },
  {
    icon: Users,
    title: "Customer Relationship Management",
  },
  {
    icon: Briefcase,
    title: "HR Management System",
  },
  {
    icon: DollarSign,
    title: "Accounting Management System",
  },
  {
    icon: TrendingUp,
    title: "Payroll Management System",
  },
  {
    icon: MapPin,
    title: "Field Force",
  },
  {
    icon: CheckSquare,
    title: "Task Management System",
  },
  {
    icon: ShoppingCart,
    title: "Sales Management System",
  },
  {
    icon: GitBranch,
    title: "Workflow Management System",
  },
  {
    icon: Zap,
    title: "Recruitment Management System",
  },
  {
    icon: Package,
    title: "Inventory Management System",
  },
  {
    icon: Building2,
    title: "Fixed Asset Management System",
  },
  {
    icon: Heart,
    title: "Home Care",
  },
  {
    icon: CreditCard,
    title: "Point of Sale",
  },
  {
    icon: Banknote,
    title: "Non Banking",
  },
  {
    icon: Truck,
    title: "Rental",
  },
  {
    icon: Shield,
    title: "Dispatch Safety and Security",
  },
  {
    icon: HandshakeIcon,
    title: "Partner",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of enterprise management solutions
            designed to streamline your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              icon={activity.icon}
              title={activity.title}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
