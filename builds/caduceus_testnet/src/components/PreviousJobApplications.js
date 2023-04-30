

import classes from '../styles/components/PreviousJobApplications.module.css';
import moreIcon from '../assets/more.png';
import useWindowSize from '../hooks/useWindowSize';
import { useCallback, useContext, useEffect, useState } from 'react';
import ActionPopup from '../popups/ActionPopup';
import JobListingDetailPopup from '../popups/JobListingDetailPopup';
import { getAppliedJobs } from '../contracts/ContractManager';
import { AccountContext } from '../App';
import { isNull } from '../utils/Util';
import Wrapper from './Wrapper';
import Spinner from './Spinner';


const PreviousJobApplications = () =>{
    const width = useWindowSize();
    const [ clientXY, setClientXY ] = useState([0, 0]);
    const [ showAction, setShowAction ] = useState(false);
    const [ showJobDetail, setShowJobDetail ] = useState(false);
    const { account } = useContext(AccountContext);
    const [ appliedJobsArray, setAppliedJobsArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');


    const getAppliedJobsHandler = useCallback(async()=>{
        setIsLoading(true);
        setMessage('Checking for existing job application...');
        const appliedJobs = await getAppliedJobs(account.address);
        console.log('APPLIED JOBS: ', appliedJobs);
        setIsLoading(false);
        setAppliedJobsArray(appliedJobs);
        if(isNull(appliedJobs))setMessage('No previous application.');
    },[account.isConnected]);


    useEffect(()=>{
        getAppliedJobsHandler();
    },[getAppliedJobsHandler]);
 
 
    const getClientXY = (e) =>{
       setClientXY([e.clientX, e.clientY]);
       setShowAction(true)
    }


    const getStyle = (status) =>{
         const style ={};
         if(status >=3 || status <=8)style.color='#E17726';
         else style.color = '#159500';

         return style;
    }
 
 
     return(
         <section className={classes.tableParent}>
             {showAction && <ActionPopup clientX={clientXY[0]} clientY={clientXY[1]} setShowAction={setShowAction} />}
             {showJobDetail && <JobListingDetailPopup setShowJobDetail={setShowJobDetail} />}
        {width > 770 && <>
         <div className={classes.tableHeader}>
             <span className={classes.postedHeader}>Application Date</span>
             <span className={classes.jobDescHeader}>Job Description</span>
             <span className={classes.linkHeader}>Link</span>
             <span className={classes.applicantHeader}>Applicants</span>
             <span className={classes.actionHeader}>Action</span>
         </div>
         <ul className={classes.unorderedList}>
            {isNull(appliedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(appliedJobsArray) && !isLoading) &&<button onClick={getAppliedJobsHandler} disabled={isLoading} className={classes.refreshBtn}>Refresh</button>}
                </Wrapper>}
            {!isNull(appliedJobsArray) && appliedJobsArray.map(item=>(
                <li key={item.address} className={classes.list}>
                     <span>{item.apply_date}</span>
                     <span>{item.jobTitle}</span>
                     <span>{item.link}</span>
                     <span>{item.noOfApplicant}</span>
                     <div className={classes.statusContainer} style={()=>getStyle(item.statusCode)}>{item.status}</div>
                 </li>
            ))}   
         </ul>
         </>}
         {width <= 770 &&<ul className={classes.unorderedListMobile}>
            {isNull(appliedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(appliedJobsArray) && !isLoading) &&<button onClick={getAppliedJobsHandler} disabled={isLoading} className={classes.refreshBtn}>Refresh</button>}
                </Wrapper>}
                 {!isNull(appliedJobsArray) && appliedJobsArray.map((item, idx)=>(
                 <li key={item.address}>
                     <div className={classes.leftBox}>
                         <h2>{item.jobTitle}</h2>
                         <p>{item.apply_date}</p>
                     </div>
                     <div className={classes.rightBox}>
                         <h2 style={()=>getStyle(item.statusCode)}>{item.status}</h2>
                         <p>{item.noOfApplicant}</p>
                     </div>
                 </li>
                 ))}
         </ul>}
     </section>
     )
}

export default PreviousJobApplications;

{/* <li key={idx} className={classes.list}>
    <span>01 April, 2023 07:22:13</span>
    <span>UI/UX Designer</span>
    <span>hr@lawrence.com</span>
    <span>50</span>
    <div className={classes.statusContainer} style={idx%2===0? { color: '#E17726'} : { color: '#159500'}}>{`${idx%2===0? 'Open' : 'Closed'}`}</div>
</li> */}