import { useCallback, useContext, useEffect } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import { useState } from 'react';
import { createDraftPosting, findEmployerDashboard, loadJobProducts } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import Wrapper from '../components/Wrapper';
import Spinner from '../components/Spinner';
import { AccountContext, FormContext } from '../App';
import { getProvider } from '../contracts/init';

let isRunning = false;
const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

const CreateDraft = (props) =>{
     const { setDispatch, setOpenPostJob } = props;
     const [ txnHash, setTxnHash ] = useState({ text: '', color: 'transparent', confirmed: false });
    //  const [ txnHash, setTxnHash ] = useState('');
     const [ isLoading, setIsLoading ] = useState({ status: true, message: ''});
     const [ jobProductArray, setJobProductArray ] = useState([]);
     const [ selectedProductAddress, setSelectedProductddress ] = useState('');
     const { account, setEmployerDashAddress } = useContext(AccountContext);
     const { setProductAddress, setEditingJobPosting  } = useContext(FormContext);


     const getEmployerDashboard = useCallback(async() =>{
        const dashAddress = await findEmployerDashboard();
        // console.log('DASH ADDRESS ', dashAddress)
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            console.log('dash: ', dashAddress);
            setEmployerDashAddress(dashAddress);
      }
    },[])


     const getJobProducts = useCallback(async() =>{
        setIsLoading({ status: true, message: 'loading job postings, please wait...'});
        const products = await loadJobProducts();
        setJobProductArray(products);
        setIsLoading({ status: false, message: '' });
        // console.log('Products: ',products);
     },[]);


     useEffect(()=>{
        getEmployerDashboard();
        getJobProducts();
     },[getJobProducts, getEmployerDashboard]);


     //after user has selected the product plans, then proceed to create a posting address which the user can use to add, save and pay for.
    const createJobPosting = async() =>{
        // console.log('isConnected: ', account.isConnected)

        if(isNull(selectedProductAddress))return;
        if(!account.isConnected)return;
        // sessionStorage.setItem('posting_address', selectedProductAddress);
        isRunning = true;
       const result = await createDraftPosting(selectedProductAddress);
       setTxnHash({ text: 'Waiting for your transaction to be confirmed, Please wait...', color: '#956B00', confirmed: false });
       try{
            const waitForTx = await getProvider().waitForTransaction(result.hash);
            // console.log('waiting for result: ', waitForTx);
            if(!isNull(waitForTx.transactionHash) && waitForTx.status === 1){
            setTxnHash({ text: `Draft Posting Created Txn: ${waitForTx.transactionHash}`, color: '#159500', confirmed: true });
            }else{
                setTxnHash({ text: `Transaction was unsuccessful.`, color: 'red' });
            }
       }catch(err){
        setTxnHash({ text: `Transaction failed.`, color: 'red' });
       }
       isRunning = false;
      
    }

    const continueToEditPane = () =>{
         setDispatch({ TYPE: 'EDIT_DRAFT' });
    }

    const setSelectedJobProductHandler = (item) =>{
        setSelectedProductddress(item.address);
        setProductAddress(item.address);
        setEditingJobPosting(`Note: You are editing ${item.name} - ${item.price} - ${item.currency} (${item.address})`);
    }



    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setOpenPostJob(false)} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Create Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            {(!isNull(txnHash)) && <p className={classes.txnText} style={{ color: txnHash.color}}>{txnHash.text}</p>}
            <p className={classes.jobPostingTxt}>Job Postings</p>
            <section className={classes.radioSection}>
                {isLoading.status && <Wrapper width={'fit-content'} height={'fit-content'}>
                      <Spinner size={25} color1={'#2c2231'} />
                      <p className={classes.statusTxt}>{isLoading.message}</p>
                    </Wrapper>}
                {!isNull(jobProductArray) && jobProductArray.map(item=>(
                <div className={classes.radioParent} key={item.address} onClick={()=>setSelectedJobProductHandler(item)}>
                     <input type='radio' id={item.address} name='good' />
                     <label htmlFor={item.address}>{item.optionTxt}</label>
                 </div>
                ))}
            </section>
            <div className={classes.btnContainer}>
            {(!txnHash.confirmed) && <button disabled={isRunning} className={classes.linearGradBtn} onClick={createJobPosting}>Create Draft Job Posting</button>}
            <button className={classes.normalBtn} onClick={()=>setOpenPostJob(false)}>Close</button>
            {txnHash.confirmed &&<button className={classes.linearGradBtn} onClick={continueToEditPane}>Continue</button>}
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default CreateDraft;