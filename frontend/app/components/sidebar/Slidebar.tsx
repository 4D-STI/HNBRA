import { CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
<<<<<<< Updated upstream
import { AlignJustify } from 'lucide-react';

export default function SlideBar() {
  return(
<Sheet>
  <SheetTrigger><AlignJustify/></SheetTrigger>
  <SheetContent side={'left'} className="data-[state=open]:animate-in">
    <SheetHeader>
      <SheetTitle>A Divisão de informática é a melhor!</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter className="sm:justify-start">
      <CardTitle className="text-red-500">
        Este é um CardTitle do footer
      </CardTitle >
    </SheetFooter>
  </SheetContent>
</Sheet>
=======
import { AccordionDemo } from '@/app/components/utils/shadcn_demo_components/accordion_sidebar';
// icone
import { AlignJustify } from 'lucide-react';

export default function SlideBar() {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        {/* icone do menu */}
        <AlignJustify />
      </SheetTrigger>

      {/* conteudo */}
      <SheetContent side={'left'} className="flex flex-col data-[state=open]:animate-in ">
        {/* componente dos menus do sideBar */}
        <AccordionDemo />
      </SheetContent>
    </Sheet>
>>>>>>> Stashed changes
  )
};
