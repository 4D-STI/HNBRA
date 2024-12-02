// import Image from "next/image";
import { Grip } from 'lucide-react';
import Link from 'next/link'
// import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    
    <div id="container-buttons-pages" className=" space-x-32 bg-red-100 flex max-w-screen p-2 items-center mx-auto">
      
      <div id="container-shortcut-button" className="flex px-8 py-2 ml-32 items-center hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">

        <div id="container-shortcut-icon" className="flex mr-4">
            <Grip/>
        </div>

        <div id="shortcut-title">
          <p>Acesso rápido</p>
        </div>
      </div>
      

      <div id="container-dashboard-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
        <Link href="/dashboard">
          <p>Ir para Dashboard</p>
        </Link>
      </div>

      <div id="container-userManager-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
        <Link href="/dashboard/gerenciarUsuarios">
          <p>Ir para Gerenciamento de Usuários</p>
        </Link>
      </div>

    </div>
     
  );
}
