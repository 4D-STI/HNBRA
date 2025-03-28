import { SheetClose, SheetDescription } from "@/components/ui/sheet"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import idTextConverter from "./id_text_converter"

export type linkCustom = {
  text: string,
  key: number,
  href: string,
  target: string,
  linkIndex: number
}

function LinkSlideBar({text, href, target, linkIndex}: linkCustom) {
  const textNormalized = idTextConverter(text)
  
    return (
        <Link
        id={`link-dashboard-${linkIndex}`}
        href={`${href}`}
        className="hover:bg-blue-300 transition duration-200 rounded-full"
        target={target}
      >
        
        {/* componente para fechar ao clicar */}
        <SheetClose
          className="flex flex-row justify-between w-full px-4 py-1 items-center"
        >
              {/* texto */}
              <SheetDescription id={`text-name-link-${textNormalized.toLowerCase()}`} className="text-black">
                {text}
              </SheetDescription>
              {/* icone */}
              <ChevronRight id={`icon-chevron-link-${textNormalized.toLowerCase()}`}/>
        
        </SheetClose>
      
      </Link>
    )
}

export default LinkSlideBar
