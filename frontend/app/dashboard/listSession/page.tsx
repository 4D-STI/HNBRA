import React from "react";
import SessionList from "./session";
import { SessionType } from "@/app/types/sessionType";

export default async function SubSessionPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const res = await fetch(`${apiBack}/session`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        console.error("Erro ao buscar arquivos");
        return <div>Erro ao carregar os arquivos.</div>;
    }


    const session: SessionType[] = await res.json();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Lista de Seções</h1>
            <SessionList sessions={session} />
        </div>
    );
}
