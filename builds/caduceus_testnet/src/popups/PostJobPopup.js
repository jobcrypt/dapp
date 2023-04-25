import { useCallback, useContext, useEffect, useReducer, useState } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import { isNull } from '../utils/Util';
import { createEmployerDashboard, findEmployerDashboard } from '../contracts/ContractManager';
import CreateDraft from '../drafts/CreateDraft';
import EditDraft from '../drafts/EditDraft';
import CreateJobForm from '../drafts/CreateJobForm';
import MakePayment from '../drafts/MakePayment';
import { AccountContext } from '../App';

const EMPLOYER_DASHBOARD = 'EMPLOYER_DASHBOARD';
const CREATE_DRAFT = 'CREATE_DRAFT';
const EDIT_DRAFT = 'EDIT_DRAFT';
const CREATE_FORM = 'CREATE_FORM';
const MAKE_PAYMENT = 'MAKE_PAYMENT';


const initialState = {
    employer_dashboard: true,
    create_draft: false,
    edit_draft: false,
    create_form: false,
    make_payment: false
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case EMPLOYER_DASHBOARD:
            return{
                employer_dashboard: true,
                create_draft: false,
                edit_draft: false,
                create_form: false,
                make_payment: false
            }
        case CREATE_DRAFT:
            return{
                employer_dashboard: false,
                create_draft: true,
                edit_draft: false,
                create_form: false,
                make_payment: false
            }
        case EDIT_DRAFT:
            return{
                employer_dashboard: false,
                create_draft: false,
                edit_draft: true,
                create_form: false,
                make_payment: false
            }
        case CREATE_FORM:
            return{
                employer_dashboard: false,
                create_draft: false,
                edit_draft: false,
                create_form: true,
                make_payment: false
            }
        case MAKE_PAYMENT:
            return{
                employer_dashboard: false,
                create_draft: false,
                edit_draft: false,
                create_form: false,
                make_payment: true
            }
        default:
            return state;
    }
}

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

const PostJobPopup = (props) =>{
    const { setOpenPostJob, formToOpen } = props;
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState); 
    const [ hasDashBoard, setHasDashboard ] = useState(false);
    const { setEmployerDashAddress } = useContext(AccountContext);


    useEffect(()=>{
        if(formToOpen === CREATE_DRAFT)setDispatch({ TYPE: CREATE_DRAFT });
        if(formToOpen === EDIT_DRAFT)setDispatch({ TYPE: EDIT_DRAFT });
        if(formToOpen === CREATE_FORM)setDispatch({ TYPE: CREATE_FORM });
        if(formToOpen === MAKE_PAYMENT)setDispatch({ TYPE: MAKE_PAYMENT });
        
    },[formToOpen]);
   
    const getEmployerDashboard = useCallback(async() =>{
        const dashAddress = await findEmployerDashboard();
        console.log(dashAddress)
        if(dashAddress === ZERO_ADDRESS){
            const res = await createEmployerDashboard();
            console.log(res)
        if(res !== ZERO_ADDRESS){
            setHasDashboard(true);
            setEmployerDashAddress(res)
        }
      }else{
        setHasDashboard(true);
        setEmployerDashAddress(dashAddress)
      }
    
    },[]);

    const continueToCreateDraft = () =>{
        setDispatch({ TYPE: 'CREATE_DRAFT' });
    }


    const employerDashboard = (
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt='' onClick={()=>setOpenPostJob(false)} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Employer Dashboard</h1>
            {hasDashBoard &&<p className={classes.txnText}>You have an existing dashboard already.</p>}
            <div className={classes.btnContainer}>
            {!hasDashBoard &&<button className={classes.linearGradBtn} onClick={getEmployerDashboard}>Create Employer Dashboard</button>}
            {hasDashBoard &&<button className={classes.linearGradBtn} onClick={continueToCreateDraft}>Continue</button>}
            {!hasDashBoard &&<p>Warning: This action incurs gas fee</p>}
        </div>
        </section>
        </main>
    )



    return(
        <section className={classes.parent}>
                {dispatch.employer_dashboard && employerDashboard}
                {dispatch.create_draft && <CreateDraft setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
                {dispatch.edit_draft && <EditDraft setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
                {dispatch.create_form && <CreateJobForm setDispatch={setDispatch} />}
                {dispatch.make_payment && <MakePayment setDispatch={setDispatch} />}
        </section>
    )
}

export default PostJobPopup;