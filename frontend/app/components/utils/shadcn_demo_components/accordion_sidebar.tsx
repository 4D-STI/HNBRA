import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LinkSlideBar from "@/app/components/sidebar/components/LinkCustom";
import * as sideBarLinks from "@/app/components/sidebar/utils/sidebar_data";

export function AccordionSideBar() {
  return (
    <Accordion type="single" collapsible className="w-full">
      
      {sideBarLinks.menuTitles.map((title, index) => (
        
        <AccordionItem key={index} value={`item-${index}`}>
          
          <AccordionTrigger>{title.name}</AccordionTrigger>
            
            {title.ref.map((link, linkIndex) => (
              
              <AccordionContent key={linkIndex}>
                
                {/* TODO: Tratamento de erro caso arquivo indisponível */}
                <LinkSlideBar
                  key={linkIndex}
                  href={link.href}
                  text={link.name}
                  target="blank"
                  linkIndex={linkIndex}
                />

              </AccordionContent>

            ))}

        </AccordionItem>
        
      ))}

    </Accordion>
  );
}
