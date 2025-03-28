"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FileList from "@/app/dashboard/listSubSessionSession/file";
import { File } from "@/app/types/file";
import Link from "next/link";
import { verifyJwt } from "../dashboard/utils/verifyjwt";
import { decodeJWT } from "../dashboard/utils/decoderjwt";
import { Button } from "@/components/ui/button";
import {UploadFile} from '@/components/custom/UploadFile'



export default function ListPage() {
    //Lista SubSession a partir de nome ou id
    const apiBack = process.env.NEXT_PUBLIC_API_BACK;
    // const apiBack = process.env.NEXT_PUBLIC_API_LOCAL;
    const searchParams = useSearchParams();
    const item = searchParams.get("item");
    // const teste = searchParams.get("teste");
    const PLANO_DO_DIA_ID = '6';
    const [validToken, setValidToken] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');

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

    // // Executa a busca ao carregar ou quando a URL muda
    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);


    useEffect(() => {
        decodeJWT();
        verifyJwt(setValidToken, PLANO_DO_DIA_ID,);
        setToken(localStorage.getItem("token") || "")
        fetchData()
        // .catch(() => { alert("Login inválido!"), window.location.href = '/' });
    }, [fetchData]);

    const handleUploadSuccess = () => {
        fetchData(); // Recarrega os arquivos após o upload bem-sucedido
      };

    if (loading) return <div>Carregando...</div>;
    
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col justify-center items-center">
            
            <h1 className="text-2xl font-bold mt-6">
                Lista de Arquivos {(files[0].nomeSubSession ?? "").replace(/_/g, " ")}
            </h1>

            <div id="container-plano-do-dia" className="flex flex-col items-center gap-2 my-4">



                {validToken && 
                    (
                        <div className="">
                            {/* <h2>Edição Plano do Dia</h2> */}
                            <UploadFile 
                                onUploadSuccess={handleUploadSuccess}
                                subSessionId={PLANO_DO_DIA_ID}
                                token={token}
                                label="Enviar Plano do Dia"
                            />

                            
                        </div>
                    )
                }  

                <div>
                    <Link href={'/'}>
                        <Button
                            className="bg-blue-900"
                        >
                            voltar
                        </Button>
                    </Link>
                </div>

            </div>

        
            <FileList files={files} idSubSession={PLANO_DO_DIA_ID} />


        </div>
    );
}
