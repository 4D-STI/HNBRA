import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import ProgressBar from './progressBar'; // Componente personalizado para a barra de progresso

const API_URL = process.env.API_BASE_URL

function UploadComponent() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    console.log('vai tentar enviar para: ', `${API_URL}/files/2/upload`);


    // try {
    //   const response = await axios.post(`${API_URL}/files/2/upload`, formData, {
    //     onUploadProgress: (progressEvent) => {
    //         if (!progressEvent.total) {return false} //atenção a validação

    //         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //         setUploadProgress(progress);
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div id='uploadManager-main-container' className='flex flex-col max-h-full' {...getRootProps()}>

      <input id='uploadManager-input' {...getInputProps()} />
      {isDragActive ? (
        <p className='text-base'>Solte os arquivos aqui...</p>
      ) : (
        <p className='text-base'>Arraste e solte os arquivos aqui, ou clique para selecionar.</p>
      )}

      <div
        id='uploadManager-files-container'
        className={`${selectedFiles.length > 0 ? 'bg-zinc-200' : ''} rounded-lg p-2 text-xs`}
      >
        {selectedFiles.map(file => (
          <div key={file.name}>
            <p>{file.name}</p>
            {/* <ProgressBar progress={uploadProgress} /> */}
          </div>
        ))}

      </div>

      <button
        id='uploadManager-submit-btn'
        className='w-44 bg-blue-900 text-xl text-white hover:text-green-300 rounded-lg p-1 self-center'
        onClick={handleUpload}
      >Enviar
      </button>
    </div>
  );
}

export default UploadComponent;
