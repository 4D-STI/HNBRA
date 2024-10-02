import Image from "next/image"
import Logo from "@/app/assets/logo_hnbra.png"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"

export default function Header() {
    return (
       <header id="header" className="w-full bg-slate-50 shadow-sm">
        <div id="container" className="w-screen p-16 space-x-2">
            <div id="logo.hnbra" className="">
                <Image
                src = {Logo}
                width = {40}
                height = {60}>
                </Image>
                 <span className="br-divider vertical mx-half mx-sm1"></span>
                <div className="">
                    <h1>Marinha do Brasil</h1>
                    <div>
                        <ul>
                           <li>Orgãos do governo</li>
                           <li>Acesso à informação</li>
                           <li>Legislação</li>
                           <li>Acessibilidade</li>
                           <div id="button_login">
                           <Dialog>
                     <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Usuário
            </Label>
            <Input type="usuario" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="usuario" className="text-right">
              Senha
            </Label>
            <Input type="senha" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>

                        </ul>
                    </div>
                </div>
            </div>

        </div>

       </header>
    )
}