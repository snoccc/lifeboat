import React from 'react'
import { useEffect } from 'react';

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const FileContents = ({ file }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    // const content = window.api.getFileContents(file.path);
    const content = "here will come the preview";

    return (
        <div className="code">
            <pre>
                <code className={`language-text`}>{content && content}</code>
            </pre>
        </div>
    )
}

export default FileContents;
