"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddPermissionUser from "../permission/addPermissionUser";
import useGetAllUsers from "./helpers/dataFetch";

export default function ListUsers() {
  const { users } = useGetAllUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Estado para o ID do usuário selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal

  // Função para abrir o modal e selecionar o usuário
  const handleAddPermissionClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null); // Limpa o usuário selecionado
  };

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <div className="relative w-full md:w-80">{"INPUT BUSCAR USUARIOS"}</div>
        <div className="flex px-4 mt-2 md:mt-0">
          {/* Filtro */}
        </div>
      </div>

      {/* Tabela de usuários */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-blue-900 text-gray-50">
            <TableRow>
              <TableHead className="text-gray-50 text-left w-1/5">Nome</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">NIP</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Departamento</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Seção</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Status</TableHead>
              <TableHead className="text-gray-50 text-left w-1/5">Permissões</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-100" style={{ whiteSpace: "nowrap" }}>
                <TableCell className="px-4 text-left ">{user.firstName + " " + user.lastName}</TableCell>
                <TableCell className="px-4 text-left">{user.nip}</TableCell>
                <TableCell className="px-4 text-left">{user.departament ? "true" : "false"}</TableCell>
                <TableCell className="px-4 text-left">{user.section ? "true" : "false"}</TableCell>
                <TableCell className="px-4 text-left">{user.status ? "true" : "false"}</TableCell>
                <TableCell className="px-4 text-left">
                  <div className="flex space-x-4 justify-start">
                    <button
                      className="bg-blue-500 text-white p-2 rounded flex items-center"
                      onClick={() => handleAddPermissionClick(user.nip)} // Passa o ID do usuário
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal para adicionar permissões */}
      {isModalOpen && selectedUserId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Adicionar Permissões</h2>
            <AddPermissionUser userId={selectedUserId} userPermissions={[]} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal} // Fecha o modal
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
