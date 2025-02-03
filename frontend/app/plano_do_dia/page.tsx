"use client";

import React, { useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FileList from "@/app/dashboard/listSubSessionSession/file";
import { File } from "@/app/types/file";


export default function ListPage() {
    //Lista SubSession a partir de nome ou id
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    // const apiBack = process.env.NEXT_PUBLIC_API_LOCAL;
    const searchParams = useSearchParams();
    const router = useRouter();
    const item = searchParams.get("item");
    // const teste = searchParams.get("teste");
    const PLANO_DO_DIA_ID = '6';

    const handleGoBack = () => window.history.length > 1 ? router.back() : router.push('/')

    const url = React.useMemo(() => {
        if (item) return `${apiBack}/files/nameSub?nomeSubSession=${item}`;
        if (PLANO_DO_DIA_ID) return `${apiBack}/files/nameSub?idSubSession=${PLANO_DO_DIA_ID}`;
        return null;
    }, [apiBack, item, PLANO_DO_DIA_ID]);

    const [files, setFiles] = React.useState<File[]>([]); // Inicializado como array vazio
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!url) {
            setError("Erro: Parâmetro 'item' ou 'ID' não fornecido.");
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

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="container-plano-do-dia" className="flex flex-col justify-center items-center">
            
            <h1 className="text-2xl font-bold mb-4">
                Lista de Arquivos {(item ?? "").replace(/_/g, " ")}
            </h1>
            
            <button
                className="hover:text-blue-500 hover:underline mb-4"
                onClick={handleGoBack} // Navegar para a página anterior
            >
                voltar
            </button>
            
            <FileList files={files} />
        </div>
    );
}
