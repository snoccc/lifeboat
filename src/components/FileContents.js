import React from 'react'
import { useEffect } from 'react';

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const FileContents = ({ content }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="code">
            <pre>
                <code className={`language-text`}>{content}</code>
            </pre>
        </div>
    )
}

export default FileContents;
