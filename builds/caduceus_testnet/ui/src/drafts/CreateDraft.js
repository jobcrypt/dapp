import { forwardRef, useCallback, useContext, useEffect } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import { useState } from 'react';
import { createDraftPosting, findEmployerDashboard, getDraftPosting, loadJobProducts } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import Wrapper from '../components/Wrapper';
import Spinner from '../components/Spinner';
import { AccountContext, FormContext } from '../App';
import { getProvider } from '../contracts/init';
import EditDraftList from '../lists/EditDraftList';
import dropdownIcon from '../assets/dropdown.png';



let isRunning = false;
const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

const CreateDraft = (props, ref) =>{
     const { setDispatch, setOpenPostJob, setShowDialog } = props;
     const [ txnHash, setTxnHash ] = useState({ text: '', color: 'transparent', confirmed: false });
    //  const [ txnHash, setTxnHash ] = useState('');
     const [ isLoading, setIsLoading ] = useState({ status: true, message: ''});
     const [ jobProductArray, setJobProductArray ] = useState([]);
     const [ error, setError ] = useState('');
     const [ isEditing, setIsEditing ] = useState(`EDITING DRAFT ::`);
     const [ selectedDraft, setSelectedDraft ] = useState({ text: `Click to select an existing Job Posting`, isVisible: false, address: '' });
     const [ draftArray, setDraftArray ] = useState([]);
     const { account, setEmployerDashAddress, employerDashAddress } = useContext(AccountContext);
     const { setProductAddress, productAddress, setEditingJobPosting  } = useContext(FormContext);
     const [ disabledCreateDraft, setDisabledCreateDraft ] = useState(false);
     const [ disabledEditDraft, setDisabledEditDraft ] = useState(false);
     const [ createdDraftProductAddress, setCreatedDraftProductAddress ] = useState(null);


     useEffect(()=>{
         if(isNull(selectedDraft.address))return;

         setCreatedDraftProductAddress(null);
         setDisabledCreateDraft(true);
         setDisabledEditDraft(false);
     },[selectedDraft.address])

     const getEmployerDashboard = useCallback(async() =>{
        const dashAddress = await findEmployerDashboard();
        // console.log('DASH ADDRESS ', dashAddress)
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            // console.log('dash: ', dashAddress);
            setEmployerDashAddress(dashAddress);
            getJobProducts();
            getDraftPostingsHandler();
      }
    },[])


     const getJobProducts = useCallback(async() =>{
        setIsLoading({ status: true, message: 'loading job postings, please wait...'});
        const products = await loadJobProducts();
        setJobProductArray(products);
        setIsLoading({ status: false, message: '' });
        // console.log('Products: ',products);
     },[]);


     const getDraftPostingsHandler = useCallback(async()=>{
        // console.log('EMPLOYER DASH ADDRESS: ', employerDashAddress);
        setIsLoading({ status: true, message: '' });
        setDraftArray([]);
        if(isNull(employerDashAddress))return;
        const result = await getDraftPosting(employerDashAddress);
        setDraftArray(result);
        setIsLoading({ status: false, message: isNull(result)? 'No drafts' : '' });
        // console.log('RESULT IS =======>', result);
    },[]);


     useEffect(()=>{
        getEmployerDashboard();
     },[getJobProducts, getEmployerDashboard]);

    

     //after user has selected the product plans, then proceed to create a posting address which the user can use to add, save and pay for.
    const createJobPosting = async() =>{
        // console.log('isConnected: ', account.isConnected)
        if(isNull(productAddress)){
            setError('You have to select an option');
            return;
        };
        if(!account.isConnected)return;
        // sessionStorage.setItem('posting_address', productAddress);
        isRunning = true;
        setError('');
        setTxnHash({ text: 'Waiting for approval...', color: '#956B00', confirmed: false });
       const result = await createDraftPosting(productAddress);
       setTxnHash({ text: 'Waiting for your transaction to be confirmed, Please wait...', color: '#956B00', confirmed: false });
       try{
            const waitForTx = await getProvider().waitForTransaction(result.hash);
            // console.log('waiting for result: ', waitForTx);
            if(!isNull(waitForTx.transactionHash) && waitForTx.status === 1){
            setTxnHash({ text: `Draft Posting Created Txn: ${waitForTx.transactionHash}`, color: '#159500', confirmed: true });
            }else{
                setTxnHash({ text: `Transaction was unsuccessful.`, color: 'red', confirmed: false });
            }
       }catch(err){
        setTxnHash({ text: `Transaction failed.`, color: 'red', confirmed: false });
       }
       isRunning = false;
      
    }

    const continueToEditPane = () =>{
         setDispatch({ TYPE: 'EDIT_DRAFT' });
    }

    const setSelectedJobProductHandler = (item) =>{
            //when you select on a product, override the old product address with the new one. The address could be from the editList file or this file. Then disable the edit draft button. Reset everything about edit draft
        setProductAddress(item.address);
        // setEditingJobPosting(`Note: You are editing ${item.name} - ${item.price} - ${item.currency} (${item.address})`);
        setSelectedDraft({ text: `Click to select an existing Job Posting`, isVisible: false, address: '' });
        setDisabledEditDraft(true);
        setDisabledCreateDraft(false);
        setIsEditing(`EDITING DRAFT ::`);

  //This function is redundant. Im using it for controlling the radio button so when clicked, it saves the product address but when edit draft is edited, it clears the selection and disables the button
  setCreatedDraftProductAddress(item.address);

}

    const jumpToFormHandler = () =>{
        if(!isNull(selectedDraft.text) && !isNull(isEditing))setDispatch({ TYPE: 'CREATE_FORM' });
        else return;
    }

    const updateProductHandler = (e) =>{
        const value = e.target.value;
        // console.log(value)
        //when you select on a product, override the old product address with the new one. The address could be from the editList file or this file. Then disable the edit draft button
        setProductAddress(value);
        setSelectedDraft({ text: `Click to select an existing Job Posting`, isVisible: false, address: '' });
        setDisabledEditDraft(true);
        setDisabledCreateDraft(false);
        setIsEditing(`EDITING DRAFT ::`);

        //This function is redundant. Im using it for controlling the radio button so when clicked, it saves the product address but when edit draft is edited, it clears the selection and disables the button
        setCreatedDraftProductAddress(value)
    }

    const closeHandler = () =>{
        setOpenPostJob(false);
        setShowDialog(false);
        ref.current.close();
    }

    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setOpenPostJob(false)} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Create or Edit Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            {(!isNull(txnHash)) && <p className={classes.txnText} style={{ color: txnHash.color}}>{txnHash.text}</p>}
            <div className={classes.inputContainer}>
                <input 
                    type='' 
                    placeholder='Click to select an existing Job Posting' 
                    readOnly 
                    className={classes.input2} 
                    value={selectedDraft.text} 
                    onFocus={()=>setSelectedDraft(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setSelectedDraft(prev=>({...prev, isVisible: false})), 300)}
                />
                <p className={classes.editingTxt}>{isEditing}</p>
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {selectedDraft.isVisible && <EditDraftList setSelectedDraft={setSelectedDraft} setIsEditing={setIsEditing} setDraftArray={setDraftArray} draftArray={draftArray} isLoading={isLoading.status} message={isLoading.message} />}
            </div>
            <div className={classes.btnContainer}>
            <button disabled={disabledEditDraft} className={classes.linearGradBtn} onClick={jumpToFormHandler}>Edit Draft Job Posting</button>
            </div>
            <p className={classes.jobPostingTxt}>Job Postings<strong style={{ color: 'rgba(230, 9, 9, 0.725)', fontSize: '15px', fontWeight: 'normal'}}>(Note: Payment for selected products happens later)</strong></p>
            <section className={classes.radioSection}>
                {isLoading.status && <Wrapper width={'fit-content'} height={'fit-content'}>
                      <Spinner size={25} color1={'#2c2231'} />
                      <p className={classes.statusTxt}>{isLoading.message}</p>
                    </Wrapper>}
                {!isNull(jobProductArray) && jobProductArray.map(item=>(
                <div className={classes.radioParent} key={item.address} onClick={()=>setSelectedJobProductHandler(item)}>
                     <input 
                        type='radio' 
                        htmlFor={item.address}
                        id={item.address} 
                        name='good' 
                        checked={createdDraftProductAddress === item.address}
                        value={item.address}
                        onChange={updateProductHandler}
                        />
                     <label htmlFor={item.address}>{item.optionTxt}</label>
                 </div>
                ))}
            </section>
            {!isNull(error) &&<p style={{ color: '#159500'}} className={classes.error}>{error}</p>}
            <div className={classes.btnContainer}>
            <button className={classes.normalBtn} onClick={closeHandler}>Close</button>
            {(!isNull(jobProductArray) || !txnHash.confirmed) && <button disabled={disabledCreateDraft} className={classes.linearGradBtn} onClick={createJobPosting}>Create Draft Job Posting</button>}
            {txnHash.confirmed &&<button className={classes.linearGradBtn} onClick={continueToEditPane}>Continue</button>}
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default forwardRef(CreateDraft);