import { Metadata } from "next";
// import Image from "next/image";

// import { Separator } from "@/components/ui/separator";
// import { SidebarNav } from "@/app/dashboard/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gerenciamento de usuários",
};

// const sidebarNavItems = [
//   {
//     title: "Cadastro",
//     href: "/dashboard/register",
//   },
//   {
//     title: "Gerenciar usuários",
//     href: "/dashboard/userManager",
//   },
//   {
//     title: "Gerenciar administradores",
//     href: "/dashboard/gerenciarAdministradores",
//   },
// ];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div id="dashboard-min-content-container" className="flex flex-col items-center pt-2 mb-20">
      <div className="flex p-2">
        {/* <SidebarNav items={sidebarNavItems} /> */}

      </div>
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
}
