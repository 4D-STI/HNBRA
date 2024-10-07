import { ContrastIcon } from 'lucide-react';
import Login from "@/app/components/Login";
import Image from "next/image";
import Slidebar from "./Slidebar";
import Logo from "@/app/assets/logo_hnbra.png";
import Search from "@/app/components/Search"

export default function Header() {
  return (
    <header className="shadow-sm text-blue-900 bg-blue-50">
      <div id="container" className="container max-w-screen-xl mx-auto p-2">
      <div id="container-top" className="flex justify-between items-center p-2">
            <div id="container-logo-titulo"className="flex items-center">
              <Image src={Logo} alt="Logo" className="w-10 h-16"/>
            <h1 className="text-xl px-4">Marinha do Brasil</h1>
            </div>
            <div className="sm: hidden md:flex text-lg">
            <ul className="flex  items-center justify-end mx-16">
              <li className="mr-4"><a>Orgãos do governo</a></li>
              <li className="mr-4"><a>Acesso à informação</a></li>
              <li className="mr-4"><a>Legislação</a></li>
              <li className="mr-4"><a>Acessibilidade</a></li>
            </ul>
             </div>
             <div id="dark-mode" className="flex p-2 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer"><ContrastIcon className=""></ContrastIcon></div>
              <div id="button_login" className="flex items-center mx-4">
                <Login />
          </div>
        </div>
        <div id="container-low" className="flex md:flex-row items-center p-2">
        <div id="container-menu" className='flex p-2 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer'>
          <Slidebar></Slidebar>
        </div>
  
         <div id="container-titulo-2" className="flex flex-col px-4">
      <h2 className=" text-xl font-bold">HNBRA</h2>
     <p className="text-x1">Hospital Naval De Brasília</p>
   </div>
  
     <div className="flex items-end ml-auto"> 
    <Search/>
  </div>
</div>

      </div>
    </header>
  );
}