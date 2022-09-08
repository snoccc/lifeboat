import React from 'react'
import { useState } from 'react';
import FileContents from './FileContents';
import Card from './Card';

const Main = () => {
    const [file, setFile] = useState();
    const [cards, setCards] = useState();

    window.api.receive('file-change', (file) => {
        setFile(file);
        window.api.runScripts(file);
        window.api.receive('cards', (cards) => {
            // cards = "transform it here" // (cards map (card => ...card))
            setCards(cards);
            console.log('received cards => ' + cards);
        })
    });

    return (
        <main className='w-full flex flex-col text-xl'>
            <div className='text-center'>{file && file.name}</div>
            {file && <FileContents file={file} />}

            {cards && cards.map(card => <Card {...card} />)}
        </main>
    )
}

export default Main;