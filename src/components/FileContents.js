import React from 'react'
import { useEffect } from 'react';

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const FileContents = ({ filename }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const content = window.api.getFileContents(filename);

    return (
        <div className="code">
            <pre>
                <code className={`language-text`}>{content}</code>
            </pre>
        </div>
    )
}

export default FileContents;
