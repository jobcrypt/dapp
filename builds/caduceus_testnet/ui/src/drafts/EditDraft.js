import { useCallback, useEffect, useState, useContext, forwardRef } from 'react';


import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';
import EditDraftList from '../lists/EditDraftList';
import { getDraftPosting, getProductAddressInfo } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import { AccountContext, FormContext } from '../App';



const EditDraft = (props, ref) =>{
    const { setDispatch, setOpenPostJob, setShowDialog } = props;
    const [ draftArray, setDraftArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState({ status: false, message: '' });
    const { employerDashAddress } = useContext(AccountContext);
    const { employerPostingAddress, setEmployerPostingAddress, setEditingJobPosting, setProductAddress } = useContext(FormContext);
    const [ isEditing, setIsEditing ] = useState(`EDITING DRAFT ::`);
    const [ selectedDraft, setSelectedDraft ] = useState({ text: `Click to select an existing job posting ::`, isVisible: false, address: '' });


    // const getProductAddressInfoHandler = useCallback(async()=>{
    //     console.log('POSTING ADDRSES>>>>>>>>>>>>>', employerPostingAddress)
    //     const result = await getProductAddressInfo(employerPostingAddress);
    //     // console.log(result)
    //     if(!isNull(result)){
    //         setEditingJobPosting(`Note: You are editing ${result.name} - ${result.price} - ${result.currency} (${result.productAddress })`);

    //         const value ="Title :: " + item.jobTitle + " :: status :: " + item.status + " :: " + item.draftPostingAddress + " :: "+ item.name;
    //         setSelectedDraft({ text: value, isVisible: false, address: item.draftPostingAddress });
    //         setIsEditing('EDITING DRAFT :: '+employerPostingAddress);
    //         setEmployerPostingAddress(employerPostingAddress);
    //         setProductAddress(result.productAddress);
    //         // console.log(item.productAddress)
    //         // console.log(item.draftPostingAddress)
    //     }
    // },[]);

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
        // getProductAddressInfoHandler();
        getDraftPostingsHandler();
    },[getDraftPostingsHandler]);


    const jumpToFormHandler = () =>{
        if(!isNull(selectedDraft.text) && !isNull(isEditing))setDispatch({ TYPE: 'CREATE_FORM' });
        else return;
    }

    const closeHandler = () =>{
        setOpenPostJob(false);
        setShowDialog(false);
        ref.current.close();
    }


    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: 'CREATE_DRAFT' })} />
        </section>
        <section className={classes.contentSection} style={{ height: '400px'}}>
            <h1 className={classes.draftTxt}>Edit Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            <p className={classes.jobPostingTxt}>Select Draft Job Posting To Edit*</p>
            <div className={classes.inputContainer}>
                <input 
                    type='' 
                    placeholder='Title :: status :: address ::' 
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
            <button className={classes.normalBtn} onClick={closeHandler}>Close</button>
            <button className={classes.linearGradBtn} onClick={jumpToFormHandler}>Edit Draft Job Posting</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default forwardRef(EditDraft);