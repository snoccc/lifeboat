import React from 'react'
import Folder from './Folder';
import File from './File';

const FileDirectory = () => {
    const directory = window.api.getDir();
    const children = directory.children;

    return (
        <div className='bg-side clr-gray'>
            <div className='bg-main text-white'>{directory.name}</div>

            {children && children.map(child => (
                <>
                    {child.type === 'folder'
                        ? <Folder key={child.name} name={child.name} children={child.children} />
                        : <File name={child.name} key={child.name} />}
                </>
            ))}
        </div>
    )
}

export default FileDirectory;

