import { useCallback, useEffect, useState, useContext } from 'react';


import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';
import EditDraftList from '../lists/EditDraftList';
import { getDraftPosting } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import { AccountContext, FormContext } from '../App';



const EditDraft = (props) =>{
    const { setDispatch, setOpenPostJob } = props;
    const [ draftArray, setDraftArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState({ status: false, message: '' });
    const { employerDashAddress } = useContext(AccountContext);
    const [ isEditing, setIsEditing ] = useState(`EDITING DRAFT ::`);
    const [ selectedDraft, setSelectedDraft ] = useState({ text: `EDITING DRAFT ::`, isVisible: false, address: '' });


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
        getDraftPostingsHandler();
    },[getDraftPostingsHandler]);


    const jumpToFormHandler = () =>{
        if(!isNull(selectedDraft.text) && !isNull(isEditing))setDispatch({ TYPE: 'CREATE_FORM' });
        else return;
    }


    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: 'CREATE_DRAFT' })} />
        </section>
        <section className={classes.contentSection}>
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
            <button className={classes.normalBtn} onClick={()=>setOpenPostJob(false)}>Close</button>
            <button className={classes.linearGradBtn} onClick={jumpToFormHandler}>Edit Draft Job Posting</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default EditDraft;