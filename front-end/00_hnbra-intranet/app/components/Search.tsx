import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
   
  export default function CommandDemo() {
    return (
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
      </Command>
    )
  }