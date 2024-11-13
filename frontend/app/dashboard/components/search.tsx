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
      <Command className="rounded-lg border shadow-md md:min-w-[450px] bg-blue-50">
        <CommandInput placeholder="Pesquisar..." />
      </Command>
    )
  }