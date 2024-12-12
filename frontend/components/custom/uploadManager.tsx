import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function UploadComponent() {
    // local onde esta os arquivos
    const onDrop = useCallback(acceptedFiles => {
        console.log('dropou', acceptedFiles);
        
      }, [])

    // o que faz?
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div
            id="uploadManager-main-container"
            className="flex flex-col rounded-lg"
        >
            <div className='flex flex-col bg-blue-300 p-6 rounded-lg' {...getRootProps()}>
                <input {...getInputProps()} />
                
                <div id='uploadManager-text-container' className='flex'>
                    {
                        isDragActive ?
                        <p>Solte seus arquivos aqui ...</p> :
                        <p className=''>
                            Arraste e solte seus arquivos aqui
                            <br/>ou<br/>
                            clique para seleciona-los
                        </p>
                    }
                </div>

                
            </div>
        </div>
    )
}

export default UploadComponent
