// import { Toggle } from "@/components/ui/toggle";
'use client'

// Componentes shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";
import Command from "@/app/dashboard/userManager/components/Command";
// Componentes de icones
import { Eye, Plus, Download, Trash2, Filter, FileUp,
  //  Upload
   } from "lucide-react";
// import useGetAllUsers from "./helpers/dataFetch";
import UploadComponent from "@/components/custom/uploadManager";

const docs = [
  {
    title: 'Documento 1',
    description: 'Uma descrição breve do que será descrito a seguir',
    actions: 'rweud'
  },{
    title: 'Documento 1',
    description: 'Uma descrição breve do que será descrito a seguir',
    actions: 'rweud'
  },{
    title: 'Documento 1',
    description: 'Uma descrição breve do que será descrito a seguir',
    actions: 'rweud'
  },{
    title: 'Documento 1',
    description: 'Uma descrição breve do que será descrito a seguir',
    actions: 'rweud'
  }
]





export default function ListFles() {

  // const {users} = useGetAllUsers()

  return (
    <div id="listFiles-content-container" className="flex flex-col">
      <div id="listFiles-header-container" className="flex flex-col md:flex-row items-center justify-center mb-4">
        {/* input de pesquisa */}
        <div id="listFiles-command-component-container" className="relative w-full md:w-80">
          <Command />
        </div>
        {/* btn filtro */}
        <div className="flex px-4 mt-2 md:mt-0">
          <Filter className="mr-1" />
          Filtrar
        </div>
        {/* upload de arquivo */}
        <div id="upload-container" className="flex w-60 justify-end">
          <button id="listFiles-upload-btn" className="flex bg-blue-900 rounded-lg shadow-lg p-2 text-white hover:text-green-400">
            Enviar arquivo
            <FileUp className="ml-1 "/>
          </button>

        </div>


      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        
        {false && <Table className="min-w-full">
          {/* Header */}
          <TableHeader className="bg-blue-900 text-gray-50">
            <TableRow>
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Nome
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Descrição
              </TableHead>
              
              <TableHead 
              className="text-gray-50 text-left w-1/5"
              >
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {docs.map((file, index) => (
              <TableRow key={index} className="hover:bg-gray-100" style={{ whiteSpace: 'nowrap' }}>
                <TableCell className="px-4 text-left ">{file.title}</TableCell>
                <TableCell className="px-4 text-left">{file.description}</TableCell>
                <TableCell className="px-4 text-left">
                  <div className="flex space-x-4 justify-start">
                    {file.actions.includes("r") && (
                      <button>
                        <Eye />
                      </button>
                    )}
                    {file.actions.includes("e") && (
                      <button>
                        <Trash2 />
                      </button>
                    )}
                    {file.actions.includes("w") && (
                      <button>
                        <Plus />
                      </button>
                    )}
                    {file.actions.includes("d") && (
                      <button>
                        <Download />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        }

        <div
          id="upload-component-cotainer"
          className="flex flex-col w-max-96 bg-purple-300 items-center rounded-lg p-2 h-48"
        >
          <UploadComponent/>
        </div>
        
      
      </div>
    </div>
  );
}
