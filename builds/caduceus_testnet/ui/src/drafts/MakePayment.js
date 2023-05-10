



import { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import { AccountContext, FormContext } from '../App';
import { approvePayment, buyPosting, getPaymentInformation, postAJob } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import { getProvider } from '../contracts/init';
import { ethers } from 'ethers';
import ReceiptPopup from '../popups/ReceiptPopup';

let isRunning = false;
const MakePayment = (props, ref) =>{
    const { setDispatch, setOpenPostJob, setShowDialog } = props;
    const [ paymentStatus, setPaymentStatus ] = useState({text: '', isApproved: false, color: 'transparent', isPaid: false });
    const [ paymentData, setPaymentData ] = useState({ duration: '', erc20: '--',  weeks: '--', price: 0, currency: '--', decimal: 0, rawPrice: null });
    const { productAddress, employerPostingAddress } = useContext(FormContext);
    const { account } = useContext(AccountContext);
    const [ isPosted, setIsPosted ] = useState(false);
    const [ showReceipt, setShowReceipt ] = useState({ hash: '', type: '', isVisible: false });
    const dialogRef = useRef();

    const getPaymentInfo = useCallback(async() =>{
        const result = await getPaymentInformation(employerPostingAddress);
        // console.log('product address for approval: ', productAddress);
        console.log('result of approval: ', result)
        if(!isNull(result)){
            setPaymentData({
                duration: result.duration, erc20: result.erc20,  weeks: result.weeks, price: result.price, currency: result.currency, decimal: result.decimal, rawPrice: result.rawPrice
            });
        }
    },[]);


    useEffect(()=>{
        getPaymentInfo();
    },[getPaymentInfo]);


    const approvePaymentHandler = async() =>{
        if(isRunning)return;
        isRunning=true;
        setPaymentStatus({ text: 'Waiting for approval...', color: '#956B00', isApproved: false });
        console.log('Price: ', paymentData.price)
        console.log('......', paymentData.decimal)
        // const price = paymentData.price * (10**paymentData.decimal);
        const price = ethers.utils.parseUnits(paymentData.price, paymentData.decimal)
        const result = await approvePayment(price, paymentData.erc20);
        console.log(result)
        if(!isNull(result)){
            setPaymentStatus({ text: 'Confirming your approval...', color: '#956B00', isApproved: false });
            try{
                const waitForTx = await getProvider().waitForTransaction(result.hash);
                if(!isNull(waitForTx) && waitForTx.status === 1){
                    setPaymentStatus({ text: `Approved: ${waitForTx.transactionHash}`, color: '#159500', isApproved: true });
                }
        }catch(err){
            setPaymentStatus({ text: `Failed to approve, Try again later!`, color: 'red', isApproved: false });
        }
        }
        isRunning = false;
    }

    const makePaymentHandler = async() =>{
        // setShowReceipt({ hash: '0xz82726363g363t3f3fgwhh2', type: 'Gas Fee', isVisible: true }); 
        // return
        if(isRunning)return;
        isRunning=true;
        setPaymentStatus(prev=>({ ...prev, text: 'Waiting for payment...', color: '#956B00', isPaid: false }));
        // console.log(employerPostingAddress);

        // const price = paymentData.price * (10**paymentData.decimal);
        const price = paymentData.rawPrice;
        const result = await buyPosting(employerPostingAddress, price, paymentData.erc20, account.address);
        console.log('result: ', result);
        if(!isNull(result)){
            setPaymentStatus(prev=>({ ...prev, text: 'Confirming your payment...', color: '#956B00', isPaid: false }));
            try{
                const waitForTx = await getProvider().waitForTransaction(result.hash);
                if(!isNull(waitForTx) && waitForTx.status === 1){
                    setPaymentStatus(prev=>({ ...prev, text: `Paid: ${waitForTx.transactionHash}`, color: '#159500', isPaid: true }));
                }else{
                    setPaymentStatus(prev=>({ ...prev, text: `Payment failed. Try again later!`, color: 'red', isPaid: false }));
                }
        }catch(err){
            setPaymentStatus(prev=>({ ...prev, text: `Payment failed. Try again later!`, color: 'red', isPaid: false }));
        }
        setShowReceipt({ hash: result.hash, type: 'Posting Fee', isVisible: true }); 
        }
        isRunning=false;

    }

    const postJobHandler = async() =>{
        if(isRunning)return
        isRunning=true;
        setPaymentStatus(prev=>({ ...prev, text: `Wait for your posting to finish...`, color: '#956B00' }));
         const result = await postAJob(employerPostingAddress, paymentData.erc20);
         try{
            const wait = await getProvider().waitForTransaction(result.hash);
            if(!isNull(wait) && wait.status === 1){
                setPaymentStatus(prev=>({ ...prev, text: `Posting successful: ${wait.transactionHash}`, color: '#159500' }));
                setIsPosted(true);
            }else{
                setPaymentStatus(prev=>({ ...prev, text: `Unable to post this job. Try again later!`, color: 'red' }));
            }
            setShowReceipt({ hash: result.hash, type: 'Gas Fee', isVisible: true }); 
         }catch(err){
            setPaymentStatus(prev=>({ ...prev, text: `Posting approval failed. Try again later!`, color: 'red' }));
         }
         isRunning=false;
    }

    const closeHandler = () =>{
        setOpenPostJob(false);
        setShowDialog(false);
        ref.current.close();
    }

    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
            {showReceipt.isVisible && <ReceiptPopup hash={showReceipt.hash} type={showReceipt.type} setShowReceipt={setShowReceipt} ref={dialogRef} />}
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setDispatch({ TYPE: 'CREATE_FORM' })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Pay For Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            <p className={classes.txnText} style={{color: paymentStatus.color}}>{paymentStatus.text}</p>
            {/* <p className={classes.titleBold}>Job Postings</p> */}
            <section className={classes.paymentSection}>
                <div className={classes.payContainer}>
                    <h2>Selected Duration</h2>
                    <label>{`${paymentData.duration} ${paymentData.duration > 1? 'Weeks' : 'Week'}`}</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Posting Fee</h2>
                    <label>{`${paymentData.price} ${paymentData.currency}`}</label>
                </div>
                {/* <div className={classes.payContainer}>
                    <h2>Selected Duration</h2>
                    <label>2 Weeks standard</label>
                </div> */}
                <div className={classes.payContainer}>
                    <h2>Payment Currency</h2>
                    <label>{paymentData.currency}</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Curency Contract</h2>
                    <label>{paymentData.erc20}</label>
                </div>
            </section>
            <div className={classes.btnContainer}>
            <button className={classes.normalBtn} onClick={closeHandler}>Close</button>
            {/* {(!paymentStatus.isApproved && !paymentStatus.isPaid) &&<button className={classes.linearGradBtn} onClick={approvePaymentHandler}>Approve Payment currency</button>} */}
            {/* {(paymentStatus.isApproved && !paymentStatus.isPaid) &&<button style={paymentData.isPaid? { display: 'none' } : {}} className={classes.linearGradBtn} onClick={makePaymentHandler}>Buy Your Job Listing</button>} */}
            {(!paymentStatus.isPaid) &&<button style={paymentData.isPaid? { display: 'none' } : {}} className={classes.linearGradBtn} onClick={makePaymentHandler}>Buy Your Job Listing</button>}
            {(paymentStatus.isPaid) && <button style={isPosted? { display: 'none'} : {}} className={classes.linearGradBtn} onClick={postJobHandler}>Post Job</button>}
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default forwardRef(MakePayment);