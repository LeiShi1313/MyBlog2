import React from 'react'


const CodeBlock = ({ children }) => (
    <div class='gatsby-highlight' dataLanguage='text'>
        <pre class='language-text'>
            <code class='language-text'>
                {children}
            </code>
        </pre>
    </div>
);

export default CodeBlock;