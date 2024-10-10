import { Metadata } from "next";
import Image from "next/image";
import  Search  from "@/app/dashboard/components/search";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/dashboard/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gerenciamento de usuários",
};

const sidebarNavItems = [
  {
    title: "Cadastrar",
    href: "/dashboard",
  },
  {
    title: "Gerenciar usuários",
    href: "/dashboard/gerenciarUsuarios",
  },
  {
    title: "Gerenciar administradores",
    href: "/dashboard/gerenciarAdministradores",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col items-center p-2 text-blue-900">
      <div className="flex p-4">
        <SidebarNav items={sidebarNavItems} />

      </div>
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
