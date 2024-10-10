import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

export default function RegisterForm() {
  return (
    <Card className="w-[600px] text-blue-900">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Insira o nome do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="surname">Sobrenome</Label>
              <Input id="surname" placeholder="Insira o sobrenome do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nip">NIP</Label>
              <Input type="text" id="nip" placeholder="Insira o NIP do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Departamento</Label>
              <Select>
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
              <Select>
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
              <Select>
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
              <Select>
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
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center">
                  <Checkbox id="read" />
                  <Label htmlFor="read" className="ml-2">Ler</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="write" />
                  <Label htmlFor="write" className="ml-2">Escrever</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="edit" />
                  <Label htmlFor="edit" className="ml-2">Editar</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Insira a senha do usuário" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirme a Senha</Label>
              <Input id="confirm-password" type="password" placeholder="Confirme a senha do usuário" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button variant="outline" type="submit" className="bg-blue-900 text-white">
          <span>Fazer Cadastro</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
