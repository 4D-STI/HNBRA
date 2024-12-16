import React from "react";
import SubSessionList from "./subSession";
import { SubSessionType } from "@/app/types/subSessionType ";

export default async function SubSessionPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    // busca a api a rela dos ids das sessões
    const res = await fetch(`${apiBack}/subSession`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        console.error("Erro ao buscar arquivos");
        return <div>Erro ao carregar os arquivos.</div>;
    }


    const subSession: SubSessionType[] = await res.json();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Lista de Subseção</h1>
            <SubSessionList subSessions={subSession} />
        </div>
    );
}
