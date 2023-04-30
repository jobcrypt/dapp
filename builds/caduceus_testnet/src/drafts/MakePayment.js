



import { useState } from 'react';
import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'


const MakePayment = (props) =>{
    const { setDispatch } = props;
    const [ paymentStatus, setPaymentStatus ] = useState({status: 'none', text: '', color: 'transparent', show: false});


    const makePaymentHandler = () =>{
        if(!paymentStatus.show)setPaymentStatus(prev=>({...prev, show: true }));
        if(paymentStatus.status === 'none'){
            setPaymentStatus({ status: 'approved', text: 'Approved: 0xB5fC104567DC63E6D9cde372c518E6CCadfD3C32', color: '#956B00', show: true })
        }else if(paymentStatus.status === 'approved'){
        setPaymentStatus({ status: 'paid', text: 'Paid: 0xB5fC104567DC63E6D9cde372c518E6CCadfD3C32', color: '#159500', show: true})
        }else{
            //close popup
        }
    }


    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setDispatch({ TYPE: 'CREATE_FORM' })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Pay For Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            {paymentStatus.show && <p className={classes.txnText} style={{color: paymentStatus.color}}>{paymentStatus.text}</p>}
            {/* <p className={classes.titleBold}>Job Postings</p> */}
            <section className={classes.paymentSection}>
                <div className={classes.payContainer}>
                    <h2>Selected Duration</h2>
                    <label>2 Weeks standard</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Posting Fee</h2>
                    <label>2,326 CMP</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Selected Duration</h2>
                    <label>2 Weeks standard</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Payment Currency</h2>
                    <label>CMP</label>
                </div>
                <div className={classes.payContainer}>
                    <h2>Curency Contract</h2>
                    <label>0xB5fC104567DC63E6D9cde372c518E6CCadfD3C32</label>
                </div>
            </section>
            <div className={classes.btnContainer}>
            <button className={classes.linearGradBtn} onClick={makePaymentHandler}>Approve Payment currency</button>
            {/* <button className={classes.linearGradBtn} onClick={makePaymentHandler}>Buy Your Job Listing</button> */}
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default MakePayment;