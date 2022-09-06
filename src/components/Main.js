import React from 'react'
import { useState } from 'react';
import FileContents from './FileContents';

const Main = () => {
    const [file, setFile] = useState();

    window.api.receive('file-change', (file) => {
        setFile(file);
    });

    window.api.testYaml();

    return (
        <main className='w-full flex flex-col'>
            <div className='text-center'>{file && file.name}</div>
            {file && <FileContents file={file} />}
        </main>
    )
}

export default Main;