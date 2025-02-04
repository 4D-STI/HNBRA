'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import FileList from '../listSubSessionSession/file';
import { File as files } from "../../types/file";



function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [idSubSession] = useState('');
  const [description] = useState('');
  const uploadInputRef = useRef<HTMLInputElement>(null);
  // const token = localStorage.getItem('token');
  const [token, setToken] = useState("");
  const [tokenExpired, setTokenExpiered] = useState<boolean>(true);
  const router = useRouter();
  // const [files, setFiles] = React.useState<File[]>([]);
  const [filess, setFiless] = React.useState<files[]>([]);
  const SUBSESSION_ID = 6;
  const apiBack = process.env.NEXT_PUBLIC_API_BACK;
  // const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio
    setToken(storedToken);
    fetch(`${apiBack}/auth/verifyJwt`, {
      method: 'POST',
      // cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jwt: storedToken }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("jwt Inválido ou Expirado!");
      }
      return res.json();
    })
      .then(() => setTokenExpiered(true))
      .catch(() => {
        setTokenExpiered(false);
        localStorage.removeItem('token');
        alert("Login inválido!");
        window.location.href = '/';
      })
    fetchData();
    // .catch(() => { alert("Login inválido!"), window.location.href = '/' });
  }, []);

  const url = React.useMemo(() => {
    if (SUBSESSION_ID) return `${apiBack}/files/nameSub?idSubSession=6`;
    return null;
  }, [apiBack, SUBSESSION_ID]);

  const fetchData = useCallback(async () => {
    if (!url) {
      setError("Erro: Parâmetro 'item' ou 'teste' não fornecido.");

      return;
    }

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar arquivos");
      const data = await res.json();
      setFiless(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
    }
  }, [url]);



  const handleUpload = async () => {

    const formData = new FormData();
    formData.append('file', selectedFile || new Blob());
    formData.append('idSubSession', idSubSession);
    formData.append('description', description);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/files/6/upload`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log('Upload concluído com sucesso:', data);
        window.alert('Arquivo enviado com sucesso! ✅');
        window.location.reload();

      } else {
        const data = await response.json();
        // console.error('Erro no upload:', response);
        confirm(data.message)
      }
    } catch (err) {
      console.error('Erro de rede durante o upload:', error, err);
      // window.reportError(error)
    }
  };



  // const clearLocal = () => {
  //   localStorage.removeItem('token');
  //   window.location.reload();
  // }

  return (
    <div>
      {tokenExpired === false ? (<p>Token Inválido!</p>)

        : (
          <div>
            {/* IdSubSession
          <input type='text' value={idSubSession} onChange={(e) => setIdSubSession(e.target.value)}></input> */}
            {/* <button onClick={clearLocal}>limpar</button> */}
            <input id='botton_upload_file' type="file" onChange={handleFileChange} ref={uploadInputRef} />
            {/* <button onClick={() => uploadInputRef.current?.click()}>
              {selectedFile ? `Arquivo: ${selectedFile.name}` : 'Selecionar Arquivo'}
              </button> */}
            {selectedFile && (
              <div>
                <p></p>
                <h2>Plano do dia</h2>
                {/* <button onClick={() => uploadInputRef.current?.click()}>Selecionar Arquivo</button> */}
                <p>Arquivo selecionado: {selectedFile.name}</p>
                <button type='submit' className="bg-blue-900 text-white" onClick={handleUpload}>Enviar</button>
              </div>
            )}
          </div>
        )
      }
      <div id="div-list-file">
        <button
          className="text-blue-500 underline mb-4"
          onClick={() => router.back()} // Navegar para a página anterior
        >
          voltar
        </button>
        <FileList files={filess} />
      </div>
    </div>
  );
}

export default UploadPage;