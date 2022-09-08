import React from 'react'
import Folder from './Folder';
import File from './File';

const FileDirectory = () => {
    const directory = window.api.getDir();
    const children = directory.children;

    console.log(children);

    return (
        <div className='bg-side clr-gray'>
            <div className='bg-main text-white'>{directory.name}</div>

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

