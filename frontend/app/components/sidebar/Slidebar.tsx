// shadcn - sheet
import {
  Sheet,
  // SheetOverlay,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AccordionDemo } from '@/app/components/utils/shadcn_demo_components/accordion';
// icone
import { AlignJustify } from 'lucide-react';
import LinkSlideBar from "./components/LinkCustom";
// mock do mapeamento de links da pagina home do hnbra-intranet
import {internalUseLinks} from './utils/links_mapping'

export default function SlideBar() {
  return(
    <Sheet>
      <SheetTrigger className="p-2">
        {/* icone do menu */}
        <AlignJustify/>
      </SheetTrigger>
      
      {/* conteudo */}
      <SheetContent side={'left'} className="flex flex-col data-[state=open]:animate-in ">
        <AccordionDemo/>

        {/* header */}
        <SheetHeader id="slidebar-tittle-1-menu-principal"> 
          <SheetTitle>Uso Interno</SheetTitle>
        </SheetHeader>      

          { internalUseLinks.map((link, index) => 
              <LinkSlideBar key={index} text={link.name}/>
          )}     
      </SheetContent>
    </Sheet>
  )
};
