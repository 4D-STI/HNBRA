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
import { useState } from "react";
import { CircleUser } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); 


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    
    if (/^\d*$/.test(value)) {
      setUsername(value); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha os campos usuário e senha.");
    } else if (username.length > 8) {
      setError("O usuário deve ter no máximo 8 caracteres.");
    } else {
      setError("Erro ao logar. Verifique suas credenciais.");
    }
  };

  
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm(); 
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-900 text-white">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Usuário
              </Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
                maxLength={8}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="col-span-3"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 p-2 rounded">
              <p className="font-light">{error}</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" type="submit" className="bg-blue-900 text-white">
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
