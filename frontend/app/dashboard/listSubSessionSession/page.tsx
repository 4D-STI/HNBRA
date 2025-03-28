"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListSubSessionSession from "./mover";
import { SubSessionType } from "@/app/types/subSessionType ";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/contracts/interfaces/IUser";
import { decodeJWT } from "../utils/decoderjwt";
import {CreateSessionDialog} from "./CreateSession"; // Importe o Dialog

export default function SubSessionPage() {
  const API = process.env.NEXT_PUBLIC_API_BACK;
  const searchParams = useSearchParams();
  const ITEM = searchParams.get("item");
  const SUBSESSION_NAME = searchParams.get("subsession_name");
  const router = useRouter();
  const [token, setToken] = useState<string | null>('');
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [subSessions, setsubSessions] = React.useState<SubSessionType[] | null>(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false); // Estado para controlar o dialogo

  const fetchData = useCallback(
    async () => {
      const res = await fetch(`${API}/subSession/session?idSession=${ITEM}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Erro ao buscar arquivos");
        return [];
      }

      return res.json();
    }, [ITEM, API]
  );

  React.useEffect(() => {
    fetchData().then(setsubSessions);
    setToken(localStorage?.getItem('token'));
    const fetchUserInfo = async () => {
      const decodedInfo = await decodeJWT();
      setUserInfo(decodedInfo);
    };
    fetchUserInfo();
  }, [ITEM, fetchData]);

  if (!subSessions) {
    return <div>Carregando...</div>;
  }

  if (!ITEM) {
    return <div>{"Erro: Parâmetro 'item' não fornecido."}</div>;
  }

  return (
    <div id="div-list-file">
      <h1 className="text-2xl font-bold mb-4">{(SUBSESSION_NAME ?? "").replace(/_/g, " ")}</h1>

      <div
        id="listSubSessionSession-buttons-container"
        className="flex flex-row gap-4"
      >
        <Button
          className="bg-blue-900 text-white mb-4 font-bold"
          onClick={() => router.back()} // Navegar para a página anterior
        >
          voltar
        </Button>

        {userInfo?.permission.includes('admin') && (
          <>
            <CreateSessionDialog
                open={isDialogOpened}
                setOpen={setIsDialogOpened}
                token={token}
                sessionId={parseInt(ITEM)}
                sessionName={SUBSESSION_NAME}
            />
          </>
        )}
      </div>

      <ListSubSessionSession subSessions={subSessions} />
    </div>
  );
}
