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
      <Command className="rounded-lg border shadow-md mr-20 w-80">
        <CommandInput placeholder="CTRL+K = Pesquisar Documento" />
      </Command>
    )
  }
