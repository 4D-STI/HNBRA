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
  return(
    <Sheet>
      <SheetTrigger className="p-2">
        {/* icone do menu */}
        <AlignJustify/>
      </SheetTrigger>
      
      {/* conteudo */}
      <SheetContent side={'left'} className="flex flex-col data-[state=open]:animate-in ">
        {/* componente dos menus do sideBar */}
        <AccordionSideBar />
      </SheetContent>
    </Sheet>
  )
};
