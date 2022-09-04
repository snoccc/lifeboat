import React from 'react'
import { useState } from 'react';

const Main = () => {
    const [filename, setFilename] = useState();

    window.api.receive('file-change', (data) => {
        setFilename(data);
    });

    return (
        <main className='grow-[3]'>
            <div className='text-center'>{filename}</div>
        </main>
    )
}

export default Main;