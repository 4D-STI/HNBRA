'use client'

import { decodeJWT } from "@/app/dashboard/utils/decoderjwt";
import { UploadFile } from "@/components/custom/UploadFile";
import Link from "next/link";
import { useEffect, useState } from "react";
import {IUser} from "@/app/contracts/IUser"

const CARDAPIO_SUB_SESSION_ID = 7
const API = process.env.NEXT_PUBLIC_API_BACK

export default function ShortcutButton () {
    const [token, setToken] = useState<string | null>('')
    const [userInfo, setUserInfo] = useState<IUser | null>(null)

    useEffect(() => {
        setToken(localStorage?.getItem('token'))
        const fetchUserInfo = async () => {
            const decodedInfo = await decodeJWT()
            setUserInfo(decodedInfo)
        }
        fetchUserInfo()
    }, [])

    return (
        <>
            { userInfo?.permissionUsers.includes(CARDAPIO_SUB_SESSION_ID) &&
                (
                    <div id="container-cardapio-button">
                        <UploadFile 
                            token={token}
                            subSessionId={"7"}
                            onUploadSuccess={function (): void {}}
                            label="Enviar Cardápio"
                        />
                    </div>
                )
            }

                { !userInfo?.permissionUsers.includes(CARDAPIO_SUB_SESSION_ID) &&
                    (<Link id="cardapio-view-link" href={`${API}/files/7/viewLast`} target="_blank">
                        <div 
                            id="container-cardapio-button"
                            className={`
                                hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer`
                            }
                        >
                        <p id="cardapio-text" className='truncate'>Cardápio</p>
                        </div>
                    </Link>)
                }
        </>
    )
}
