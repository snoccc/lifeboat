import React from 'react'
import { useState } from 'react';
import FileContents from './FileContents';
import Card from './Card';

const Main = () => {
    const [file, setFile] = useState();
    const [out, setOut] = useState();
    window.api.receive('file-change', (file) => {
        setFile(file);
        // window.api.runScripts(file);
        // get back info to make the cards

        setOut({

        })
    });

    return (
        <main className='w-full flex flex-col text-xl'>
            <div className='text-center'>{file && file.name}</div>
            {file && <FileContents file={file} />}

            {/* <Card name="file" body="hello    lol        test" /> */}
        </main>
    )
}

export default Main;