"use client";

import React, { useState } from "react";
import { File } from "../../types/file";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
// import Link from "next/link";

interface FileListProps {
    files: File[];
}

export default function FileList({ files }: FileListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 15;
    const totalPages = Math.ceil(files.length / filesPerPage);

    const handleDownload = (idFile: number, previewOnly?: boolean) => {
        // const fileUrl = `${process.env.NEXT_PUBLIC_API_BACK}/files/${idFile}/download/`;
        const fileUrl = `/api/files/${idFile}/download/`;
        console.log("Iniciando download...");
        if (previewOnly) {
            window.open(fileUrl, "_blank");
        } else {
            window.location.href = fileUrl
        }
    };

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
        <div id="lis-file-comp">
            <Table className="w-full">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableCell className="text-left px-4 py-2 font-bold">Arquivo</TableCell>
                        <TableCell className="text-left px-4 py-2 font-bold">Descrição</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedFiles.map((file, index) => (
                        <TableRow
                            key={file.idFile}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                            <TableCell className="text-left px-4 py-2">{file.nameFile.slice(0, -4)}</TableCell>
                            <TableCell
                                className="text-left px-4 py-2 text-blue-600 cursor-pointer hover:underline"
                                onClick={() => handleDownload(file.idFile, file.previewOnly)}
                            >
                                {file.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    {/* Botão anterior */}
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>
                    )}

                    {/* Links das páginas */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                className={currentPage === index + 1 ? "font-bold text-blue-600" : ""}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Botão próximo */}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>

        </div>
    );
}
