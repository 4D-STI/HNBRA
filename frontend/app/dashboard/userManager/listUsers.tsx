// import { Toggle } from "@/components/ui/toggle";
'use client'

// Componentes shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";

// Mock de usuarios
// import users_mock from "../utils/mocks/users_mock"

// Componentes de icones
import { Eye, Plus, Download, Trash2, Filter } from "lucide-react";
import useGetAllUsers from "./helpers/dataFetch";


export default function ListUsers() {

  const {users} = useGetAllUsers()

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <div className="relative w-full md:w-80">
          {"INPUT BUSCAR USUARIOS"}
        </div>
        <div className="flex px-4 mt-2 md:mt-0">
          <Filter className="mr-1" />
          Filtrar
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          {/* Header */}
          <TableHeader className="bg-blue-900 text-gray-50">
            <TableRow>
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Nome
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                NIP
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Departamento
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Seção
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Status
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Permissões
              </TableHead>
            </
            TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-100" style={{ whiteSpace: 'nowrap' }}>
                <TableCell className="px-4 text-left ">{user.firstName + " " + user.lastName}</TableCell>
                <TableCell className="px-4 text-left">{user.nip}</TableCell>
                <TableCell className="px-4 text-left">{user.departament ? 'true' : 'false'}</TableCell>
                <TableCell className="px-4 text-left">{user.section ? 'true' : 'false'}</TableCell>
                <TableCell className="px-4 text-left">{user.status ? 'true' : 'false'}</TableCell>
                <TableCell className="px-4 text-left">
                  <div className="flex space-x-4 justify-start">
                    {user.permission.includes("r") && (
                      <button>
                        <Eye />
                      </button>
                    )}
                    {user.permission.includes("e") && (
                      <button>
                        <Trash2 />
                      </button>
                    )}
                    {user.permission.includes("w") && (
                      <button>
                        <Plus />
                      </button>
                    )}
                    {user.permission.includes("w") && (
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
