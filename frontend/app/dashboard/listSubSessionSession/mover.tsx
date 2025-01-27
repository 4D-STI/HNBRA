"use client";

import React, { useState } from "react";
// import { File } from "../../types/file";
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
import Link from "next/link";
import { SubSessionType } from "@/app/types/subSessionType ";

interface SubSessionProps {
    subSessions: SubSessionType[];
}

export default function ListSubSessionSession({ subSessions: subSessions }: SubSessionProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const SubSessionsPerPage = 50;
    const totalPages = Math.ceil(subSessions.length / SubSessionsPerPage);

    // const handleDownload = (idFile: number) => {
    //     console.log("Iniciando download...");
    //     window.location.href = `${process.env.NEXT_PUBLIC_API_BACK}/files/${idFile}/download/`;
    // };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * SubSessionsPerPage;
    const paginatedSubSessions = subSessions.slice(startIndex, startIndex + SubSessionsPerPage);

    if (!subSessions || subSessions.length === 0) {
        return <div>Nenhum arquivo encontrado.</div>;
    }

    return (
        <div id="list-subSession-comp">
            <Table className="w-full">
                <TableHeader className="bg-gray-100">
                    {/* <TableRow>
                        <TableCell className="text-left px-4 py-2 font-bold">Arquivo</TableCell>
                    </TableRow> */}
                </TableHeader>
                <TableBody>
                    {paginatedSubSessions.map((subSession, index) => (
                        <TableRow
                            key={subSession.idSession}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        ><TableCell className="text-left px-2 py-2">
                                {/* <TableCell className="text-left px-4 py-2">{subSession.nameSubSession}</TableCell> */}
                                {/* <TableCell className="text-left px-4 py-2">{subSession.idSubSession}</TableCell> */}
                                <Link href={`/dashboard/subSessionFileList?SubSessionFileList_id=${subSession.idSubSession}`}>
                                    <p>{subSession.nameSubSession.replace(/_/g, " ")}</p>
                                </Link>
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
