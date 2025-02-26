"use client";

import React, { useEffect, useState } from "react";
import { File } from "../../types/file";
import { IconButton } from '@mui/material'; // Usando Material UI como exemplo
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";

interface FileListProps {
    files: File[];
}

interface iHandleDownload {
    idFile?: number,
    nameFile?: string,
    previewOnly?: boolean
}

export default function FileList({ files }: FileListProps) {
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
        const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio
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
        const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio
        if (storedToken != '') {
            fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/verifyJwt`, {
                method: 'POST',
                // cache: 'no-store',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jwt: storedToken }),
            }).then((res) => {
                if (!res.ok) {
                    setIslogin(false);
                    localStorage.removeItem('token');
                } else {
                    setIslogin(true);
                }
                return res.json();
            })
            // .then((data) => console.log('Token verificado:', data))
            // .catch(() => { alert("Login inválido!"), window.location.href = '/' });
        }
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * filesPerPage;
    const paginatedFiles = files.slice(startIndex, startIndex + filesPerPage);

    if (!files || files.length === 0) {
        return <div>Nenhum arquivo encontrado.</div>;
    }

    return (
        <div id="lis-file-comp" className="">
            <Table className="w-auto">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        {/* <TableCell className="text-left px-4 py-2 font-bold">Arquivo</TableCell>
                            <TableCell className="text-left px-4 py-2 font-bold">Download</TableCell> */}
                    </TableRow>
                </TableHeader>
                <TableBody className="flex flex-col">

                    {paginatedFiles.map((file, index) => (

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
