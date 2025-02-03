'use client'


import { useState, useEffect, useRef, useContext } from 'react';
import {FileSearch2} from 'lucide-react'
import PDF_DataContext, {IData} from '@/app/context/files_pdf_Context';
import Link from 'next/link';

const MyComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState<IData[]>([]);
  const {data} = useContext(PDF_DataContext)
  // const {data, loading, error} = useContext(PDF_DataContext)
  const inputRef = useRef<HTMLInputElement>(null); // Referência para o input

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered: IData[] | undefined = data?.filter((doc) => {
      return (doc.nameFile?.toLowerCase().includes(term.toLowerCase()) ||
             doc.description?.toLowerCase().includes(term.toLowerCase())) &&
             doc.nameFile?.toLocaleLowerCase().includes('.pdf')
    });

    if (filtered ) {
      console.log(filtered);
      
      setFilteredDocuments(filtered);
    }

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      setSearchTerm('')
      setIsOpen(false)
    }
    if (event.key === 'k' && event.ctrlKey) {
      event.preventDefault(); // Impede o comportamento padrão do Firefox
      setIsOpen(true);
      setTimeout(() => { // Aguarda o dialog abrir
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0); // Timeout de 0ms para garantir que o dialog esteja renderizado
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div id='search-container' className='relative w-80 mr-20'>
        <div id='search-icon-container' className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <FileSearch2 className="h-7 text-gray-500"/>
        </div>
        <input
          type="text"
          placeholder={`CTRL+K = Pesquisar Documento`}
          className="border p-2 pl-10 w-80 mr-20 rounded-lg"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {isOpen && (
        // container
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"> {/* z-50 para sobrepor */}
          {/* dialog container */}
          <div className="bg-white p-4 rounded-xl h-[500px] w-full mx-64">
            
            {/* input */}
            <div className="pb-2 mb-2">
              <input
                type="text"
                placeholder="CTRL+K = Pesquisar documentos"
                className="border h-12 p-2 w-full rounded-xl mb-4"
                value={searchTerm}
                onChange={handleSearchChange}
                ref={inputRef} // Define a referência para o input
                autoFocus
              />
            </div>

            {/* container itens */}
            <div className="overflow-y-auto h-80 flex-grow">
              
              {filteredDocuments.map((doc) => (
                
                <Link 
                  key={doc.idFile}
                  href={`https://www.hnbra.mb:3002/files/${doc.nameFile}/view`}
                  // href={`http://localhost:3002/files/${doc.nameFile}/view`}
                  target='_blank'
                >
                  <div
                    key={doc.idFile}
                    className="mb-2 p-2 px-4 border border-2 border-gray-200 hover:bg-blue-100 rounded-xl"
                  >
                    
                    <h2 key={doc.idFile}>{`Setor: ${doc.nomeSubSession}`}</h2>
                    <h3 className="font-bold">{`Nome: ${doc.nameFile}`}</h3>
                    
                    <p className='text-sm'>{`Descrição: ${doc.description || 'Sem descrição'}`}</p>
                  
                  </div>
                </Link>
              
              ))}
              
              {filteredDocuments.length === 0 && <p>Nenhum documento encontrado.</p>}
            
            </div>
            
            {/* footer container */}
            <div className="mt-4 flex flex-row justify-between items-center">
              
              <div className='text-xs'>
                
                <p className='mb-2'>{`obs: somente para vizualização de PDF.`}</p>

                <p>{`Pressione "ESC" para fechar`}</p>

              </div>
          
              <button onClick={() => setIsOpen(false)} className="bg-gray-200 p-2 rounded-lg">
                Fechar
              </button>
            
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
