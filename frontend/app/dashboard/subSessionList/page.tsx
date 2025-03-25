"use client";

import React, { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FileList from "../listSubSessionSession/file";
import { File } from "../../types/file";


export default function ListPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const searchParams = useSearchParams();
    const item = searchParams.get("item");


    // busca a rela dos links na api
    // 
    const fetchData = useCallback(
        async () => {
            const res = await fetch(`${apiBack}/files/nameSub?nomeSubSession=${item}`, {
                cache: "no-store",
            });

            if (!res.ok) {
                console.error("Erro ao buscar arquivos");
                return [];
            }

            return res.json();
        }, [item, apiBack]
    )

    const [files, setFiles] = React.useState<File[] | null>(null);

    React.useEffect(() => {
        fetchData().then(setFiles);
    }, [item, fetchData]);

    if (!item) {
        return <div>{"Erro: Parâmetro 'item' não fornecido."}</div>;
    }

    if (!files) {
        return <div>Carregando...</div>;
    }

    return (
        <div id="div-list-file">
            <h1 className="text-2xl font-bold mb-4">Lista de Arquivos {item.replace(/_/g, " ")}</h1>
            <a href="/dashboard/listSubSession">voltar</a>
            <FileList files={files} />
        </div>
    );
}
