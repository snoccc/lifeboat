import React from 'react'
import { useState } from 'react';
import FileContents from './FileContents';

const Main = () => {
    const [filename, setFilename] = useState();

    window.api.receive('file-change', (data) => {
        setFilename(data);
    });

    return (
        <main className='w-full flex flex-col'>
            <div className='text-center'>{filename}</div>
            <FileContents filename={filename} />
        </main>
    )
}

export default Main;