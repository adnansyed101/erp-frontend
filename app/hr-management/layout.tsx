import { Home, ListCheck, Logs, User } from "lucide-react";
import { Links } from "@/lib/types/types";
import MainLayout from "../provider/MainLayout";

export default function HRManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links: Links = [
    {
      label: "Essential Links",
      items: [
        {
          title: "Home",
          url: "/home",
          icon: Home,
        },
        {
          title: "Dashboard",
          url: "/hr-management",
          icon: Logs,
        },
        {
          title: "Personal Information",
          url: "/hr-management",
          icon: User,
        },
        {
          title: "Attendance",
          url: "/hr-management/attendance-management",
          icon: ListCheck,
        },
      ],
    },
  ];

  return <MainLayout links={links}>{children}</MainLayout>;
}
