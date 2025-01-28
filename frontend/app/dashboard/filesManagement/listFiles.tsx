'use client'

import React, { useState, useRef, useEffect } from 'react';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [idSubSession, setIdSubSession] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  // const token = localStorage.getItem('token');
  const [token, setToken] = useState("");
  const [tokenExpired, setTokenExpiered] = useState(true);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio
    setToken(storedToken);
    fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/verifyJwt`, {
      method: 'POST',
      // cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jwt: storedToken }),
    }).then((res) => {
      if (!res.ok) {
        setTokenExpiered(false);
        alert("Login inválido!"), window.location.href = '/'
        throw new Error("jwt Inválido ou Expirado!");
      }
      return res.json();
    }).then((data) => console.log('Token verificado:', data))
    // .catch(() => { alert("Login inválido!"), window.location.href = '/' });
  }, []);



  const handleUpload = async () => {

    const formData = new FormData();
    formData.append('file', selectedFile || new Blob());
    formData.append('idSubSession', idSubSession);
    formData.append('description', description);

    try {
      console.log(selectedFile)
      const response = await fetch(`http://localhost:3002/files/${idSubSession}/upload`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload concluído com sucesso:', data);
      } else {
        console.error('Erro no upload:', response.status, response.statusText, response.json());
      }
    } catch (error) {
      // console.error('Erro de rede durante o upload:', error);
      window.reportError(error)
    }
  };
  const clearLocal = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div>
      {tokenExpired && 'Token Inválido!'}

      {!tokenExpired && (
        <div>
          IdSubSession
          <input type='text' value={idSubSession} onChange={(e) => setIdSubSession(e.target.value)}></input>
          <button onClick={clearLocal}>limpar</button>
          <p></p>
          <input type="file" onChange={handleFileChange} ref={uploadInputRef} />

          {selectedFile && (
            <div>
              <h2>SubSession: </h2>
              <button onClick={() => uploadInputRef.current?.click()}>Selecionar Arquivo</button>
              <p>Arquivo selecionado: {selectedFile.name}</p>
              <p>Progresso do upload: {uploadProgress}%</p>
              <button onClick={handleUpload}>Enviar</button>
            </div>
          )}
        </div>
      )
      }
    </div>
  );
}

export default UploadPage;