"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListSubSessionSession from "./mover";
import { SubSessionType } from "@/app/types/subSessionType ";


export default function SubSessionPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const searchParams = useSearchParams();
    const item = searchParams.get("item");
    const teste = searchParams.get("teste");
    const router = useRouter();

    if (!item) {
        return <div>Erro: Parâmetro 'item' não fornecido.</div>;
    }

    const fetchData = async () => {
        const res = await fetch(`${apiBack}/subSession/session?idSession=${item}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Erro ao buscar arquivos");
            return [];
        }

        return res.json();
    };

    const [subSessions, setsubSessions] = React.useState<SubSessionType[] | null>(null);


    React.useEffect(() => {
        fetchData().then(setsubSessions);
    }, [item]);

    if (!subSessions) {
        return <div>Carregando...</div>;
    }

    return (
        <div id="div-list-file">
            <h1 className="text-2xl font-bold mb-4"> {(teste ?? "").replace(/_/g, " ")}</h1>
            <button
                className="text-blue-500 underline mb-4"
                onClick={() => router.back()} // Navegar para a página anterior
            >
                voltar
            </button>
            <ListSubSessionSession subSessions={subSessions} />
        </div>
    );
}
