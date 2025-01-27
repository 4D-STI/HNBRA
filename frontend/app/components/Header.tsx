"use client";
import { ContrastIcon } from 'lucide-react';
import Login from "@/app/components/login/Login";
import Image from "next/image";
import LogoHnbra from "@/public/images/Logo_HNBra.png";
import React, { useState } from 'react';
import MobileMenu from './mobilemenu/Mobilemenu';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (    
        <header className="shadow-sm text-blue-900 bg-white">
            <div id="container" className="flex container max-w-screen-xl mx-auto p-2 h-28 items-center">
                <div id="container-top" className="flex justify-between items-center p-">
                    {/* <Link href={"/"}>
                        <div id="container-titulo-2" className="flex flex-col px-4">
                            <p
                                className="text-3xl"
                            >Hospital Naval de Brasília
                            </p>
                        </div>
                    </Link> */}
                    <Link href={"/"}>
                        <div id="container-logo-titulo" className="flex 
                     items-center">
                            <Image
                                src={LogoHnbra}
                                alt="Logo"
                                className="w-30 h-22 mr-4" //REDIMENCIONAR
                                priority
                            />

                            <div id='logo-text-container' className='flex flex-col'>
                                <h1
                                    className="text-3xl font-bold"
                                > Hospital Naval de Brasília
                                </h1>

                                <span>{`"A Saúde Naval no Planalto Central"`}</span>
                            </div>
                        </div>
                    </Link>

                    <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="hidden md:flex text-base">
                        <ul className="flex items-center justify-end mx-16">
                            <li className="mr-4"><a href="#">Órgãos do governo</a></li>
                            <li className="mr-4"><a href="#">Acesso à informação</a></li>
                            <li className="mr-4"><a href="#">Legislação</a></li>
                            <li className="mr-4"><a href="#">Acessibilidade</a></li>
                        </ul>
                    </div>
                    <div id="dark-mode" className="flex p-2 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
                        <ContrastIcon />
                    </div>
                    <div id="button_login" className="flex items-center mx-4">
                        <Login />
                    </div>
                </div>

                <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
        </header>
    );
}
