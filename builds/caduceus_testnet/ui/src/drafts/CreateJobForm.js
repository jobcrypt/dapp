import { forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SHA256 } from 'crypto-js';


import classes from '../styles/popups/PostJobPopup.module.css';
import LocationTypeList from '../lists/LocationTypeList';
import LocationSupportList from '../lists/LocationSupportList';
import WorkTypeList from '../lists/WorkTypeList';
import PaymentTypeList from '../lists/PaymentTypeList';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';
import cancelIcon from '../assets/x.png';
import { isNull } from '../utils/Util';
import { getHashFromIpfs } from '../contracts/IPFS';
import { getJobDetailUsingPostingddress, getPostJobStatus, getProductAddressInfo, isPostingPaid, postAJob, saveToEVM } from '../contracts/ContractManager';
import { FormContext } from '../App';
import { getProvider } from '../contracts/init';
import TextEditor from '../components/TextEditor';
import ReceiptPopup from '../popups/ReceiptPopup';


let isRunning = false;
const CreateJobForm = (props, ref) =>{
    const { setDispatch, setOpenPostJob, setShowDialog } = props;
    const [ hasPaid, setHasPaid ] = useState(false);
    const [ paymentStatus, setPaymentStatus ] = useState({ text: '', color: 'transparent', isSaved: false});
    const { jobTitle, setJobTitle, locationType, setLocationType,locationSupport, setLocationSupport, workLocation, setWorkLocation, companyName, setCompanyName, companyLink, setCompanyLink, companySummary, setCompanySummary, skills, setSkills, searchCategories, setSearchCategories, searchTerms, setSearchTerms, workType, setWorkType, paymentType, setPaymentType, jobDesc, setJobDesc, jobApplyLink, setJobApplyLink, employerPostingAddress, editingJobPosting, setEditingJobPosting, companyLogo, setCompanyLogo  } = useContext(FormContext);
    const inputRef = useRef();
    const [ postStatus, setPostStatus ] = useState('');
    const [ isPosted, setIsPosted ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showReceipt, setShowReceipt ] = useState({ hash: '', type: '', isVisible: false });
    const dialogRef = useRef();
    const existingValues = useRef('');
    const [ isSaved, setIsSaved ] = useState(true);
    

    useEffect(()=>{
        let newValues=jobTitle.text+''+locationType.text+''+locationSupport.text+''+workLocation.text+''+companyName.text+''+companyLink.text+''+companySummary.text+''+skills.text+''+searchCategories.text+''+searchTerms.text+''+workType.text+''+paymentType.text+''+jobDesc.text+''+jobApplyLink.text;
        console.log('----------')
        if(isNull(newValues) && isNull(existingValues.current))return;
        console.log('not null')
        newValues = getHash(newValues);
        existingValues.current = getHash(existingValues.current);
        console.log('new values',newValues);
        console.log('existing: ',existingValues.current);
        if(newValues === existingValues.current){
            console.log(true)
            setIsSaved(true)
        }else{
            console.log(false)
            setIsSaved(false);
        }


    },[jobTitle,locationType,locationSupport,workLocation,companyName,companyLink,companySummary,skills,searchCategories,searchTerms,workType,paymentType,jobDesc,jobApplyLink])
    
    const getHash = (value) =>{
        return SHA256(value).toString();
    }

    const reset = useCallback(()=>{
        setJobTitle({ isValid: false, text: '' });
        setLocationType({ isValid: false, text: '' });
        setLocationSupport({ isValid: false, text: '' });
        setWorkLocation({ isValid: false, text: '' });
        setCompanyName({ isValid: false, text: '' });
        setCompanyLink({ isValid: false, text: '' });
        // setCompanyLogo({ isValid: false, text: '' });
        setCompanySummary({ isValid: false, text: '' });
        setSkills({ isValid: false, text: '' });
        setSearchCategories({ isValid: false, text: '' });
        setSearchTerms({ isValid: false, text: '' });
        setWorkType({ isValid: false, text: '' });
        setPaymentType({ isValid: false, text: '' });
        setJobDesc({ isValid: false, text: '' });
        setJobApplyLink({ isValid: false, text: '' });
    },[]);


    const hasUserPaidForPosting = useCallback(async() =>{
        const isPaid = await isPostingPaid(employerPostingAddress);
        console.log('Is paid: ', isPaid);
        setHasPaid(isPaid);
    },[]);

    const getProductAddressInfoHandler = useCallback(async()=>{
        // console.log('POSTING ADDRSES>>>>>>>>>>>>>', employerPostingAddress)
        const result = await getProductAddressInfo(employerPostingAddress);
        // console.log(result)
        if(!isNull(result)){
            setEditingJobPosting(`Note: You are editing ${result.name} - ${result.price} - ${result.currency} (${result.productAddress })`);
        }
    },[]);

    const getPostStatus = async() =>{
        const status = await getPostJobStatus(employerPostingAddress);
        // console.log('has user posted: ', status);//draft, posted statue etc
        setPostStatus(status);
    }

    const postAJobHandler = async() =>{
        setPaymentStatus(prev=>({ ...prev, text: `Wait for your posting to finish...`, color: '#956B00' }));
        const result = await postAJob(employerPostingAddress);
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
           setPaymentStatus(prev=>({ ...prev, text: `Posting spproval failed. Try again later!`, color: 'red' }));
        } 
    }

    const run = useCallback(async() =>{
            setIsLoading(true);
            // console.log(employerPostingAddress)
            let skills='',searchCategory ='' 
            const data = await getJobDetailUsingPostingddress(employerPostingAddress);
            // console.log('LOGO : ', data);

            setJobTitle({ text: data.jobTitle, isValid: isNull(data.jobTitle)? false : true });
            setLocationType({ text: data.locationType, isValid: isNull(data.locationType)? false : true });
            setLocationSupport({ text: data.locationSupport, isValid: isNull(data.locationSupport)? false : true });
            setWorkLocation({ text: data.workLocation, isValid: isNull(data.workLocation)? false : true });
            setCompanyName({ text: data.companyName, isValid: isNull(data.companyName)? false : true });
            setCompanyLink({ text: data.companyLink, isValid: isNull(data.companyLink)? false : true });
            setCompanySummary({ text: data.companySummary, isValid: isNull(data.companySummary)? false : true });
            setCompanyLogo(data.companyLogo)
            try{
                skills = data.skills.join(',');
                searchCategory = data.searchCategory.join(',');
            setSkills({ text: data.skills.join(','), isValid: isNull(data.skills)? false : true });
            setSearchCategories({ text: data.searchCategory.join(','), isValid: isNull(data.searchCategory)? false : true });
            }catch(err){}
            setSearchTerms({ text: data.searchTerms, isValid: isNull(data.searchTerms)? false : true });
            setWorkType({ text: data.workType, isValid: isNull(data.workType)? false : true });
            setPaymentType({ text: data.paymentType, isValid: isNull(data.paymentType)? false : true });
            setJobDesc({ text: data.jobDesc, isValid: isNull(data.jobDesc)? false : true });
            setJobApplyLink({ text: data.applyLink, isValid: isNull(data.applyLink)? false : true });
            // setPaymentStatus(prev=>({...prev, isSaved: true }));//assume it is saved here
            // console.log('EDIT : ', data)
            existingValues.current=data.jobTitle+''+data.locationType+''+data.locationSupport+''+data.workLocation+''+data.companyName+''+data.companyLink+''+data.companySummary+''+skills+''+searchCategory+''+data.searchTerms+''+data.workType+''+data.paymentType+''+data.jobDesc+''+data.applyLink;
            // console.log(existingValues.current);
            setIsLoading(false);
    },[]);

    useEffect(()=>{
        run();
        reset();
        hasUserPaidForPosting();
        getProductAddressInfoHandler();
        getPostStatus();
        setEditingJobPosting(`Note: You are editing(--)`);
            
    },[setJobTitle, setLocationType,setLocationSupport, setWorkLocation, setCompanyName, setCompanyLink, setCompanySummary, setSkills,setSearchCategories, setSearchTerms, setWorkType, setPaymentType, setJobDesc, setJobApplyLink, reset, hasUserPaidForPosting, getProductAddressInfoHandler, run]);


    const updateJobTitleHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobTitle({ isValid: false, text: value });
        else setJobTitle({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateWorkLocationHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setWorkLocation({ isValid: false, text: value });
        else setWorkLocation({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateCompanyNameHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanyName({ isValid: false, text: value });
        else setCompanyName({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateCompanyLinkHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanyLink({ isValid: false, text: value });
        else setCompanyLink({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const onFileChangeHandler = (e) =>{
        const file = e.target.files[0];
        // console.log(file)
        setCompanyLogo(file)
    }

    const updateCompanySummaryHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanySummary({ isValid: false, text: value });
        else setCompanySummary({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateSkillsHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSkills({ isValid: false, text: value });
        else setSkills({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateSearchCategoriesHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSearchCategories({ isValid: false, text: value });
        else setSearchCategories({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateSearchTermsHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSearchTerms({ isValid: false, text: value });
        else setSearchTerms({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
        // console.log(value)
    }

    const updateJobDescHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobDesc({ isValid: false, text: value });
        else setJobDesc({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }

    const updateJobApplyLinkHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobApplyLink({ isValid: false, text: value });
        else setJobApplyLink({ isValid: true, text: value });
        setPaymentStatus(prev=>({...prev, isSaved: false }));
    }


    const removeImage = () =>{
       setCompanyLogo(null);
    }


    const saveJobPostingHandler = async() =>{
        // setShowReceipt({ hash: 'oxhgstw6w337362626333ff3', type: 'Gas Fee', isVisible: true }); 
        // return
        if(isRunning)return;
        if(jobTitle.isValid && locationType.isValid && locationSupport.isValid && companyName.isValid && companyLink.isValid && companySummary.isValid && skills.isValid && searchCategories.isValid && searchTerms.isValid && workType.isValid && paymentType.isValid && jobDesc.isValid && jobApplyLink.isValid){
            isRunning = true;
            console.log(jobDesc.text);
            try{
            const jobDescriptionHash = await getHashFromIpfs(jobDesc.text);
            const companySummaryHash = await getHashFromIpfs(companySummary.text);
            const companyLogoHash = await getHashFromIpfs(companyLogo);
            // console.log('Job Desc hash: ', jobDescriptionHash);
            // console.log('Company logo: ', companyLogoHash);

            const JOB_JSON = JSON.stringify({
                jobTitle: jobTitle.text,
                locationType: locationType.text,
                locationSupport: locationSupport.text,
                workLocation: workLocation.text,
                companyName: companyName.text,
                companyLink: companyLink.text,
                companySummary: companySummary.text,
                workType: workType.text,
                paymentType: paymentType.text,
                description: {ops: [{ insert: jobDesc.text} ]},
                userSearchTerms: searchTerms.text,
                applicationLink: jobApplyLink.text,
                skillsRequired: skills.text.split(','),
                searchCategories: searchCategories.text.split(','),
                companyLogoHash: companyLogoHash
            });

            setPaymentStatus({  text: `Waiting for your approval...`, color: '#956B00', isSaved: false });
           const result = await saveToEVM(JOB_JSON, jobDescriptionHash, companySummaryHash, employerPostingAddress);
           if(!isNull(result.hash)){
            try{
                setPaymentStatus({  text: `Waiting for txn to be confirmed, please wait...`, color: '#956B00', isSaved: false });
                const wait = await getProvider().waitForTransaction(result.hash);
                if(!isNull(wait.transactionHash) && wait.status === 1){
                    setPaymentStatus({  text: `Saved: ${wait.transactionHash}`, color: '#159500', isSaved: true});
                }else{
                    setPaymentStatus({  text: `Transaction unsuccessful`, color: 'red', isSaved: false });
                }
        }catch(err){
            setPaymentStatus({  text: `Transaction failed`, color: 'red', isSaved: false });
        }
        // console.log('SHow receipt')
           setShowReceipt({ hash: result.hash, type: 'Gas Fee', isVisible: true }); 
        }
        }catch(err){
            // console.log('something happened', err)
        }
        isRunning = false;
        }
    }
    
    const closeHandler = () =>{
        setOpenPostJob(false);
        setShowDialog(false);
        ref.current.close();
    }


    return(
        <main className={classes.box2} onClick={(e)=>e.stopPropagation()}>
            {showReceipt.isVisible && <ReceiptPopup hash={showReceipt.hash} type={showReceipt.type} setShowReceipt={setShowReceipt} ref={dialogRef} />}
           <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: 'EDIT_DRAFT' })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.fillFormTxt}>Edit Job Posting Details</h1>
            <p className={classes.noteTxt}>{editingJobPosting}</p>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Job Title*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Enter Job Title' 
                    className={classes.input2} 
                    value={jobTitle.text}
                    onChange={updateJobTitleHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Location Type*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Geo Remote' 
                    readOnly 
                    value={locationType.text} 
                    onFocus={()=>setLocationType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setLocationType(prev=>({...prev, isVisible: false})), 300)}
                    className={classes.input2}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {locationType.isVisible && <LocationTypeList setLocationType={setLocationType} />}
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Location Support*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                   type='' 
                   placeholder='Supported Location' 
                   readOnly 
                   className={classes.input2} 
                   value={locationSupport.text} 
                   onFocus={()=>setLocationSupport(prev=>({...prev, isVisible: true}))} 
                   onBlur={()=>setTimeout(()=> setLocationSupport(prev=>({...prev, isVisible: false})), 300)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {locationSupport.isVisible && <LocationSupportList setLocationSupport={setLocationSupport} />}
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Work Location(optional)</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Enter Work Location (Optional)' 
                    className={classes.input2} 
                    value={workLocation.text}
                    onChange={updateWorkLocationHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Company Name</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Enter Company Name' 
                    className={classes.input2} 
                    value={companyName.text}
                    onChange={updateCompanyNameHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Company Link*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Enter Company Link' 
                    className={classes.input2} 
                    value={companyLink.text}
                    onChange={updateCompanyLinkHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Company Logo(optional)</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <span className={classes.logoContainer}>
                    <input 
                        type='file' 
                        accept='image/png, image/jpg, image/jpeg' 
                        ref={inputRef}  
                        readOnly
                        style={{ display: 'none'}} 
                        onChange={onFileChangeHandler}
                    />
                    <button className={classes.logoBtn} onClick={()=>inputRef.current.click()}>Upload Logo</button>
                    <div className={classes.logoList}>
                        {(!isNull(companyLogo)) && <span className={classes.file}>
                            <p>{companyLogo.name}</p>
                            <img src={cancelIcon} alt='' onClick={()=>removeImage(companyLogo.name)} />
                        </span>}
                    </div>
                </span>
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Summary about your company*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <textarea 
                    placeholder='Enter Summary' 
                    className={classes.textarea} 
                    value={companySummary.text}
                    onChange={updateCompanySummaryHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Skills Required*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <textarea 
                    placeholder='Enter skills required' 
                    className={classes.textarea} 
                    value={skills.text}
                    onChange={updateSkillsHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Search Categories*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <textarea 
                    placeholder='Enter search categories' 
                    className={classes.textarea} 
                    value={searchCategories.text}
                    onChange={updateSearchCategoriesHandler}    
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Search Terms*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <textarea 
                    placeholder='Enter search terms' 
                    className={classes.textarea} 
                    value={searchTerms.text}
                    onChange={updateSearchTermsHandler}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Work Type*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Full-Time' 
                    readOnly 
                    className={classes.input2} 
                    value={workType.text} 
                    onFocus={()=>setWorkType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setWorkType(prev=>({...prev, isVisible: false})), 300)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {workType.isVisible && <WorkTypeList setWorkType={setWorkType} />}
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Payment Type*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Fiat' 
                    readOnly 
                    className={classes.input2} 
                    value={paymentType.text} 
                    onFocus={()=>setPaymentType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setPaymentType(prev=>({...prev, isVisible: false})), 300)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {paymentType.isVisible && <PaymentTypeList setPaymentType={setPaymentType} />}
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Job Description*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                {/* <textarea 
                    placeholder='Enter job description' 
                    className={classes.textarea} 
                    value={jobDesc.text}
                    onChange={updateJobDescHandler}    
                /> */}
                <TextEditor
                    setJobDesc={setJobDesc}
                    setPaymentStatus={setPaymentStatus} 
                    editorHtmlValue={jobDesc.text}
                />
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.titleSpan}>
                    <p className={classes.label}>Job Application Link*</p>
                     {isLoading &&<p className={classes.loadingTxt}>Loading...</p>}
                </span>
                <input 
                    type='' 
                    placeholder='Link or email' 
                    className={classes.input2} 
                    value={jobApplyLink.text}
                    onChange={updateJobApplyLinkHandler}
                />
            </div>
            <p className={classes.statusTxt} style={{ fontWeight: 'bold', fontSize: '18px', color: paymentStatus.color }}>{paymentStatus.text}</p>
        <div className={classes.btnContainer}>
            <button className={classes.normalBtn} onClick={closeHandler}>Close</button>
            <button className={classes.normalBtn} onClick={reset}>Reset</button>

            {!isSaved && <button className={classes.linearGradBtn} onClick={saveJobPostingHandler}>Save your Job Posting</button>}
            {(!hasPaid) &&<button className={classes.linearGradBtn} onClick={()=>setDispatch({ TYPE: 'MAKE_PAYMENT' })}>Continue to payment</button>}
            {(hasPaid && postStatus === 'DRAFT') && <button style={isPosted? { display: 'none'} : {}} className={classes.linearGradBtn} onClick={postAJobHandler}>Post Job</button>}
            {(!paymentStatus.isSaved || !hasPaid) && <p>Warning: This action incurs gas fee</p>}
        </div>
        </section>
        </main>
    )
}

export default forwardRef(CreateJobForm);