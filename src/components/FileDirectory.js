import React from 'react'
import Folder from './Folder';
import File from './File';

const directory = window.api.getDir();
const children = directory.children;

children.filter(file => file.type === "file").forEach(file => window.api.generateCards(file));

const FileDirectory = () => {
    return (
        <div className='bg-side clr-gray select-none flex-shrink-0 '>
            <div className='bg-main text-white'>{directory && directory.name}</div>

            {children && children.map(child => (
                <React.Fragment key={child.name}>
                    {child.type === 'folder'
                        ? <Folder key={child.name} name={child.name} children={child.children} />
                        : <File key={child.name} {...child} />}
                </React.Fragment>
            ))}
        </div>
    )
}

export default FileDirectory;

