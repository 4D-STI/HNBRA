"use client";

import React from "react";
import { SessionType } from "@/app/types/sessionType"; // Ajuste esse tipo conforme o formato real dos dados
import {
    Table,
    TableBody,
    TableCell,
    // TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SessionListProps {
    sessions: SessionType[] | null;
}

export default function SessionList({ sessions }: SessionListProps) {
    const router = useRouter();
    
    if (!sessions) {
        return <div>Carregando...</div>;
    }

    return (
        <><button
            className="text-blue-500 underline mb-4"
            onClick={() => router.back()} // Navegar para a página anterior
        >
            voltar
        </button><Table className="w-full">
                <TableBody>
                    {sessions.map((session, index) => (
                        <TableRow
                            key={session.idSession} // Usando idSubSession para chave única
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                            <TableCell className="text-left px-4 py-2 hover:bg-gray-50">
                                <Link href={`/dashboard/listSubSessionSession?item=${session.idSession}&subsession_name=${session.nameSession}`} onClick={() => console.log(session.idSession)}
                                >
                                    <p>{session.nameSession}</p>
                                </Link>
                            </TableCell>
                            <TableCell className="text-left px-4 py-2">{session.status}</TableCell>
                            <TableCell className="text-left px-4 py-2">
                                {new Date(session.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-left px-4 py-2">
                                {new Date(session.updatedAt).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table></>
    );
}
