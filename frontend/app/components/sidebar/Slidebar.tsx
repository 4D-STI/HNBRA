// shadcn - sheet
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CardTitle } from "@/components/ui/card";
// icone
import { AlignJustify } from 'lucide-react';
import Link from "next/link";

export default function SlideBar() {
  return(
<Sheet>
  <SheetTrigger>
    {/* icone do menu */}
    <AlignJustify/>
  </SheetTrigger>
  
  {/* conteudo */}
  <SheetContent side={'left'} className="data-[state=open]:animate-in">
    {/* header */}
    <SheetHeader>
      <SheetTitle>A Divisão de informática é a melhor!</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>

    
    {/* footer */}
    <SheetFooter className="flex sm:justify-start">
      <CardTitle className="text-red-500">
        Este é um CardTitle do footer
      </CardTitle >
    </SheetFooter>

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
  </SheetContent>
</Sheet>
  )
};
