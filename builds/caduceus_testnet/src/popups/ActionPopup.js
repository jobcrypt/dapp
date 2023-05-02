import { useContext, useLayoutEffect, useRef, useState } from "react";
import ReactDoM from 'react-dom';

import classes from '../styles/popups/ActionPopup.module.css';
import dropdown from '../assets/dropdown.png';
import PostJobPopup from "./PostJobPopup";
import ArchivePostingPopup from "./ArchivePostingPopup";
import { isNull } from "../utils/Util";
import { executeJobPostingAction } from "../contracts/ContractManager";
import { FormContext } from "../App";
import { getProvider } from "../contracts/init";


const ActionPopup = (props) =>{
    const { clientX, clientY, setShowAction, item } = props;
    const ref = useRef();
    const [ openPostJob, setOpenPostJob ] = useState(false);
    const [ openArchive, setOpenArchive ] = useState(false);
    const { setEmployerPostingAddress } = useContext(FormContext);

    useLayoutEffect(()=>{
        //save the employer posting address so that it can be acessible in the edit form page.
        setEmployerPostingAddress(item.postingAddress);
        ref.current.style.left = (clientX - 110)+'px';//here is supposed to be 130 based on the css, but to make the arrow point directly under, i removed 20px
        ref.current.style.top = (clientY + 20)+'px';
    },[]);



    const archiveJobHandler = () =>{
        setOpenArchive(true);
    }

    const handleOption = async(option) =>{
        let code, status='';
        if(option === 'EDIT'){
            setOpenPostJob(true);
        }
        // if(option === 'EXTEND')
        else{
            if(option === 'FILL'){
                code = 2;
                status = 'FILLED'
            }
            if(option === 'CANCEL'){
                code = 3;
                status = 'CANCELLED';
            }
            if(option === 'ARCHIVE'){
                code = 8;
                status = 'ARCHIVED';
            }
           const result = await executeJobPostingAction(code, item.postingAddress);
           console.log('Execution status: ', result);
           const wait = await getProvider().waitForTransaction(result.hash);
           console.log('Wait :: ',wait);
           if(!isNull(wait.transactionHash) && wait.status === 1)item.status = status;
        }
    }

    const element = (
        <>
        {openPostJob && <PostJobPopup formToOpen='CREATE_FORM' setOpenPostJob={setOpenPostJob} />}
        {openArchive && <ArchivePostingPopup setOpenArchive={setOpenArchive} />}
        <section className={classes.parent} onClick={()=>setShowAction(false)}>
            <div className={classes.box} ref={ref} onClick={(e)=>e.stopPropagation()}>
                <img src={dropdown} alt='' />
                {!isNull(item.options) && item.options.map((option, idx)=>(
                    <p key={`${idx+1}${option}${idx}`} onClick={()=>handleOption(option)}>{option}</p>
                ))}
               
            </div>
        </section>
        </>
    );

        return element;
}

export default ActionPopup;