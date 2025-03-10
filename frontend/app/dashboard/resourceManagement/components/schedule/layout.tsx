import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamento de Salas",
  description: "Registra novos agendamentos da sala de reuniões e auditório. Lista agendamentos.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
      <div className="">
        {children}
      </div>
  );
}
