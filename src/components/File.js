import React from 'react'

const File = ({ name }) => {
    function selectFile() {
        // send ipc command
    }

    return (
        <div className='file ml-4' onClick={() => selectFile()}>{name}</div>
    )
}

export default File;
