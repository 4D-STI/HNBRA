"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FileList from "../listSubSessionSession/file";
import { File } from "../../types/file";
import { SubSessionDescription } from "./SubSessionDescription";
import descriptionMap from "./descriptions/descriptionsMap";
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

    console.log("ID >> ", SUBSESSION_ID);
    

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
    }, [SUBSESSION_ID]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="div-list-file" className="flex flex-col">

            {edition && (
                <div className="flex flex-col justify-end items-end -translate-x-6">
                    <h2>Edição </h2>
                    <Link href={`/dashboard/filesManagement?SubSessionFileList_id=${SUBSESSION_ID}`}>
                        <EditIcon id="plano-do-dia-text" className='truncate'></EditIcon>
                    </Link>
                </div>
            )}
            {/* cabeçalho */}
            <div id="fileList-header-container" className="flex flex-row justify-center gap-8 items-center mb-6">

                <h1 className="text-2xl font-bold mb-4">
                    Lista de Arquivos {(files[0]?.nomeSubSession ?? "").replace(/_/g, " ")}
                </h1>

                <button
                    className="text-blue-600 hover:underline mb-4 p-2 bg-white w-20 rounded-2xl text-nowrap"
                    onClick={() => router.back()} // Navegar para a página anterior
                >
                    {'voltar'}
                </button>
            </div>

            {/* conteudo */}
            <div id="content-container" className="flex flex-row gap-8 h-[600px]">

                {/* Descrição */}
                {(descriptionMap({id: SUBSESSION_ID ?? ''})) && (
                    <div className="flex w-1/2 px-8 h-auto justify-center">
                        <SubSessionDescription id={SUBSESSION_ID ?? ''} />
                        {/* {descriptionMap({id: SUBSESSION_ID})} */}
                    </div>

                )}
                {/* List de arquivos */}
                {files ? (
                    <FileList files={files} idSubSession={SUBSESSION_ID} />
                ): <p>Não existem arquivos nesta sessão!</p>}
                
            </div>
        </div>



    );
}
