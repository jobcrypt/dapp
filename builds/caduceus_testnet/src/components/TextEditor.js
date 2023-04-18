import { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const TextEditor = () =>{
    const [ editorState, setEditorState ] = useState(false);

    const onEditorStateChange = (e)=>{

    }
    
    return(
        <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
/>
    )
}

export default TextEditor;