import Image from "next/image"
import Logo from "@/app/assets/logo_hnbra.png"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function Header() {
    return (
       <header id="header" className="w-full bg-slate-50 shadow-sm">
        <div id="container" className="w-screen">
            <div id="logo.hnbra" className="">
                <Image
                src={Logo}
                width={40}
                height={60}>
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
                           <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

                        </ul>
                    </div>
                </div>
            </div>

        </div>

       </header>
    )
}