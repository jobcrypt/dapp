import { useEffect, useReducer } from 'react';



import classes from '../styles/popups/PostJobPopup.module.css';
import CreateDraft from '../drafts/CreateDraft';
import EditDraft from '../drafts/EditDraft';
import CreateJobForm from '../drafts/CreateJobForm';
import MakePayment from '../drafts/MakePayment';


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

const PostJobPopup = (props) =>{
    const { setOpenPostJob, formToOpen } = props;
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState); 


    useEffect(()=>{
        if(formToOpen === CREATE_DRAFT)setDispatch({ TYPE: CREATE_DRAFT });
        if(formToOpen === EDIT_DRAFT)setDispatch({ TYPE: EDIT_DRAFT });
        if(formToOpen === CREATE_FORM)setDispatch({ TYPE: CREATE_FORM });
        if(formToOpen === MAKE_PAYMENT)setDispatch({ TYPE: MAKE_PAYMENT });
        
    },[formToOpen]);
 

    return(
        <section className={classes.parent}>
                {dispatch.create_draft && <CreateDraft  setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
                {dispatch.edit_draft && <EditDraft setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
                {dispatch.create_form && <CreateJobForm setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
                {dispatch.make_payment && <MakePayment setDispatch={setDispatch} setOpenPostJob={setOpenPostJob} />}
        </section>
    )
}

export default PostJobPopup;