"use client";

import React, { useEffect, useMemo, useState } from "react";
import { File } from "../../types/file";
import { IconButton } from '@mui/material'; // Usando Material UI como exemplo
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    Table,
    TableBody,
    TableCell,
    // TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import { FileSortingStrategy } from "../utils/strategy/file_sorting/FileSortingStrategy";
import { verifyJwt } from "../utils/verifyjwt";
// import Link from "next/link";

interface FileListProps {
    files: File[];
    idSubSession: string;
}

interface iHandleDownload {
    idFile?: number,
    nameFile?: string,
    previewOnly?: boolean
}

export default function FileList({ files, idSubSession }: FileListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 10;
    const totalPages = Math.ceil(files.length / filesPerPage);
    const [isLogin, setIslogin] = useState(false);


    const handleDownload = (params: iHandleDownload) => {
        const FILE_URL_DOWNLOAD = `${process.env.NEXT_PUBLIC_API_BACK}/files/${params.idFile}/download/`;
        const FILE_URL_VIEW = `${process.env.NEXT_PUBLIC_API_BACK}/files/${params.nameFile}/view`;
        if (params.previewOnly) {
            window.open(FILE_URL_VIEW, "_blank");
        } else {
            window.open(FILE_URL_DOWNLOAD, "_blank");

        }
    };

    const handleDelete = async (params: iHandleDownload, nameFiles: string) => {
        const storedToken = localStorage?.getItem("token") || ""; // Valor padrão vazio
        const FILE_URL_DELETE = `${process.env.NEXT_PUBLIC_API_BACK}/files/${params.idFile}`;
        if (window.confirm(`Deseja apagar o arquivo: ${nameFiles}`)) {
            try {
                const response = await fetch(FILE_URL_DELETE, {
                    method: 'DELETE',
                    cache: 'no-store',
                    headers: {
                        Authorization: 'Bearer ' + storedToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar o arquivo');
                }

                window.location.reload();
            } catch (error) {
                console.error('Erro:', error);
            }
        }

    };

    useEffect(() => {
        const storedToken = localStorage?.getItem("token") || ""; // Valor padrão vazio
        if (storedToken != '') {
            verifyJwt(setIslogin, idSubSession);
        }
    }, [idSubSession]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * filesPerPage;
    const paginatedFilesData = files.slice(startIndex, startIndex + filesPerPage);

    // STRATEGY de ordenação
    const orderedFiles = useMemo(() => {
        // instância do contexto da estrategia de ordenação
        const fileSorter = new FileSortingStrategy(paginatedFilesData)
        return fileSorter.sortFiles(paginatedFilesData)
    }, [paginatedFilesData])

    if (!files || files.length === 0) {
        return <div>Nenhum arquivo encontrado.</div>;
    }

    return (
        <div id="lis-file-comp" className="">
            <Table className="w-auto">
                <TableBody className="flex flex-col">

                    {orderedFiles.map((file, index) => (

                        <TableRow key={index} className="flex bg-white rounded-xl mb-1">
                            <Link
                                key={index}
                                href={`https://www.hnbra.mb:3002/files/${file.nameFile}/view`}
                                target="_blank"
                                className="flex flex-row w-full items-end justify-between hover:bg-blue-300 rounded-xl"
                            >
                                <TableRow key={file.idFile}>
                                    <TableCell className="text-left px-4 py-2">{file.nameFile.slice(0, -4).replace(/_/g, " ")}</TableCell>
                                </TableRow>
                                <IconButton
                                    // onClick={() => handleDownload({nameFile: file.nameFile, previewOnly: true})}
                                    aria-label="vizualização"
                                    sx={{
                                        '&:hover': {
                                            bgcolor: "OKLCH(0.809 0.105 251.813)"
                                        },
                                        'borderRadius': '30%'
                                    }}
                                >
                                    <VisibilityIcon className="text-blue-600" />
                                </IconButton>
                            </Link>
                            <IconButton
                                onClick={() => handleDownload({ idFile: file.idFile, previewOnly: false })}
                                aria-label="download"
                                sx={{
                                    '&:hover': {
                                        bgcolor: "OKLCH(0.809 0.105 251.813)"
                                    },
                                    'borderRadius': '30%'
                                }}
                            >
                                <DownloadIcon className="text-blue-600" />
                            </IconButton>
                            {isLogin && (
                                <IconButton
                                    onClick={() => handleDelete({ idFile: file.idFile }, file.nameFile)}
                                    aria-label="delete"
                                    sx={{
                                        '&:hover': {
                                            bgcolor: "OKLCH(0.809 0.105 251.813)"
                                        },
                                        'borderRadius': '30%'
                                    }}
                                >
                                    <DeleteForeverIcon className="text-red-600" />
                                </IconButton>
                            )}
                        </TableRow >
                    ))}
                </TableBody>
            </Table>

            <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />

        </div >
    );
}
