import {flushSync} from 'react-dom';

import classes from '../styles/popups/ArchivePostingPopup.module.css';
import { useReducer, useRef, useState } from 'react';
import PostJobPopup from './PostJobPopup';

const YES = 'YES';
const NO = 'NO';

const initialState = {
    yes: false,
    no: true
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case YES:
            return{
                yes: true,
                no: false
            }
        case NO:
            return{
                yes: false,
                no: true
            }
        default:
            return state
    }
}

const ArchivePostingPopup = (props) =>{
     const { setOpenArchive, setShowJobDetail } = props;
     const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
     const [ openPostJob, setOpenPostJob ] = useState(false);
    //  const elementRef = useRef();

    const returnToJobBoard = () =>{
        setOpenArchive(false);
        setShowJobDetail(false);
    }


     const postJobHandler = () =>{
        flushSync(()=>{
            setOpenPostJob(true);
            // setOpenArchive(false);
        });
        // elementRef.current.display = 'none';
        // elementRef.current.visibility = 'hidden'
     }


     const doYoWantToArchive = (
        <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
           <span className={classes.title}>Are you sure you want to archive this job?</span>
           <div className={classes.btnContainer}>
              <button className={classes.yesBtn} onClick={()=>setDispatch({TYPE: YES})}>Yes</button>
              <button className={classes.noBtn} onClick={()=>setOpenArchive(false)}>No</button>
           </div>
        </div>
     )

     const yesArchive = (
        <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
           <span className={classes.title}>Your job has been successfully archived</span>
           <div className={classes.btnContainer2}>
              <button className={classes.returnBtn} onClick={returnToJobBoard}>Return To Job Board</button>
              <button className={classes.postBtn} onClick={postJobHandler}>Post Another Job</button>
           </div>
        </div>
     )

     
   const element = (
    <>
    {openPostJob && <PostJobPopup setOpenPostJob={setOpenPostJob} formToOpen='CREATE_DRAFT' />}
    {/* <section className={classes.parent} onClick={(e)=>e.stopPropagation()} ref={elementRef}> */}
        {dispatch.no && doYoWantToArchive}
        {dispatch.yes && yesArchive}
    {/* </section> */}
    </>
   );


    return element
}

export default ArchivePostingPopup