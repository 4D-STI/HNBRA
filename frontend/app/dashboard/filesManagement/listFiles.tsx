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


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio
    setToken(storedToken);
  }, []);

  console.log('esse e o token: ', token)


  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
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
      console.error('Erro de rede durante o upload:', error);
      window.reportError(error)
    }
  };
  const clearLocal = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
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
  );
}

export default UploadPage;