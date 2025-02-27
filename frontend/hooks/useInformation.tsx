"use client";

import { useState, useEffect } from "react";
import { InformationType } from "@/app/types/informationType";

export function useInformation() {
    const [information, setInformation] = useState<InformationType[]>([]);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // Verifica login
        if (localStorage?.getItem("token")) {
            setIsLogin(true);
        }

        // Busca informações da API
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/information`, {
                    cache: "no-store",
                });
                const data = await response.json();
                setInformation(data);
            } catch (error) {
                console.error("Erro ao buscar informações:", error);
            }
        };

        fetchData();
    }, []);

    return { information, isLogin };
}
