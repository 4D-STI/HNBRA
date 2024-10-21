"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import passwordValidation from "./utils/passwordValidation"; 
import { Eye, EyeOff } from 'lucide-react'; 
import NipValidation from "./utils/nipValidation";

export default function RegisterForm() {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [nip, setNip] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [cargo, setCargo] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); 
  const [nipValidationErrors, setNipValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const errors = NipValidation(nip);
    setNipValidationErrors(errors);
  }, [nip]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !nip || !department || !section || !cargo || !status || !password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      setSuccessMessage(''); 
      return;
    }

    const passwordErrors = passwordValidation(password);
    if (passwordErrors.length > 0) {
      setErrorMessage(passwordErrors.join(", "));
      setSuccessMessage(''); 
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      setSuccessMessage(''); 
      return;
    }

    if (nipValidationErrors.length > 0) {
      setErrorMessage(nipValidationErrors.join(", "));
      setSuccessMessage(''); 
      return;
    }

    console.log({
      name,
      surname,
      nip,
      department,
      section,
      cargo,
      status,
      permissions,
      password,
    });

    setName('');
    setSurname('');
    setNip('');
    setDepartment('');
    setSection('');
    setCargo('');
    setStatus('');
    setPassword('');
    setConfirmPassword('');
    setPermissions([]);
    setErrorMessage('');
    setSuccessMessage('Usuário cadastrado com sucesso!'); 
  };

  const handlePermissionChange = (permission: string) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };

  return (
    <Card className="w-max text-blue-900">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Insira o nome do usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="surname">Sobrenome</Label>
              <Input
                id="surname"
                placeholder="Insira o sobrenome do usuário"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">NIP</Label>
              <Input
                type="text" 
                id="nip"
                placeholder="Insira o NIP do usuário"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Departamento</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="diretoria">Diretoria</SelectItem>
                  <SelectItem value="vice-diretoria">Vice-diretoria</SelectItem>
                  <SelectItem value="saude">Departamento de Saúde</SelectItem>
                  <SelectItem value="administracao">Departamento de Administração</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="section">Seção</Label>
              <Select onValueChange={setSection}>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Selecione a seção" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="informática">Seção de Informática</SelectItem>
                  <SelectItem value="conforto">Seção de Conforto</SelectItem>
                  <SelectItem value="esportes">Seção de Esportes</SelectItem>
                  <SelectItem value="execucao-financeira">Seção de Execução Financeira</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cargo">Cargo</Label>
              <Select onValueChange={setCargo}>
                <SelectTrigger id="cargo">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="administrador">Administrador de Usuários</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
              <Label>Permissões</Label>
              <div className="flex space-x-6 p-2">
                <div className="flex items-center">
                  <Checkbox
                    id="read"
                    onCheckedChange={() => handlePermissionChange('read')}
                  />
                  <Label htmlFor="read" className="ml-2">Ler</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="delete"
                    onCheckedChange={() => handlePermissionChange('delete')}
                  />
                  <Label htmlFor="delete" className="ml-2">Excluir</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="add"
                    onCheckedChange={() => handlePermissionChange('add')}
                  />
                  <Label htmlFor="add" className="ml-2">Adicionar</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="download"
                    onCheckedChange={() => handlePermissionChange('download')}
                  />
                  <Label htmlFor="download" className="ml-2">Baixar</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <EyeOff /> : <Eye />} 
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirme a Senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />} 
                </button>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm mt-2">{successMessage}</div> 
          )}
          <CardFooter className="flex justify-between mt-4">
            <Button variant="outline">Cancelar</Button>
            <Button variant="outline" type="submit" className="bg-blue-900 text-white">
              Fazer Cadastro
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
