import {
    Command,
    CommandInput,
    // CommandEmpty,
    // CommandGroup,
    // CommandItem,
    // CommandList,
    // CommandSeparator,
    // CommandShortcut,
  } from "@/components/ui/command"
   
  export default function CommandDemo() {
    return (
        <Command className="rounded-lg border shadow-md md:min-w-[200px] bg-blue-200 ">
        <CommandInput placeholder="Pesquisar usuário..." />
      </Command>
    )
      
  }