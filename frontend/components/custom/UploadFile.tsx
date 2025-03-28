'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';

interface UploadFileProps {
  token: string | null;
  subSessionId: string;
  onUploadSuccess: () => void;
  label: string
}

function UploadFile({ token, subSessionId, onUploadSuccess, label }: UploadFileProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('idSubSession', subSessionId);
    formData.append('description', ''); // Se necessário, adicione um campo de descrição

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACK}/files/${subSessionId}/upload`,
        {
          method: 'POST',
          cache: 'no-store',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert('Arquivo enviado com sucesso! ✅');
        setSelectedFile(null)
        onUploadSuccess(); // Notifica o componente pai sobre o sucesso do upload
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error('Erro de rede durante o upload:', err);
      alert('Erro ao enviar o arquivo. Por favor, tente novamente.');
    }
  };

  const handleButtonClick = () => {
    uploadInputRef.current?.click();
  };

  return (
    <div className='flex flex-col gap-2'>

        <div className='flex flex-row gap-4 justify-center'>
            <Button 
              className="bg-green-600 font-bold hover:bg-green-300 p-4"
              onClick={handleButtonClick }
            >
                    <input
                        id="botton_upload_file"
                        type="file"
                        onChange={handleFileChange}
                        ref={uploadInputRef}
                        className='hidden'
                    />
                    <span>{label}</span>
            </Button>

          <div>
            {selectedFile && (
                <div>
                    <Button type="submit" className="bg-blue-900 font-bold text-white p-1 rounded-md" onClick={handleUpload}>
                        Enviar
                    </Button>
                </div>
            )}
          </div>
        </div>
      


      {selectedFile && <p>{`Arquivo selecionado: ${selectedFile.name}`}</p>}
    </div>
  );
}

export {UploadFile};
