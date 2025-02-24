"use client";

import { useInformation } from "@/hooks/useInformation";
import { CardForAdvertisementWithoutLink } from './utils/shadcn_demo_components/card_with_ad_without_link';
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";

export function ClientComponent() {
    const { information, isLogin } = useInformation();

    return (
        <div id="anuncios-texto" className="flex-col w-4/12 px-6 h-96 overflow-y-scroll">
            <div id="advertisement-title-container" className="mb-2 font-bold flex items-center justify-between">
                <h1>Informações Gerais</h1>
                {isLogin && (
                    <Link href={"/dashboard/filesManagement"}>
                        <AddIcon />
                    </Link>
                )}
            </div>

            <div id="anuncio-texto-container" className="flex flex-col gap-3">
                {information.map((anuncio, i) => (
                    <CardForAdvertisementWithoutLink key={i} session={anuncio.nameDepartament} content={anuncio.description} />
                ))}
            </div>
        </div>
    );
}
