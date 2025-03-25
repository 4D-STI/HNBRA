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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import passwordValidation from "./utils/passwordValidation";
import { Eye, EyeOff } from 'lucide-react';
import NipValidation from "./utils/nipValidation";

interface IPatent {
  idPatent: number;
  patent: string;
}

export default function RegisterForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [warName, setWarname] = useState<string>('');
  const [nip, setNip] = useState<string>('');
  const [emailMb, setEmailMb] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [patents, setPatents] = useState<IPatent[]>([]);
  const [patent, setPatent] = useState<number | null>(null);
  // const [department, setDepartment] = useState<string>('');
  // const [section, setSection] = useState<string>('');
  // const [cargo, setCargo] = useState<string>('');
  // const [status, setStatus] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [nipValidationErrors, setNipValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/patent`, {
          cache: "no-store",
        });
        const data = await response.json();
        setPatents(data);
        if (data.length > 0) {
          setPatent(data[0].idPatent); // porque salva em patent?
        }
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      }
    };


    fetchData();

    const errors = NipValidation(nip);
    setNipValidationErrors(errors);
  }, [nip]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !nip
      // || !department || !section || !cargo || !status 
      || !password || !confirmPassword) {
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
    const errors = NipValidation(nip);
    setNipValidationErrors(errors);
    await NipValidation(nip);

    setFirstName('');
    setLastName('');
    setNip('');
    // setDepartment('');
    // setSection('');
    // setCargo('');
    // setStatus('');
    setPassword('');
    setConfirmPassword('');
    setPermissions([]);
    setErrorMessage('');


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/users`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nip,
          "idPatent": patent, // implementar estado aqui
          warName,
          firstName,
          lastName,
          "role": "user",
          "status": "active",
          "permission": "user",
          password,
          "emailPersonal": emailMb,
          "emailMb": emailMb,
          "contactNumber": number
        }),
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log('Upload concluído com sucesso:', data);
        setSuccessMessage('Usuário cadastrado com sucesso!');
        window.alert('Pessoa cadastrada');
        setFirstName('');
        setLastName('');
        setNip('');
        setWarname('');
        setNumber('');
        // setSection('');
        // setCargo('');
        // setStatus('');
        setPassword('');
        setConfirmPassword('');
        setPermissions([]);
        setErrorMessage('');
        // window.location.reload();

      } else {
        const data = await response.json();
        // console.error('Erro no upload:', response);
        confirm(data.message)
      }
    } catch (err) {
      console.error('Erro de rede durante o upload:', err);
      // window.reportError(error)
    }


  };

  // const handleUpload = async () => {

  //   const formData = new FormData();
  //   formData.append('firstName', firstName);
  //   formData.append('nip', nip);
  //   // formData.append('patents', patents);
  //   formData.append('lastName', lastName);
  //   formData.append('password', password);


  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/users`, {
  //       method: 'POST',
  //       cache: 'no-store',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         nip,
  //         "idPatent": 1,
  //         warName,
  //         firstName,
  //         lastName,
  //         "role": "user",
  //         "status": "active",
  //         "permission": "user",
  //         password,
  //         "emailPersonal": emailMb,
  //         "emailMb": emailMb,
  //         "contactNumber": number
  //       }),
  //     });

  //     if (response.ok) {
  //       // const data = await response.json();
  //       // console.log('Upload concluído com sucesso:', data);
  //       window.alert('Pessoa cadastrada');
  //       window.location.reload();

  //     } else {
  //       const data = await response.json();
  //       // console.error('Erro no upload:', response);
  //       confirm(data.message)
  //     }
  //   } catch (err) {
  //     console.error('Erro de rede durante o upload:', err);
  //     // window.reportError(error)
  //   }
  // };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPatent(Number(event.target.value));
  };

  console.log(permissions);



  return (
    <Card className="w-max text-blue-900">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

            {/* NOME */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir nome do usuário"
                id="create_user_form_firstname"
                placeholder="Insira o nome do usuário"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            {/* NOME DE GUERRA*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome de guerra</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir nome de guerra do usuário"
                id="create_user_form_warname"
                placeholder="Insira o nome de guerra"
                value={warName}
                onChange={(e) => setWarname(e.target.value)}
                required
              />
            </div>

            {/* SOBRENOME */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="surname">Sobrenome</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir sobrenome do usuário"
                id="create_user_form_lastname"
                placeholder="Insira o sobrenome do usuário"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* NIP */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">NIP</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir NIP (número identificador pessoal) do usuário"
                type="text"
                id="create_user_form_nip"
                placeholder="Insira o NIP do usuário"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                required
              />
            </div>
            {/* EMAIL MB */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">Email</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir email do usuário"
                type="text"
                id="create_user_form_emailMb"
                placeholder="Insira o Email MB do usuário"
                value={emailMb}
                onChange={(e) => setEmailMb(e.target.value)}
                required
              />
            </div>

            {/* NUMERO CONTATO */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">Telefone</Label>
              <Input
                alt="formulario de cadastro de usuário: campo para inserir Telefone  do usuário"
                type="text"
                id="create_user_form_relefone"
                placeholder="Insira o Telefone do usuário"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            {/* PATENTE */}
            <div>
              <label htmlFor="patent">Selecione Posto/Grad: </label>
              <select id="patent" className="border p-2 rounded" onChange={handleChange}>
                {patents.length > 0 ? (
                  patents.map((patent: IPatent) => (
                    <option key={patent.idPatent} value={patent.idPatent}>
                      {patent.patent}
                    </option>
                  ))
                ) : (
                  <option>Carregando...</option>
                )}
              </select>
            </div>

            {/* DEPARTAMENTO */}
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Departamento</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger id="create_user_form_department">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="diretoria">Diretoria</SelectItem>
                  <SelectItem value="vice-diretoria">Vice-diretoria</SelectItem>
                  <SelectItem value="saude">Departamento de Saúde</SelectItem>
                  <SelectItem value="administracao">Departamento de Administração</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* SEÇÃO */}
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="section">Seção</Label>
              <Select onValueChange={setSection}>
                <SelectTrigger id="create_user_form_section">
                  <SelectValue placeholder="Selecione a seção" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="informática">Seção de Informática</SelectItem>
                  <SelectItem value="conforto">Seção de Conforto</SelectItem>
                  <SelectItem value="esportes">Seção de Esportes</SelectItem>
                  <SelectItem value="execucao-financeira">Seção de Execução Financeira</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* CARGO */}
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cargo">Cargo</Label>
              <Select onValueChange={setCargo}>
                <SelectTrigger id="create_user_form_role">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="administrador">Administrador de Usuários</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* STATUS */}
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={setStatus}>
                <SelectTrigger id="create_user_form_status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* PERMISSÕES */}
            {/* <div className="flex flex-col space-y-1.5 col-span-2">
              <Label>Permissões</Label>
              <div className="flex space-x-6 p-2">
                <div className="flex items-center">
                  <Checkbox
                    id="create_user_form_pemission_read"
                    onCheckedChange={() => handlePermissionChange('read')}
                  />
                  <Label htmlFor="read" className="ml-2">Ler</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="create_user_form_pemission_delete"
                    onCheckedChange={() => handlePermissionChange('delete')}
                  />
                  <Label htmlFor="delete" className="ml-2">Excluir</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="create_user_form_pemission_add"
                    onCheckedChange={() => handlePermissionChange('add')}
                  />
                  <Label htmlFor="add" className="ml-2">Adicionar</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="create_user_form_pemission_download"
                    onCheckedChange={() => handlePermissionChange('download')}
                  />
                  <Label htmlFor="download" className="ml-2">Baixar</Label>
                </div>
              </div>
            </div> */}

            {/* SENHA */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir senha"
                  id="create_user_form_password"
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

            {/* CONFIRMAR SENHA */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirme a Senha</Label>
              <div className="relative">
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir confirmar senha"
                  id="create_user_form_confirm_password"
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
                {/* <div>
                  <p></p>
                  <h2>Plano do dia</h2>
                  <button onClick={() => uploadInputRef.current?.click()}>Selecionar Arquivo</button>
                  <button type='submit' className="bg-blue-900 text-white" onClick={handleUpload}>Enviar</button>
                </div> */}
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm mt-2">{successMessage}</div>
          )}

          {/* FOOTER - BOTÕES */}
          <CardFooter className="flex justify-between mt-4">

            {/* BOTÃO CANCELAR */}
            {/* <Button
              id="create_user_form_cancel_button"
              variant="outline">Cancelar</Button> */}

            {/* BOTÃO FAZER CADASTRO */}
            <Button
              id="create_user_form_register_button"
              variant="outline"
              type="submit"
              className="bg-blue-900 text-white justify-end items-end"
              onClick={handleSubmit}>
              Fazer Cadastro
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
