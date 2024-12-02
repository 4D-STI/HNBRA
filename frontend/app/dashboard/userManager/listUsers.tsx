'use client'
// import { Toggle } from "@/components/ui/toggle";

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
import Command from "./components/Command";

// Mock de usuarios
import users_mock, { IUser } from "../utils/mocks/users_mock"

// Componentes de icones
import { Eye, Plus, Download, Trash2, Filter } from "lucide-react";

import axios from "axios"
import { useState, useEffect } from "react";

// Variaveis
const API_URL_BASE = 'https://localhost:3002'

export default function ListUsers() {

    // requisição para buscar lista de usuarios
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
      // Requisição
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${API_URL_BASE}/users`)
          console.log('DATA -> ', response.data);
          
          setUsers(response.data)
        } catch (error) {
          console.log('Erro ao buscar usuários: ', error);
                  
        }
      }

      fetchUsers()
    }, []);




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
                Ações
              </TableHead>
            </
            TableRow>
          </TableHeader>

          {/* Body */}
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
