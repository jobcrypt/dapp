import { useNavigate } from 'react-router-dom';


import classes from '../styles/dropdowns/EventsDropdown.module.css';
import PostJobPopup from '../popups/PostJobPopup';
import { useContext, useEffect, useRef, useState } from 'react';
import { stake, unstake } from '../contracts/ContractManager';
import { getProvider } from '../contracts/init';
import { AccountContext } from '../App';
import { isNull } from '../utils/Util';
import ReceiptPopup from '../popups/ReceiptPopup';


let isRunning = false;
const JobsDropdown = (props) =>{
    const { setShowHamburger, setDispatch } = props;
    const navigate = useNavigate();
    const [ openPostJob, setOpenPostJob ] = useState(false);
    const { setIsStaked, isStaked, setIsApproved } = useContext(AccountContext);
    const [ showReceipt, setShowReceipt ] = useState({ hash: '', type: '', isVisible: false });
    const dialogRef = useRef();


    const stakeHandler = async() =>{
        if(isRunning)return;
        isRunning = true;
        const txn = await stake();
        // console.log(txn);
        const wait = await getProvider().waitForTransaction(txn.hash)
        if(!isNull(wait.transactionHash) && wait.status === 1){
            setIsStaked(true);
        }
        setShowReceipt({ hash: txn.hash, type: 'Gas Fee', isVisible: true }); 
        isRunning = false;
        // setShowHamburger(false);
        // setDispatch({ TYPE: 'JOBS', status: false });
    }

    const unstakeHandler = async() =>{
        if(isRunning)return;
        isRunning = true;
        const txn = await unstake();
        const wait = await getProvider().waitForTransaction(txn.hash)
        if(!isNull(wait.transactionHash) && wait.status === 1){
            setIsStaked(false);
            setIsApproved(false);
        }
        setShowReceipt({ hash: txn.hash, type: 'Gas Fee', isVisible: true }); 
        isRunning = false;
        // setShowHamburger(false);
        // setDispatch({ TYPE: 'JOBS', status: false });
     }

       const navigateToPage = (path, tab) =>{
           navigate(path, { state: {tab: tab}})
           setShowHamburger(false);
           setDispatch({ TYPE: 'JOBS', status: false });
       }

       const openPostJobHandler = () =>{
        setOpenPostJob(true);
        
        console.log('hdhdgfdgdh')
       }

       useEffect(()=>{
            console.log('open: ', openPostJob)
       }, [openPostJob]);


    return(
        <>
        {openPostJob && <PostJobPopup formToOpen='CREATE_DRAFT' setOpenPostJob={setOpenPostJob} />}
        {showReceipt.isVisible && <ReceiptPopup hash={showReceipt.hash} type={showReceipt.type} setShowReceipt={setShowReceipt} ref={dialogRef} />}
        <ul className={classes.ul} onClick={(e)=>e.stopPropagation()}>
            <li onClick={()=>navigateToPage('/browse-job', 'featured')}>Featured Jobs</li>
            <li onClick={()=>navigateToPage('/browse-job', 'latest')}>Latest Jobs</li>
            <li onClick={()=>navigateToPage('/browse-job', 'popular')}>Popular Jobs</li>
            {/* <li onClick={()=>navigateToPage('/about', 'contact')}>Contact</li> */}
            {/* <span className={classes.line}>m</span> */}
            <hr className={classes.line}/>
            {!isStaked &&<p className={classes.stakeTag} onClick={stakeHandler}>Stake CMP</p>}
            {isStaked &&<p className={classes.stakeTag} onClick={unstakeHandler}>Unstake CMP</p>}
            <button className={classes.postJobBtn} onClick={openPostJobHandler}>Post A Job</button>
        </ul>
        </>
    )
}

export default JobsDropdown;