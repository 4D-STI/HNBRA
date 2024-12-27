"use client";

import React, { useEffect, useState } from "react";
import { SubSessionType } from "@/app/types/subSessionType ";
import {
    Table,
    TableBody,
    TableCell,
    // TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface SubSessionListProps {
    subSessions: SubSessionType[] | null;
}

export default function SubSessionList({ subSessions }: SubSessionListProps) {
    const [groupedSubSessions, setGroupedSubSessions] = useState<
        { nameSubSession: string; sessions: SubSessionType[] }[] | null
    >(null);

    useEffect(() => {
        if (subSessions) {
            const grouped = subSessions.reduce((acc, curr) => {
                if (curr.nameSubSession !== "DIVERSOS_ITENS") {
                    if (!acc[curr.nameSubSession]) {
                        acc[curr.nameSubSession] = [];
                    }
                    acc[curr.nameSubSession].push(curr);
                }
                return acc;
            }, {} as Record<string, SubSessionType[]>);

            setGroupedSubSessions(
                Object.entries(grouped).map(([nameSubSession, sessions]) => ({
                    nameSubSession,
                    sessions,
                }))
            );
        }
    }, [subSessions]);

    if (!groupedSubSessions) {
        return <div>Carregando...</div>;
    }

    return (
        <Table className="w-full">
            {/* <TableHeader>
                <TableRow>
                    <TableCell>Nome da Sessão</TableCell>
                </TableRow>
            </TableHeader> */}
            <TableBody>
                {groupedSubSessions.map((group, index) => (
                    <TableRow key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <TableCell className="text-left px-4 py-2 hover:bg-gray-50" >
                            <Link href={`/dashboard/subSessionFileList?item=${group.nameSubSession}`}>
                                <p>{group.nameSubSession.replace(/_/g, " ")}</p>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
