"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ListSubSessionSession from "../mover";
import { SubSessionType } from "@/app/types/subSessionType ";


export default function SubSessionPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const searchParams = useSearchParams();
    const item = searchParams.get("item");
    const teste = searchParams.get("teste");

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
            <h1 className="text-2xl font-bold mb-4">Lista de Arquivos {(teste ?? "").replace(/_/g, " ")}</h1>
            <a href="/dashboard/listSession">voltar</a>
            <ListSubSessionSession subSessions={subSessions} />
        </div>
    );
}
