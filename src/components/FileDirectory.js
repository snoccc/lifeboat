import React from 'react'

const FileDirectory = () => {
    return (
        <div className='bg-side grow-[1]'>
            {window.api.getFiles()}
        </div>
    )
}

export default FileDirectory;
