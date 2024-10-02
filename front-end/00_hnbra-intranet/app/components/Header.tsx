import Login from "@/app/components/Login"
import Image from "next/image"
import Logo from "@/app/assets/logo_hnbra.png"
import {
  Dialog,
  DialogContent,
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
        <div id="container" className="max-w-screen p-16 space-x-2">
            <div id="logo.hnbra" className="">
                <Image
                src = {Logo}
                alt="Logo"
                width = {40}
                height = {60}>
                </Image>
                 <span className="br-divider vertical mx-half mx-sm1"></span>
                <div className="">
                    <h1>Marinha do Brasil</h1>
                    <div className="flex space-x-4">
                        <ul>
                           <li>Orgãos do governo</li>
                           <li>Acesso à informação</li>
                           <li>Legislação</li>
                           <li>Acessibilidade</li>
                           <div id="button_login">
                            <Login/>
                          </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

       </header>
    )
}