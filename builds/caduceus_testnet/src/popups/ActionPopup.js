import { useLayoutEffect, useRef, useState } from "react";
import ReactDoM from 'react-dom';

import classes from '../styles/popups/ActionPopup.module.css';
import dropdown from '../assets/dropdown.png';
import PostJobPopup from "./PostJobPopup";
import ArchivePostingPopup from "./ArchivePostingPopup";


const ActionPopup = (props) =>{
    const { clientX, clientY, setShowAction } = props;
    const ref = useRef();
    const [ openPostJob, setOpenPostJob ] = useState(false);
    const [ openArchive, setOpenArchive ] = useState(false);


    useLayoutEffect(()=>{
        ref.current.style.left = (clientX - 110)+'px';//here is supposed to be 130 based on the css, but to make the arrow point directly under, i removed 20px
        ref.current.style.top = (clientY + 20)+'px';
    },[]);


    const editJobHandler = () =>{
        setOpenPostJob(true);
    }

    const archiveJobHandler = () =>{
        setOpenArchive(true);
    }

    const element = (
        <>
        {openPostJob && <PostJobPopup formToOpen='EDIT_DRAFT' setOpenPostJob={setOpenPostJob} />}
        {openArchive && <ArchivePostingPopup setOpenArchive={setOpenArchive} />}
        <section className={classes.parent} onClick={()=>setShowAction(false)}>
            <div className={classes.box} ref={ref} onClick={(e)=>e.stopPropagation()}>
                <img src={dropdown} alt='' />
                <p onClick={editJobHandler}>Edit Job</p>
                <p onClick={archiveJobHandler}>Archive Job</p>
            </div>
        </section>
        </>
    );

        return element;
    // return(
    //     ReactDoM.createPortal(element, document.getElementById('layout'))
    // )
}

export default ActionPopup;