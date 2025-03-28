import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Dispatch, SetStateAction, useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface ICreateSessionDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    token: string | null;
    sessionId: number;
    sessionName: string | null;
  }
  
  export function CreateSessionDialog({
    open,
    setOpen,
    token,
    sessionId,
    sessionName,
  }: ICreateSessionDialogProps) {
    const [idSession] = useState(sessionId);
    const [nameSubSession, setNameSubSession] = useState<string>("");
    const [status, setStatus] = useState<"active" | "inactive">("active");
  
    const API = process.env.NEXT_PUBLIC_API_BACK;
  
    const handleSubmit = async () => {
        try {
          const response = await fetch(`${API}/subSession`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              idSession,
              nameSubSession,
              status,
            }),
          });
    
          if (response.ok) {
            console.log("Sessão criada com sucesso!");
            setOpen(false);
            window.location.reload(); // Recarrega a página
          } else {
            const errorData = await response.json();
            alert(`Erro ao criar sessão:\n${errorData.message || response.statusText}`); // Exibe o erro formatado
          }
        } catch (error) {
          alert(`Erro ao criar sessão:\n${(error as Error).message || "Erro desconhecido"}`); // Exibe o erro formatado
        }
      };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-green-600 hover:bg-green-300 font-bold rounded-md text-white"
            variant="outline"
          >
            Criar Sessão
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-nowrap text-lg">
              {`Criar Nova Sub Sessão em:`}
            </DialogTitle>
            <DialogTitle className="text-nowrap text-md">
              {`"${sessionName}"`}
            </DialogTitle>
            <DialogDescription>Preencha os dados da nova sessão.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idSession" className="text-right">
                ID Sessão:
              </Label>
              <Input
                type="number"
                id="idSession"
                alt="id da sessão"
                value={sessionId}
                disabled
                className="col-span-3"
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameSubSession" className="text-right">
                Nome:
              </Label>
              <Input
                type="text"
                id="nameSubSession"
                alt="inserir nome da sub sessão"
                value={nameSubSession}
                onChange={(e) => setNameSubSession(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status:
              </Label>
              <Select value={status} onValueChange={(value) => setStatus(value as "active" | "inactive")}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button 
                type="submit"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-300 font-bold rounded-md"
            >
              Criar Sessão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
