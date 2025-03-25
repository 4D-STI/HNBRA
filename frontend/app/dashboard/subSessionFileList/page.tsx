"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FileList from "../listSubSessionSession/file";
import { File } from "../../types/file";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import { verifyJwt } from "../utils/verifyjwt";

export default function ListPage() {
    //Lista SubSession a partir de nome ou id
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const searchParams = useSearchParams();
    const router = useRouter();
    const SUBSESSION_NAME = searchParams.get("SubSessionFileList_name");
    const SUBSESSION_ID = searchParams.get("SubSessionFileList_id") || "";

    const url = React.useMemo(() => {
        if (SUBSESSION_NAME) return `${apiBack}/files/nameSub?nomeSubSession=${SUBSESSION_NAME}`;
        if (SUBSESSION_ID) return `${apiBack}/files/nameSub?idSubSession=${SUBSESSION_ID}`;
        return null;
    }, [apiBack, SUBSESSION_NAME, SUBSESSION_ID]);

    const [files, setFiles] = React.useState<File[]>([]); // Inicializado como array vazio
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [edition, setTokenExpiered] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        if (!url) {
            setError("Erro: Parâmetro 'item' ou 'teste' não fornecido.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) throw new Error("Erro ao buscar arquivos");
            const data = await res.json();
            setFiles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, [url]);

    // Executa a busca ao carregar ou quando a URL muda
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        verifyJwt(setTokenExpiered, SUBSESSION_ID);
        // .catch(() => { alert("Login inválido!"), window.location.href = '/' });
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="div-list-file">
            {edition && (
                <div className="flex flex-col justify-end items-end -translate-x-6">
                    <h2>Edição </h2>
                    <Link href={`/dashboard/filesManagement?SubSessionFileList_id=${SUBSESSION_ID}`}>
                        <EditIcon id="plano-do-dia-text" className='truncate'></EditIcon>
                    </Link>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">
                Lista de Arquivos {(SUBSESSION_NAME ?? "").replace(/_/g, " ")}
            </h1>
            <button
                className="text-blue-500 underline mb-4"
                onClick={() => router.back()} // Navegar para a página anterior
            >
                voltar
            </button>
            <FileList files={files} idSubSession={SUBSESSION_ID} />
        </div>
    );
}
