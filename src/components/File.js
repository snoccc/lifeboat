import React from 'react'

const File = (file) => {
    function selectFile() {
        // send ipc command
        window.api.send('file-change', file);
    }

    return (
        <div className='file ml-8' onClick={() => selectFile()}>{file.name}</div>
    )
}

export default File;
