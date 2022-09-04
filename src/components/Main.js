import React from 'react'
import { useState } from 'react';

const Main = () => {
    const [filename, setFilename] = useState();

    window.api.receive('file-change', (data) => {
        setFilename(data);
    });

    return (
        <main className='w-full flex justify-center'>
            <div>{filename}</div>
        </main>
    )
}

export default Main;