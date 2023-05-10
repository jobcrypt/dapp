

import classes from '../styles/popups/ApplyForJobPopup.module.css';
import success from '../assets/Success2.png';
import { useNavigate } from 'react-router-dom';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { getApplyLink, permissionToViewApplyLink } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import { getProvider } from '../contracts/init';
import copyIcon from '../assets/copy.png';
import checkIcon from '../assets/check2.png';



const ApplyForJobPopup = (props, ref) =>{
    const { setApply, apply, selectedPostingAddress } = props;
    const navigate = useNavigate();
    const [ applyLink, setApplyLink ] = useState('');
    const [ status, setStatus ] = useState({ isVisible: false, text: '', color: '#fff' });
    const [ shouldShow, setShouldShow ] = useState(true);
    const [ isCopied, setIsCopied ] = useState(false);
    const [ showLink, setShowLink ] = useState(false);
    

    useEffect(()=>{
        console.log('useeffect ran')
    },[]);

    const getApplyLinkHandler = async()=>{
        const applyLink = await getApplyLink(selectedPostingAddress);
        console.log(applyLink);
        if(isNull(applyLink)){
            setShouldShow(false);
            setStatus({ isVisible: true, text: 'Waiting for you to approve txn...', color: '#956B00' });
            console.log(selectedPostingAddress);
           const result = await permissionToViewApplyLink(selectedPostingAddress);
           console.log('result???', result)
           if(!isNull(result.hash)){
            setStatus({ isVisible: true, text: 'Wait for transaction to be confirmed...', color: '#956B00' });
            const wait = await getProvider().waitForTransaction(result.hash);
            if(!isNull(wait.transactionHash) && wait.status === 1){
                setStatus({ isVisible: true, text: 'Fetching link, Please wait...', color: '#159500' });
                const applyLink = await getApplyLink(selectedPostingAddress);
                setStatus({ isVisible: false, text: '', color: 'transparent' });
                setShowLink(true);
                setApplyLink(applyLink);
            }else{
                setStatus({ isVisible: true, text: 'Transaction failed.', color: 'red' });
            }
           }
        }else{
            // const result = await permissionToViewApplyLink(selectedPostingAddress);
            setShouldShow(false);
            setApplyLink(applyLink);
            setShowLink(true);
        }
    }

    const navigateToJobBoard = (type) =>{
        if(type === 2){
            navigate('/jobseeker_dashboard');
        }
        setApply(false);
        ref.current.close();
    }

    const formatLink = () =>{
        if(!isNull(applyLink)){
            return(applyLink.length > 90)? applyLink.slice(0, 90)+'...' : applyLink;
        }
        return applyLink;
    }

    const copyLinkHandler = () =>{
        navigator.clipboard.writeText(applyLink).then(()=>{
            setIsCopied(true);
            const timeout = setTimeout(()=>{
                setIsCopied(false);
                clearTimeout(timeout);
            }, 2000);
        });
    }

    const openLinkHandler = () =>{
        const url = apply.url;
        // const url = 'ifeanyi@jobcrypt.com';
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if(regex.test(url)){
        window.open(`mailto:${url}`);
        }else{
            window.open(url)
        }
    }

    const closeHandler = () =>{
        setApply(false);
        ref.current.close();
    }

   return(
        <dialog className={classes.parent}  onClick={closeHandler}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={success} alt='' className={classes.success} />
                <h1>Congratulations!!!</h1>
                <p className={classes.sendResumeTxt}>Kindly send your resume to</p>
                {showLink &&<div className={classes.copyContainer}>
                <p className={classes.emailTxt} onClick={openLinkHandler}>{formatLink()}</p>
                {!isCopied && <img src={copyIcon} alt='' onClick={copyLinkHandler} className={classes.copyIcon} />}
                {isCopied &&<img src={checkIcon} alt="" className={classes.checkIcon} />}
                {/* {isCopied &&<span>Copied!</span>} */}
                </div>}
                {shouldShow &&<p className={classes.getLinkTxt} onClick={getApplyLinkHandler}>Click to view apply link</p>}
                {status.isVisible &&<p className={classes.getLinkTxt} style={{ color: status.color, textDecoration: 'none', fontSize: '20px' }}>{status.text}</p>}
                <div className={classes.btnContainer}>
                    <button className={classes.btn1} onClick={()=>navigateToJobBoard(1)}>Browse other jobs</button>
                    <button className={classes.btn2} onClick={()=>navigateToJobBoard(2)}>Previous Applications</button>
                </div>
            </div>
        </dialog>
   )
}

export default forwardRef(ApplyForJobPopup);