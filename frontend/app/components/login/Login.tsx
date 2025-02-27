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
import React, { ChangeEvent, FormEvent, useState } from "react";
import { User2Icon } from "lucide-react";
import NipValidation from '@/app/components/utils/validations/nip_validation';
// import PasswordValidation from "../utils/validations/password_validation";
import loginNip from "./LoginValidator";
// import router from "next/router";

export default function Login() {
  const [nip, setNip] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [NipErrors, setNipErrors] = useState<string[]>([]);

  // método input Nip
  const handleNipInput = (event: ChangeEvent<HTMLInputElement>) => {
    // adiciona o valor ao estado a partir do onChange do input do nip
    setNip(event.target.value)

    // realiza as validações do nip
    const NipValidationErrors = NipValidation(nip);
    // limpa o estado do erros do input nip caso
    // 1 - não haja erros nas validações
    // 2 - não haja valor em nip
    if (NipValidationErrors.length === 0 || nip === '') setNipErrors([])

    if (NipValidationErrors.length > 0) setNipErrors(NipValidationErrors)
  }

  // método envio password
  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // adiciona o valor ao estado a partir do onChange do input do nip
    setPassword(event.target.value)

    // realiza as validações do nip
    // const PasswordValidationErrors = PasswordValidation(password);
    // limpa o estado do erros do input nip caso
    // 1 - não haja erros nas validações
    // 2 - não haja valor em nip
    // if (PasswordValidationErrors.length === 0 || nip === '') setNipErrors([])

    // if (PasswordValidationErrors.length > 0) {
    //   setPasswordErrors(PasswordValidationErrors);
    //   return;
    // }
  }

  // método envio dados
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setPasswordErrors([]);
    setNipErrors([]);

    try {

      await loginNip({ nip, password });
      window.location.reload();

    } catch {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleClose = () => {
    setNip('');
    setPassword('');
    setErrorMessage('');
    setPasswordErrors([]);
    setNipErrors([]);
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
                alt="entrada de dados: NIP (numero de identificação pessoal)"
                placeholder="Digite seu NIP"
                type="text"
                // pattern="[0-9]*"
                id="nip-input"
                name="nip"
                value={nip}
                onChange={(event) => handleNipInput(event)}
                required
                className="col-span-3"
              />
            </div>
            {NipErrors.length > 0 && (
              <div className="text-red-600 text-center text-sm">
                {NipErrors.map((error, index) => (
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
                placeholder="Digite sua senha"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => handlePasswordInput(e)}
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
