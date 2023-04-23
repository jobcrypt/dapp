import { useCallback, useEffect, useReducer, useState } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';
import TextEditor from '../components/TextEditor';
import { isNull } from '../utils/Util';
import LocationTypeList from '../lists/LocationTypeList';
import LocationSupportList from '../lists/LocationSupportList';
import WorkTypeList from '../lists/WorkTypeList';
import PaymentTypeList from '../lists/PaymentTypeList';
import { createEmployerDashboard } from '../contracts/ContractManager';

const CREATE_DRAFT = 'CREATE_DRAFT';
const EDIT_DRAFT = 'EDIT_DRAFT';
const CREATE_FORM = 'CREATE_FORM';
const MAKE_PAYMENT = 'MAKE_PAYMENT';


const initialState = {
    create_draft: true,
    edit_draft: false,
    create_form: false,
    make_payment: false
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case CREATE_DRAFT:
            return{
                create_draft: true,
                edit_draft: false,
                create_form: false,
                make_payment: false
            }
        case EDIT_DRAFT:
            return{
                create_draft: false,
                edit_draft: true,
                create_form: false,
                make_payment: false
            }
        case CREATE_FORM:
            return{
                create_draft: false,
                edit_draft: false,
                create_form: true,
                make_payment: false
            }
        case MAKE_PAYMENT:
            return{
                create_draft: false,
                edit_draft: false,
                create_form: false,
                make_payment: true
            }
        default:
            return state;
    }
}

