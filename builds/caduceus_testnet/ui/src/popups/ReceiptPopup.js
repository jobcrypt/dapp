

import classes from '../styles/popups/ReceiptPopup.module.css';
import copyIcon from '../assets/copy.png';
import linkIcon from '../assets/external-link.png';
import checkIcon from '../assets/check2.png';
import { BLOCK_EXPLORER, isNull } from '../utils/Util';
import { forwardRef, useEffect, useState } from 'react';

const ReceiptPopup = (props, ref) =>{
    const { hash, type, setShowReceipt } = props;
    const [ isCopied, setIsCopied ] = useState(false);

    useEffect(()=>{
        if(!ref.current.open)
        ref.current.showModal();
    },[]);
  
    const openUrl = () =>{
       const url = `${BLOCK_EXPLORER}/${hash}`;
       window.open(url);
    }

    const copyHandler = () =>{
        setIsCopied(true);
        navigator.clipboard.writeText(hash).then(result=>{
            let timeout = setTimeout(()=>{
                setIsCopied(false);
                clearTimeout(timeout);
            },2000);
        }).catch(err=>{
            setIsCopied(false);
        })
    }

    return(
        <dialog className={classes.parent} ref={ref}>
             <div className={classes.box}>
                 <header className={classes.header}>Transaction Receipt</header>
                 <span className={classes.typeTxt}>{type}</span>
                 <span className={classes.middle}>
                    <p>{`Txn Hash: ${!isNull(hash) && hash.slice(0,30)+'...'}`} </p>
                    {!isCopied &&<img src={copyIcon} alt='' onClick={copyHandler} />}
                    {isCopied &&<img src={checkIcon} alt="" className={classes.checkIcon} />}
                 </span>
                 <div className={classes.btnContainer}>
                    <button className={classes.explorerBtn} onClick={openUrl}>View on Explorer <img src={linkIcon} alt='' /></button>
                    <button className={classes.closeBtn} onClick={()=>setShowReceipt(prev=>({...prev, isVisible: false }))}>Close</button>
                 </div>
             </div>
        </dialog>
    )
}

export default forwardRef(ReceiptPopup);