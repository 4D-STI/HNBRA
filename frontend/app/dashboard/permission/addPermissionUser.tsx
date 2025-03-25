"use client"

import { Button } from "@/components/ui/button";
import { error } from "console";
import { useState, useEffect } from "react";

interface Permission {
    idSubSession: number;
    nameSubSession: string;
}
interface PermissionUser {
    idPermission: number;
    idSubSession: number;
    subSession: {
        nameSubSession: string
    };
}

interface UserPermissionsProps {
    userId: string;
    userPermissions: string[];
}

export default function AddPermissionUser({ userId: nip, userPermissions }: UserPermissionsProps) {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [permissionsUser, setPermissionsUser] = useState<PermissionUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
    const [filteredPermissionsUser, setFilteredPermissionsUser] = useState<PermissionUser[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<number | null>(null);
    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BACK}/subsession`)
            .then((res) => res.json())
            .then((data) => {
                setPermissions(data);
                setFilteredPermissions(data);
            })
            .catch((err) => console.error("Erro ao buscar permissões:", err));

        fetch(`${process.env.NEXT_PUBLIC_API_BACK}/user-permission/${nip}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPermissionsUser(data);
                    setFilteredPermissionsUser(data);
                } else {
                    setPermissionsUser([]);
                    setFilteredPermissionsUser([]);
                }
            })
            .catch((err) => console.error("Error ao buscar permissões do usuário: ", err));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = permissions.filter((perm) =>
                perm.nameSubSession.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPermissions(filtered);
        } else {
            setFilteredPermissions(permissions);
        }
    }, [searchTerm, permissions]);

    const addPermission = (permissionId: string) => {
        const permissionIdNumber = Number(permissionId);
        console.log("Permissão selecionada:", permissionIdNumber);
        setSelectedPermission(permissionIdNumber || null);
    };

    const PermissionUser = (permission: PermissionUser) => {
        setFilteredPermissionsUser((prevState) => [...prevState, permission]);
    };

    const removePermissionUser = async (idPermission: number) => {
        const storedToken = localStorage.getItem("token") || "";
        const PERMISSION_URL_DELETE = `${process.env.NEXT_PUBLIC_API_BACK}/user-permission/${idPermission}`
        const PERMISSION_URL_GET = `${process.env.NEXT_PUBLIC_API_BACK}/user-permission/${nip}`;
        try {
            const response = await fetch(PERMISSION_URL_DELETE, {
                method: 'DELETE',
                cache: 'no-store',
                headers: {
                    Authorization: 'Bearer ' + storedToken
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar permissão')
            }

            const responseGet = await fetch(PERMISSION_URL_GET, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    Authorization: 'Bearer ' + storedToken
                },
            });

            if (!responseGet.ok) {
                throw new Error('Erro ao obter permissões do usuário');
            }

            // Atualizando o estado com as permissões atualizadas
            console.log(response)
            const updatedPermissions = await responseGet.json();
            setPermissionsUser(updatedPermissions);
            setFilteredPermissionsUser(updatedPermissions);

            setFilteredPermissionsUser((prevState) =>
                prevState.filter((perm) => perm.idPermission !== idPermission)
            );


        }
        catch (error) {
            console.error('Error: ', error);
        }

    }


    const removePermission = () => {
        setSelectedPermission(null);
    };

    const handleSubmit = async () => {
        try {
            if (selectedPermission === null) {
                alert("Por favor, selecione uma permissão.");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/user-permission`, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nip: nip,
                    idSubSession: selectedPermission,
                    permission: 1,
                    status: true,
                }),
            });


            if (response.ok) {
                fetch(`${process.env.NEXT_PUBLIC_API_BACK}/user-permission/${nip}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setPermissionsUser(data);
                            setFilteredPermissionsUser(data);
                        } else {
                            setPermissionsUser([]);
                            setFilteredPermissionsUser([]);
                        }
                    })
                    .catch((err) => console.error("Error ao buscar permissões do usuário: ", err));
                alert("Permissão adicionada com sucesso!");
            } else {
                console.log(response);
                alert("Erro ao adicionar permissão.");
            }
        } catch (error) {
            console.error("Erro ao adicionar permissão:", error);
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-bold mb-2">Adicionar Permissão ao Usuário</h2>

            {/* Campo de pesquisa */}
            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Buscar permissões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Select de Permissões */}
            <div className="mb-4">
                <select
                    className="p-2 border rounded w-full"
                    onChange={(e) => {
                        addPermission(e.target.value); // Passa a string do value para addPermission
                    }}
                    value={selectedPermission !== null ? selectedPermission.toString() : ""} // Valor do select
                >
                    <option value="" disabled>
                        Selecione uma permissão
                    </option>
                    {filteredPermissions.map((perm) => (
                        <option key={perm.idSubSession} value={perm.idSubSession}>
                            {perm.nameSubSession}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select de Permissões
            <div className="mb-4">
                <select
                    className="p-2 border rounded w-full"
                    onChange={(e) => {
                        addPermission(e.target.value);
                    }}
                    value={selectedPermission !== null ? selectedPermission.toString() : ""} // Valor do select
                >
                    <option value="" disabled>
                        Selecione uma permissão
                    </option>
                    {filteredPermissionsUser.map((perm) => (
                        <option key={perm.idSubSession} value={perm.idSubSession}>
                            {perm.subSession.nameSubSession}
                        </option>
                    ))}
                </select>
            </div> */}

            {/* Exibe as permissões do usuário */}
            <div className="mb-4">
                <h3 className="font-bold">Permissões do Usuário:</h3>
                <div className="flex flex-wrap mt-2">
                    {permissionsUser.map((perm) => (
                        <div
                            key={perm.idSubSession}
                            className="bg-gray-200 p-2 rounded-lg mr-2 mb-2 flex items-center"
                        >
                            {perm.subSession.nameSubSession}
                            <button
                                className="ml-2 text-red-500"
                                onClick={() => removePermissionUser(perm.idPermission)}
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>
            </div>




            {/* Exibe a permissão selecionada */}
            {selectedPermission !== null && (
                <div className="mb-4">
                    <h3 className="font-bold">Permissão Selecionada:</h3>
                    <div className="flex flex-wrap mt-2">
                        {permissions
                            .filter((perm) => perm.idSubSession === selectedPermission)
                            .map((perm) => (
                                <div
                                    key={perm.idSubSession}
                                    className="bg-gray-200 p-2 rounded-lg mr-2 mb-2 flex items-center"
                                >
                                    {perm.nameSubSession}
                                    <button
                                        className="ml-2 text-red-500"
                                        onClick={removePermission}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Botão de submit */}
            <Button
                id="create_user_form_register_button"
                variant="outline"
                type="button"
                className="bg-blue-900 text-white justify-end items-end"
                onClick={handleSubmit}
            >
                Fazer Cadastro
            </Button>
        </div>
    );
}
