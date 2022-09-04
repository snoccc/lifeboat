import React from 'react'
import File from './File';

const Folder = (props) => {
    const folders = props.children.filter(child => child.type === 'folder');
    const files = props.children.filter(child => child.type === 'file');

    return (
        <div className='ml-4 pr-8'>
            <div className='file'>{props.name}</div>
            {folders && folders.map(folder => <Folder key={folder.name} name={folder.name} children={folder.children} />)}
            {files && files.map(file => <File key={file.name} {...file} />)}
        </div>
    )
}

export default Folder;
