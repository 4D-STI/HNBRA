"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Modelos",
    href: "/files/",
    description:
      "Modelos de documentos do gabinete",
  },
  {
    title: "Ordem Interna",
    href: "/novo",
    description:
      "Lista das ordens internas do gabinete",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const admComponents: { title: string; href: string; description: string }[] = [
    {
      title: "20.1 - Conforto",
      href: "/docs/primitives/alert-dialog",
      description:
        "Mi casa es su casa !",
    },
    {
      title: "20.2 - Informática",
      href: "/docs/primitives/hover-card",
      description:
        "Já abriu o chamado ?",
    },
    {
      title: "20.3 - Esportes",
      href: "/docs/primitives/progress",
      description:
        "Todo dia um 7x1 diferente !",
    },
    {
      title: "21 - Intendência",
      href: "/docs/primitives/scroll-area",
      description: "Intendedores intenderão !",
    },
    {
      title: "22 - Divisão de Pessoal",
      href: "/docs/primitives/tabs",
      description:
        "Um pedaço pra cada !",
    },
    {
      title: "23 - Serviços Gerais",
      href: "/docs/primitives/tooltip",
      description:
        "Limpe o pé antes de entrar !",
    },
  ]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        {/* Diretoria */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-900 text-white font-bold">Diretoria</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      
        {/* Vice Diretoria */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-900 text-white font-bold">Vice Diretoria</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Auditoria */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-900 text-white font-bold">Auditoria</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Administração */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-900 text-white font-bold"
          >Administração
          </NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {admComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Saúde */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-900 text-white font-bold">Saúde</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
