import React from 'react'
import Folder from './Folder';

const FileDirectory = () => {
    const directory = window.api.getDir();
    const children = directory.children;
    // const folders = Object.keys(directory.files);

    return (
        <div className='bg-side grow-[1]'>
            <div className='bg-main'>{directory.name}</div>
            {/* {folders && folders.map(folder => <Folder name={folder} files={directory.files[folder]} key={folder} />)} */}

            {children && children.map(child => (
                <>
                    {child.type === 'folder'
                        ? <Folder key={child.name} name={child.name} children={child.children} />
                        : <div className='ml-4'>{child.name}</div>}
                </>
            ))}
        </div>
    )
}

export default FileDirectory;


/*
folder
    test
folder2
    meow
hello.txt

*/