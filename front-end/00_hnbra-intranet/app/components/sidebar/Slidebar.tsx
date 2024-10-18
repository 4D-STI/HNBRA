import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Settings, User, AlignJustify } from 'lucide-react';

export default function() {
  return(
<Sheet>
  <SheetTrigger><AlignJustify/></SheetTrigger>
  <SheetContent side={"left"}>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
};