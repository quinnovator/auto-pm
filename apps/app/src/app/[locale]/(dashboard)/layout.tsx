import { Sidebar } from "@v1/ui/sidebar";
import { Folder, Settings } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center text-center font-mono font-bold gap-2">
      AutoPM
    </div>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarIcons = [
    {
      icon: <Folder className="w-6 h-6" />,
      label: "Applications",
      href: "/applications"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Settings",
      href: "/settings"
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar icons={sidebarIcons} leadingIcon={<Logo />} />
      <main className="flex-1 overflow-auto">
        <DashboardContent>{children}</DashboardContent>
      </main>
    </div>
  );
}
