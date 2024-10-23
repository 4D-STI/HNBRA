"use client"; 
import { ContrastIcon } from 'lucide-react';
import Login from "@/app/components/login/Login";
import Image from "next/image";
import Slidebar from "@/app/components/sidebar/Slidebar";
import Logo from "@/app/assets/logo_hnbra.png";
import Search from "@/app/components/search/Search";
import React, { useState } from 'react';
import MobileMenu from './mobilemenu/Mobilemenu'; 

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="shadow-sm text-blue-900 bg-white">
            <div id="container" className="container max-w-screen-xl mx-auto p-2">
                <div id="container-top" className="flex justify-between items-center p-2">
                    <div id="container-logo-titulo" className="flex items-center">
                        <Image src={Logo} alt="Logo" className="w-10 h-16" />
                        <h1 className="text-xl px-4">Marinha do Brasil</h1>
                    </div>
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
                            <li className="mr-4"><a href="#">Órgãos do governo TESTE</a></li>
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

                <div id="container-low" className="flex md:flex-row items-center p-2">
                    <div id="container-menu" className='flex p-2 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer'>
                        <Slidebar />
                    </div>
                    <div id="container-titulo-2" className="flex flex-col px-4">
                        <h2 className="text-xl font-bold">HNBRA</h2>
                        <p className="text-xl">Hospital Naval De Brasília</p>
                    </div>
                    <div className="flex items-end ml-auto">
                        <Search />
                    </div>
                </div>
            </div>
        </header>
    );
}
