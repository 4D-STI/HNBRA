"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { User2Icon } from "lucide-react";
// import UserValidation from '@/app/components/utils/validations/userValidation';
// import passwordValidation from "../utils/validations/passwordValidation";
import loginNip from "./LoginValidator";

export default function Login() {
  // const router = useRouter();
  const [nip, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [userErrors, setUserErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setPasswordErrors([]);
    setUserErrors([]);

    // const userValidationErrors = UserValidation(user);
    // if (userValidationErrors.length > 0) {
    //   setUserErrors(userValidationErrors);
    //   return;
    // }

    // try {
    //   // const token = await login(user, password);
    //   const token = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ nip, password }),
    //   });
    //   console.log(JSON.stringify({ nip, password }))
    //   if (!token.ok) {
    //     console.log(`${process.env.NEXT_PUBLIC_API_BACK}/auth/login`)
    //     throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    //   }
    //   console.log('Login bem-sucedido! Token:', token);
    // } catch (err) {
    //   alert(`Erro ao fazer login. Verifique suas credenciais. ${err}`);
    // }

    try {
      const token = await loginNip(nip, password);
      console.log('Login bem-sucedido! Token:', token);
      window.location.reload();

    } catch {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }


    // const passwordValidationErrors = passwordValidation(password);
    // if (passwordValidationErrors.length > 0) {
    //   setPasswordErrors(passwordValidationErrors);
    //   return;
    // }



    console.log('valido');


    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ user, password }),
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   localStorage.setItem('token', data.token);
    //   handleClose();
    //   router.push('/profile');
    // } else {
    //   const errorData = await response.json();
    //   setErrorMessage(errorData.message);
    // }
  };

  const handleClose = () => {
    setUser('');
    setPassword('');
    setErrorMessage('');
    setPasswordErrors([]);
    setUserErrors([]);
  };

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="bg-blue-900 text-white">
          <User2Icon /> Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                NIP
              </Label>
              <Input
                alt="entrada de dados: identificador NIP (numero de identificação pessoal)"
                placeholder="8 caracteres numéricos"
                type="text"
                // pattern="[0-9]*"
                id="user"
                name="user"
                value={nip}
                onChange={(e) => setUser(e.target.value)}
                required
                className="col-span-3"
              />
            </div>
            {userErrors.length > 0 && (
              <div className="text-red-600 text-center text-sm">
                {userErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                alt="entrada de dados: senha"
                placeholder="6~8 caracteres"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="col-span-3"
              />
            </div>
            {errorMessage && (
              <div className="text-red-600 text-center text-sm">
                {errorMessage}
              </div>
            )}
            {passwordErrors.length > 0 && (
              <div className="text-red-600 text-center text-sm">
                {passwordErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-900 text-white">
              <User2Icon />
              <span>Login</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

