"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FileList from "../listSubSessionSession/file";
import { File } from "../../types/file";

export default function ListPage() {
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    const searchParams = useSearchParams();
    const router = useRouter();
    const item = searchParams.get("item");
    const teste = searchParams.get("teste");

    const url = React.useMemo(() => {
        if (item) return `${apiBack}/files/nameSub?nomeSubSession=${item}`;
        if (teste) return `${apiBack}/files/nameSub?idSubSession=${teste}`;
        return null;
    }, [apiBack, item, teste]);

    const [files, setFiles] = React.useState<File[]>([]); // Inicializado como array vazio
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!url) {
            setError("Erro: Parâmetro 'item' ou 'teste' não fornecido.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Erro ao buscar arquivos");
                }
                const data = await res.json();
                setFiles(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="div-list-file">
            <h1 className="text-2xl font-bold mb-4">
                Lista de Arquivos {(item ?? "").replace(/_/g, " ")}
            </h1>
            <button
                className="text-blue-500 underline mb-4"
                onClick={() => router.back()} // Navegar para a página anterior
            >
                voltar
            </button>
            <FileList files={files} />
        </div>
    );
}
