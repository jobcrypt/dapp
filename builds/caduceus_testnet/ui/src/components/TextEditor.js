import { useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isNull } from "../utils/Util";


const TextEditor = (props) =>{
    const { setJobDesc, setPaymentStatus, editorHtmlValue } = props;

    const onEditorStateChange = (html)=>{
        // console.log(html)
        if(isNull(html))setJobDesc({ isValid: false, text: html });
        else setJobDesc({ isValid: true, text: html });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }
    
    return(
            <ReactQuill
                onChange={onEditorStateChange}
                value={editorHtmlValue}
                style={{ width: '100%', height: '200px', marginBottom: '30px' }}
        />
    )
}

export default TextEditor;