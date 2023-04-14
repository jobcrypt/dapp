import { useReducer, useState } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';
import TextEditor from '../components/TextEditor';

const CREATE_DRAFT = 'CREATE_DRAFT';
const EDIT_DRAFT = 'EDIT_DRAFT';
const CREATE_FORM = 'CREATE_FORM';

const initialState = {
    create_draft: true,
    edit_draft: false,
    create_form: false,
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case CREATE_DRAFT:
            return{
                create_draft: true,
                edit_draft: false,
                create_form: false
            }
        case EDIT_DRAFT:
            return{
                create_draft: false,
                edit_draft: true,
                create_form: false
            }
        case CREATE_FORM:
            return{
                create_draft: false,
                edit_draft: false,
                create_form: true
            }
        default:
            return state;
    }
}

const PostJobPopup = (props) =>{
    const { setOpenPostJob } = props;
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const [ txnValidated, setTxnValidated ] = useState(false);



    const goToEditDraft = () =>{
        if(txnValidated)setDispatch({ TYPE: EDIT_DRAFT });
        else setTxnValidated(true);
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
                    <input type='radio' name='first' />
                    <label htmlFor='first'>Standard 1 Week Job Posting - 2,325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' name='second' />
                    <label htmlFor='second'>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' />
                    <label>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' />
                    <label>Standard 1 Week Job Posting - 2325 CMP</label>
                </div>
                <div className={classes.radioParent}>
                    <input type='radio' />
                    <label>Standard 1 Week Job Posting - 2325 CMP</label>
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
                Title :: Status :: Draft :: Txn :: 0xgY78GFb8Fjmkhh78HHGEl98Gy6JkujbTTWHIFE563fT
            </span>
            <div className={classes.btnContainer}>
            <button className={classes.normalBtn} onClick={()=>setDispatch({ TYPE: CREATE_FORM })}>Edit Draft Job Posting</button>
            <button className={classes.linearGradBtn} onClick={()=>setDispatch({ TYPE: CREATE_FORM })}>Continue Posting</button>
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
                <p className={classes.label}>Job Location Type*</p>
                <input type='' placeholder='Geo Remote' className={classes.input2} />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Location Support*</p>
                <input type='' placeholder='Supported Location' className={classes.input2} />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
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
                <input type='' placeholder='Full-Time' className={classes.input2} />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
            </div>
            <div className={classes.inputContainer}>
                <p className={classes.label}>Payment Type*</p>
                <input type='' placeholder='Fiat' className={classes.input2} />
                <span className={classes.dropDownContainer}>
                    <img src={dropdownIcon} alt='' />
                </span>
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
            <button className={classes.normalBtn}>Reset</button>
            <button className={classes.linearGradBtn}>Save Your Listing</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )

    return(
        <section className={classes.parent} onClick={()=>setOpenPostJob(false)}>
                {dispatch.create_draft && CreateDraftPosting}
                {dispatch.edit_draft && EditDraftPosting}
                {dispatch.create_form && CreateForm}
        </section>
    )
}

export default PostJobPopup;