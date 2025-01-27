// shadcn - sheet
import {
  Sheet,
  // SheetOverlay,
  SheetTrigger,
  SheetContent,
  // SheetHeader,
  // SheetTitle,
} from "@/components/ui/sheet"
import { AccordionSideBar } from '@/app/components/utils/shadcn_demo_components/accordion_sidebar';
// icone
import { AlignJustify } from 'lucide-react';

export default function SlideBar() {
  return (
    <Sheet>
      <SheetTrigger className="flex flex-row gap-x-2 hover:bg-blue-300 transition duration-200 rounded-full px-4 items-center h-10">
        {/* icone do menu */}
        <AlignJustify />

        <div id="container-titulo-2" className="">
            <p className="text-2xl">Menu principal</p>
        </div>
      </SheetTrigger>

      {/* conteudo */}
      <SheetContent side={'left'} className="flex flex-col data-[state=open]:animate-in ">
        {/* componente dos menus do sideBar */}
        <AccordionSideBar />
      </SheetContent>
    </Sheet>
  )
};
