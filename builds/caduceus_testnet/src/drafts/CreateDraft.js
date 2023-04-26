import { useCallback, useContext, useEffect } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import { useState } from 'react';
import { createPosting, loadJobPostings } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import Wrapper from '../components/Wrapper';
import Spinner from '../components/Spinner';
import { AccountContext } from '../App';

const CreateDraft = (props) =>{
     const { setDispatch } = props;
     const [ txnHash, setTxnHash ] = useState('');
     const [ isLoading, setIsLoading ] = useState({ status: true, message: ''});
     const [ jobPostingArray, setJobPostingArray ] = useState([]);
     const [ selectedJobPostingAddress, setSelectedJobPostingAddress ] = useState('');
     const { account } = useContext(AccountContext);

     const getJobPostings = useCallback(async() =>{
        setIsLoading({ status: true, message: 'loading job postings, please wait...'})
        const products = await loadJobPostings();
        setJobPostingArray(products);
        setIsLoading({ status: false, message: ''});
        console.log('Products: ',products)
     },[]);


     useEffect(()=>{
        getJobPostings();
     },[getJobPostings]);


    const createJobPosting = async() =>{
        console.log('isConnected: ', account.isConnected)

        if(isNull(selectedJobPostingAddress))return;
        if(!account.isConnected)return;
        sessionStorage.setItem('posting_address', selectedJobPostingAddress);
       const result = await createPosting(selectedJobPostingAddress);
       if(!isNull(result)){
        setTxnHash(`Draft Posting Created Txn: ${result.hash}`);
       }
    }

    const continueToEditPane = () =>{
         setDispatch({ TYPE: 'CREATE_FORM' });
    }



    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setDispatch({ TYPE: 'EMPLOYER_DASHBOARD'})} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Create Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            {(!isNull(txnHash)) && <p className={classes.txnText}>{txnHash}</p>}
            <p className={classes.jobPostingTxt}>Job Postings</p>
            <section className={classes.radioSection}>
                {isLoading.status && <Wrapper width={'fit-content'} height={'fit-content'}>
                      <Spinner size={25} color1={'#2c2231'} />
                      <p className={classes.statusTxt}>{isLoading.message}</p>
                    </Wrapper>}
                {!isNull(jobPostingArray) && jobPostingArray.map(item=>(
                <div className={classes.radioParent} key={item.address} onClick={()=>setSelectedJobPostingAddress(item.address)}>
                     <input type='radio' id={item.address} name='good' />
                     <label htmlFor={item.address}>{item.optionTxt}</label>
                 </div>
                ))}
            </section>
            <div className={classes.btnContainer}>
            {isNull(txnHash) && <button className={classes.linearGradBtn} onClick={createJobPosting}>Create Draft Job Posting</button>}
            {!isNull(txnHash) &&<button className={classes.linearGradBtn} onClick={continueToEditPane}>Continue</button>}
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default CreateDraft;