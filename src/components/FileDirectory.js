import React from 'react'

const FileDirectory = () => {
    const directory = window.api.getDir();
    console.log({ directory });

    return (
        <div className='bg-side grow-[1]'>
            <div className='bg-main'>{directory.name}</div>
            {directory.files && directory.files.map(file => <div className='clr-gray ml-4' key={file}>{file}</div>)}

        </div>
    )
}

export default FileDirectory;
