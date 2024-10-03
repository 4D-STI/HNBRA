import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Settings, User } from 'lucide-react';
import Login from "@/app/components/Login";
import Image from "next/image";
import Slidebar from "./Slidebar";
import Logo from "@/app/assets/logo_hnbra.png";
import Search from "@/app/components/Search"

export default function Header() {
  return (
    <header className="bg-gray-50 shadow-sm">
      <div id="container" className="container max-w-screen-lg mx-auto p-4">
      <div id="container-top" className="flex flex-col md:flex-row items-center justify-between">
            <div id="container-logo-titulo"className="flex items-center"><Image src={Logo} alt="Logo" width={40} height={60} />
            <span className="vertical mx-2"></span>
            <h1 className="text-base">Marinha do Brasil</h1>
            </div>
            <div>
            <ul className="flex flex-wrap items-center justify-end mx-16">
              <li className="mr-4 text-sm">Orgãos do governo</li>
              <li className="mr-4 text-sm">Acesso à informação</li>
              <li className="mr-4 text-sm">Legislação</li>
              <li className="mr-4 text-sm">Acessibilidade</li>
            </ul>
             </div> 
              <div className="divider w-0.5 bg-slate-800"></div>
              <div id="button_login" className="flex items-end mx-4">
                <Login />
          </div>
        </div>
        <div id="container-low" className="flex md:flex-row items-center p-2 ">
        <div id="container-menu">
          <Slidebar/>
        </div>
  
         <div id="container-titulo-2" className="flex flex-col px-1">
      <h2 className="font-bold">HNBRA</h2>
     <p className="font-normal">Hospital Naval De Brasília</p>
   </div>
  
     <div className="flex items-end ml-auto"> 
    <Search/>
  </div>
</div>

      </div>
    </header>
  );
}