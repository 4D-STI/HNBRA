import * as React from "react";

import { Button } from "@/components/ui/button";
import {

  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function CadastroUser() {
  return (
    <div id="container" className="flex justify-center items-center h-screen">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Cadastro de usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Digite o nome completo do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">NIP</Label>
              <Input type="text" id="nip" placeholder="Digite o NIP do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Departamento</Label>
              <Select>
                <SelectTrigger id="departamento">
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
              <Select>
                <SelectTrigger id="secao">
                  <SelectValue placeholder="Selecione a seção" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="informática">Seção de informática</SelectItem>
                  <SelectItem value="conforto">Seção de conforto</SelectItem>
                  <SelectItem value="esportes">Seção de esportes</SelectItem>
                  <SelectItem value="execucao-financeira">Seção de execução financeira</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cargo">Cargo</Label>
              <Select>
                <SelectTrigger id="cargo">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="administrador">Administrador de usuários</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Permissões</Label>
              <Select>
                <SelectTrigger id="permissoes">
                  <SelectValue placeholder="Selecione as permissões" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <div className="flex flex-col space-y-1 p-2">
                    <div className="flex items-center">
                      <Checkbox id="read" />
                      <Label htmlFor="read" className="ml-2">Read</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="write" />
                      <Label htmlFor="write" className="ml-2">Write</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="edit" />
                      <Label htmlFor="edit" className="ml-2">Edit</Label>
                    </div>
                  </div>
                </SelectContent>
                <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Senha</Label>
              <Input id="name" placeholder="Digite a senha do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirme sua Senha</Label>
              <Input id="name" placeholder="Confirme a senha do usuário" />
            </div>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button variant="outline" type="submit" className="bg-blue-900 text-white">
          <span>Fazer cadastro</span>
        </Button>
      </CardFooter>
    </Card>
  </div>
  
  
  );
}