const PostJobPopup = (props) =>{
    const { setOpenPostJob, formToOpen } = props;
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const [ txnValidated, setTxnValidated ] = useState(false);
    const [ paymentStatus, setPaymentStatus ] = useState({status: 'none', text: '', color: 'transparent', show: false});
    const [ jobTitle, setJobTitle ] = useState({ isValid: false, text: '' });
    const [ locationType, setLocationType ] = useState({ isValid: false, text: '', isVisible: false });
    const [ locationSupport, setLocationSupport ] = useState({ isValid: false, text: '', isVisible: false });
    const [ workLocation, setWorkLocation ] = useState({ isValid: false, text: '' });
    const [ companyName, setCompanyName ] = useState({ isValid: false, text: '' });
    const [ companyLink, setCompanyLink ] = useState({ isValid: false, text: '' });
    const [ companyLogo, setCompanyLogo ] = useState({ isValid: false, text: '' });
    const [ companySummary, setCompanySummary ] = useState({ isValid: false, text: '' });
    const [ skills, setSkills ] = useState({ isValid: false, text: '' });
    const [ searchCategories, setSearchCategories ] = useState({ isValid: false, text: '' });
    const [ searchTerms, setSearchTerms ] = useState({ isValid: false, text: '' });
    const [ workType, setWorkType ] = useState({ isValid: false, text: '', isVisible: false });
    const [ paymentType, setPaymentType ] = useState({ isValid: false, text: '', isVisible: false });
    const [ jobDesc, setJobDesc ] = useState({ isValid: false, text: '' });
    const [ jobApplyLink, setJobApplyLink ] = useState({ isValid: false, text: '' });



    useEffect(()=>{
        if(formToOpen === CREATE_DRAFT)setDispatch({ TYPE: CREATE_DRAFT });
        if(formToOpen === EDIT_DRAFT)setDispatch({ TYPE: EDIT_DRAFT });
        if(formToOpen === CREATE_FORM)setDispatch({ TYPE: CREATE_FORM });
        if(formToOpen === MAKE_PAYMENT)setDispatch({ TYPE: MAKE_PAYMENT });
        
    },[]);


    const goToEditDraft = () =>{
        if(txnValidated)setDispatch({ TYPE: EDIT_DRAFT });
        else setTxnValidated(true);
    }

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
   
    const getEmployerDashboard = useCallback(async() =>{
      const res = await createEmployerDashboard();
      console.log(res); 
    },[]);


    useEffect(()=>{
        getEmployerDashboard();
        
    },[getEmployerDashboard]);
 

    const goToMakePaymentSection = () =>{
        setPaymentStatus({ status: 'none', text: '', color: '', show: false});
        setDispatch({ TYPE: MAKE_PAYMENT });
    }

    const updateJobTitleHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobTitle({ isValid: false, text: value });
        else setJobTitle({ isValid: true, text: value });
    }

    const updateWorkLocationHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setWorkLocation({ isValid: false, text: value });
        else setWorkLocation({ isValid: true, text: value });
    }

    const updateCompanyNameHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanyName({ isValid: false, text: value });
        else setCompanyName({ isValid: true, text: value });
    }

    const updateCompanyLinkHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanyLink({ isValid: false, text: value });
        else setCompanyLink({ isValid: true, text: value });
    }

    const updateCompanyLogoHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanyLogo({ isValid: false, text: value });
        else setCompanyLogo({ isValid: true, text: value });
    }

    const updateCompanySummaryHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setCompanySummary({ isValid: false, text: value });
        else setCompanySummary({ isValid: true, text: value });
    }

    const updateSkillsHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSkills({ isValid: false, text: value });
        else setSkills({ isValid: true, text: value });
    }

    const updateSearchCategoriesHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSearchCategories({ isValid: false, text: value });
        else setSearchCategories({ isValid: true, text: value });
    }

    const updateSearchTermsHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setSearchTerms({ isValid: false, text: value });
        else setSearchTerms({ isValid: true, text: value });
    }

    const updateJobDescHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobDesc({ isValid: false, text: value });
        else setJobDesc({ isValid: true, text: value });
    }

    const updateApplyLinkHandler = (e) =>{
        const value = e.target.value;
        if(isNull(value))setJobApplyLink({ isValid: false, text: value });
        else setJobApplyLink({ isValid: true, text: value });
    }


    const CreateDraftPosting = (
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setOpenPostJob(false)} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Create Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            {txnValidated && <p className={classes.txnText}>Draft Posting Created Txn: 0xca6t3g99753f26G6TTe78hBkbVV09bdgGJU789BBmfd</p>}
            <p className={classes.jobPostingTxt}>Job Postings</p>
            <section className={classes.radioSection}>
                <div className={classes.radioParent}>
                    <input type='radio' id='first' name='good' />
                    <label htmlFor='first'>Standard 1 Week Job Posting - 2,325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' id='second' name='good' />
                    <label htmlFor='second'>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' id='three' name='good' />
                    <label htmlFor='three'>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' id='four' name='good' />
                    <label htmlFor='four'>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' id='five' name='good' />
                    <label htmlFor='five'>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
            </section>
            <div className={classes.btnContainer}>
            <button className={classes.linearGradBtn} onClick={goToEditDraft}>Create Draft Job Posting</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )

    const EditDraftPosting = (
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: CREATE_DRAFT })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Edit Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            <p className={classes.jobPostingTxt}>Select Draft Job Posting To Edit*</p>
            <span className={classes.dropDownView}>
                {/* <p>Title :: Status :: Draft :: Txn :: 0xgY78GFb8Fjm...6JkujbTTWHIFE563fT</p> */}
                <p>Title :: Status :: Draft :: Txn</p>
                <img src={dropdownIcon} alt='' />
            </span>
            <div className={classes.btnContainer}>
            <button className={classes.linearGradBtn} onClick={()=>setDispatch({ TYPE: CREATE_FORM })}>Continue Posting</button>
            <button className={classes.normalBtn} onClick={()=>setDispatch({ TYPE: CREATE_FORM })}>Edit Draft Job Posting</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )

    const CreateForm = (
        <main className={classes.box2} onClick={(e)=>e.stopPropagation()}>
           <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: EDIT_DRAFT })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.fillFormTxt}>Edit Job Posting Details</h1>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Job Title*</p>
                <input type='' placeholder='Enter Job Title' className={classes.input1} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Location Type*</p>
                <input 
                    type='' 
                    placeholder='Geo Remote' 
                    readOnly 
                    value={locationType.text} 
                    onFocus={()=>setLocationType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setLocationType(prev=>({...prev, isVisible: false})), 100)}
                    className={classes.input2}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {locationType.isVisible && <LocationTypeList setLocationType={setLocationType} />}
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Location Support*</p>
                <input 
                   type='' 
                   placeholder='Supported Location' 
                   readOnly 
                   className={classes.input2} 
                   value={locationSupport.text} 
                   onFocus={()=>setLocationSupport(prev=>({...prev, isVisible: true}))} 
                   onBlur={()=>setTimeout(()=> setLocationSupport(prev=>({...prev, isVisible: false})), 100)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {locationSupport.isVisible && <LocationSupportList setLocationSupport={setLocationSupport} />}
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Work Location</p>
                <input type='' placeholder='Enter Work Location (Optional)' className={classes.input1} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Company Name*</p>
                <input type='' placeholder='Enter Company Name' className={classes.input1} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Company Link*</p>
                <input type='' placeholder='Enter Company Link' className={classes.input1} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Company Logo*</p>
                <span className={classes.logoContainer}>
                    <button className={classes.logoBtn}>Upload Logo</button>
                </span>
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Summary about your company*</p>
                <textarea placeholder='Enter Summary' className={classes.textarea} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Skills Required*</p>
                <textarea placeholder='Enter skills required' className={classes.textarea} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Search categories*</p>
                <textarea placeholder='Enter search categories' className={classes.textarea} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Search terms*</p>
                <textarea placeholder='Enter search terms' className={classes.textarea} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Work Type*</p>
                <input 
                    type='' 
                    placeholder='Full-Time' 
                    readOnly 
                    className={classes.input2} 
                    value={workType.text} 
                    onFocus={()=>setWorkType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setWorkType(prev=>({...prev, isVisible: false})), 100)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {workType.isVisible && <WorkTypeList setWorkType={setWorkType} />}
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Payment Type*</p>
                <input 
                    type='' 
                    placeholder='Fiat' 
                    readOnly 
                    className={classes.input2} 
                    value={paymentType.text} 
                    onFocus={()=>setPaymentType(prev=>({...prev, isVisible: true}))} 
                    onBlur={()=>setTimeout(()=> setPaymentType(prev=>({...prev, isVisible: false})), 100)}
                />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
                {paymentType.isVisible && <PaymentTypeList setPaymentType={setPaymentType} />}
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Job Description*</p>
                {/* <TextEditor /> */}
                <textarea placeholder='Enter job description' className={classes.textarea} />
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Job Application Link*</p>
                <input type='' placeholder='Link or email' className={classes.input1} />
            </div>
            <div className={classes.btnContainer}>
            <button className={classes.linearGradBtn} onClick={goToMakePaymentSection}>Make Payment</button>
            <button className={classes.normalBtn}>Save As Draft</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )

    const paymentDraftPosting = (
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setDispatch({ TYPE: CREATE_FORM })} />
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
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )

    return(
        <section className={classes.parent}>
                {dispatch.create_draft && CreateDraftPosting}
                {dispatch.edit_draft && EditDraftPosting}
                {dispatch.create_form && CreateForm}
                {dispatch.make_payment && paymentDraftPosting}
        </section>
    )
}

export default PostJobPopup;