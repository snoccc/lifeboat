import React from 'react'
import { useState } from 'react';
import FileContents from './FileContents';
import Card from './Card';

const Main = () => {
    const [file, setFile] = useState();
    const [cards, setCards] = useState();

    window.api.receive('file-change', (file) => {
        window.api.generateCards(file).then(cards => {
            setFile(file);
            setCards(cards);
        });
    });

    return (
        <main className='w-full flex flex-col text-xl'>
            <div className='text-center'>{file && file.name}</div>
            {file && <FileContents file={file} key="file" />}

            {cards && cards.map(card => <Card {...card} key={card.name} />)}
        </main>
    )
}

export default Main;