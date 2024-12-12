"use client";

import React, { useEffect, useState } from "react";
import { SessionType } from "@/app/types/sessionType"; // Ajuste esse tipo conforme o formato real dos dados
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface SessionListProps {
    sessions: SessionType[] | null;
}

export default function SessionList({ sessions }: SessionListProps) {
    if (!sessions) {
        return <div>Carregando...</div>;
    }

    return (
        <Table className="w-full">
            <TableBody>
                {sessions.map((session, index) => (
                    <TableRow
                        key={session.idSession} // Usando idSubSession para chave única
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                        <TableCell className="text-left px-4 py-2 hover:bg-gray-50">
                            <Link href={`/dashboard/listSubSessionSession?item=${session.idSession}&teste=${session.nameSession}`} onClick={() => console.log(session.idSession)}
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
        </Table>
    );
}
