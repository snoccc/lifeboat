import React from 'react'

const Folder = (props) => {
    const folders = props.children.filter(child => child.type === 'folder');
    const files = props.children.filter(child => child.type === 'file');

    return (
        <div className='ml-4 clr-gray'>
            <div>{props.name}</div>
            {folders && folders.map(folder => <Folder key={folder.name} name={folder.name} children={folder.children} />)}

            {files && files.map(file => <div className='ml-4' key={file.name}>{file.name}</div>)}
        </div>
    )
}

export default Folder;
