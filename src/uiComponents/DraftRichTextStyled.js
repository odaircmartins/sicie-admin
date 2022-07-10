import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
//import DOMPurify from 'dompurify';
//import draftToHtml from 'draftjs-to-html';
//import { useState } from "react";
//import { convertToHTML } from 'draft-convert';
//import { EditorState } from 'draft-js';

import styled from "styled-components";

const RichTextArea = styled.div`
    width: 100%;
    min-height: 300px;
    border-radius: 5px;
    position: relative;
    float: left;
    background-color: #fff;
    border: 1px solid #cecece;

    &:hover {
        border: 1px solid var(--upload-image-color);
    }
`


function DraftRichTextStyled(props) {
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // https://www.npmjs.com/package/draft-convert
    // https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
    // https://jpuri.github.io/react-draft-wysiwyg/#/demo
    // const createMarkup = () => {
    //     let html = convertToHTML({
    //         styleToHTML: (style) => {
    //             if (style === 'BOLD') {
    //                 return <span style={{ color: 'blue' }} />;
    //             }
    //         }
    //     })(editorState.getCurrentContent());

    //     return {
    //         __html: DOMPurify.sanitize(html)
    //     }
    // };

    return (
        <RichTextArea>
            <Editor {...props} />

            {/* <div dangerouslySetInnerHTML={createMarkup()}/>  */}
        </RichTextArea>
    );
}

export default DraftRichTextStyled;