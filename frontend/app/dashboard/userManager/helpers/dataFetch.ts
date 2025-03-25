'use client'
import axios from "axios"
import { useState, useEffect } from "react";
import { IUser } from "../../utils/mocks/users_mock";

// Variaveis
const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BACK}`


export default function useGetAllUsers() {
    // requisição para buscar lista de usuarios
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        // Requisição
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL_BASE}/users`)
                setUsers(response.data)
            } catch (error) {
                console.log('Erro ao buscar usuários: ', error);
            } finally {
            }
        }
        fetchUsers()
    }, []);

    console.log('Buscou usuario VVV \r', users);

    return { users }

}
