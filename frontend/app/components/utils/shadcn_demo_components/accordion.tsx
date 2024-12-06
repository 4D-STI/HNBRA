import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import LinkSlideBar from '@/app/components/sidebar/components/LinkCustom'
  
  import {mainMenuLinks} from '@/app/components/sidebar/utils/links_mapping'
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
       {/* menu principal */}
        <AccordionItem value="item-1">
          <AccordionTrigger>Menu Principal</AccordionTrigger>


          {
            mainMenuLinks.map((item, index) => 
              <AccordionContent key={index} className="hover:bg-blue-300 rounded-lg">
                  <LinkSlideBar key={index} text={item.name} />
              </AccordionContent>
            )
          }
        </AccordionItem>
        
        {/* uso interno */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Uso Interno</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        
        {/* programa netuno */}
        <AccordionItem value="item-3">
          <AccordionTrigger>Programa Netuno</AccordionTrigger>
          <AccordionContent>
            {"Yes. It's animated by default, but you can disable it if you prefer."}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  