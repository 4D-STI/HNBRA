import { Toggle } from "@/components/ui/toggle"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Command from "./components/Command"
import { Eye, Edit, Search, Trash2, Filter } from "lucide-react";

interface User {
  nome: string;
  nip: string;
  departamento: string;
  secao: string;
  status: string;
}

const users: User[] = [
  {
    nome: "Manoel Barbosa de Sena Neto",
    nip: "098675654",
    departamento: "Administração",
    secao: "Seção de Informática",
    status: "Ativo",
  },
  {
    nome: "Maria da Silva",
    nip: "123456789",
    departamento: "Saúde",
    secao: "Serviço de medicina operativa",
    status: "Ativo",
  },
  {
    nome: "João Oliveira",
    nip: "987654321",
    departamento: "Diretoria",
    secao: "Conselho Técnico",
    status: "Inativo",
  },
  {
    nome: "Ana Clara",
    nip: "456123789",
    departamento: "Administração",
    secao: "Seção de esportes",
    status: "Ativo",
  },
];

export default function ListUsers() {
  return (
    <div className="p-2">
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-80">
          <Command></Command>          
        </div>
          <div className="flex px-4">
          <Filter className="mr-1" />
          Filtrar
          </div>
       
      </div>

      <Table className="text-base">
        <TableHeader className="bg-blue-900">
          <TableRow>
            <TableHead className="text-gray-50 px-16">Nome</TableHead>
            <TableHead className="text-gray-50 px-16">Nip</TableHead>
            <TableHead className="text-gray-50 px-16">Departamento</TableHead>
            <TableHead className="text-gray-50 px-16">Seção</TableHead>
            <TableHead className="text-gray-50 px-16">Status</TableHead>
            <TableHead className="text-gray-50 px-16">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="px-16">{user.nome}</TableCell>
              <TableCell className="px-16">{user.nip}</TableCell>
              <TableCell className="px-16">{user.departamento}</TableCell>
              <TableCell className="px-16">{user.secao}</TableCell>
              <TableCell className="px-16">{user.status}</TableCell>
              <TableCell className="px-16 flex">
                <Toggle><Eye className="mr-1" /></Toggle>
                <Toggle><Trash2 className="mr-1"/></Toggle>
                <Toggle> <Edit className="mr-1" /></Toggle>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
