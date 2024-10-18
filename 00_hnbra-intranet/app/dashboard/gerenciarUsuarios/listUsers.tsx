import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Command from "./components/Command";
import { Eye, Plus, Download, Trash2, Filter } from "lucide-react";

interface User {
  nome: string;
  nip: string;
  departamento: string;
  secao: string;
  status: string;
  permissoes: string[];
}

const users: User[] = [
  {
    nome: "Manoel Barbosa de Sena Neto",
    nip: "098675654",
    departamento: "Administração",
    secao: "Seção de Informática",
    status: "Ativo",
    permissoes: ["read", "delete", "download"],
  },
  {
    nome: "Maria da Silva",
    nip: "123456789",
    departamento: "Saúde",
    secao: "Serviço de medicina operativa",
    status: "Ativo",
    permissoes: ["read", "add"],
  },
  {
    nome: "João Oliveira",
    nip: "987654321",
    departamento: "Diretoria",
    secao: "Conselho Técnico",
    status: "Inativo",
    permissoes: ["read", "delete"],
  },
  {
    nome: "Ana Clara",
    nip: "456123789",
    departamento: "Administração",
    secao: "Seção de esportes",
    status: "Ativo",
    permissoes: ["read", "add", "download", "delete"],
  },
];

export default function ListUsers() {
  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <div className="relative w-full md:w-80">
          <Command />
        </div>
        <div className="flex px-4 mt-2 md:mt-0">
          <Filter className="mr-1" />
          Filtrar
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-blue-900 text-gray-50">
            <TableRow>
              <TableHead className="text-gray-50 text-left w-1/5">Nome</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">NIP</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Departamento</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Seção</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Status</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="px-4 text-left">{user.nome}</TableCell>
                <TableCell className="px-4 text-left">{user.nip}</TableCell>
                <TableCell className="px-4 text-left">{user.departamento}</TableCell>
                <TableCell className="px-4 text-left">{user.secao}</TableCell>
                <TableCell className="px-4 text-left">{user.status}</TableCell>
                <TableCell className="px-4 text-left">
                  <div className="flex space-x-4 justify-start">
                    {user.permissoes.includes("read") && (
                      <button>
                        <Eye />
                      </button>
                    )}
                    {user.permissoes.includes("delete") && (
                      <button>
                        <Trash2 />
                      </button>
                    )}
                    {user.permissoes.includes("add") && (
                      <button>
                        <Plus />
                      </button>
                    )}
                    {user.permissoes.includes("download") && (
                      <button>
                        <Download />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
