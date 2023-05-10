

import classes from '../styles/components/PreviousJobApplications.module.css';
import useWindowSize from '../hooks/useWindowSize';
import { useCallback, useContext, useEffect, useState } from 'react';
import ActionPopup from '../popups/ActionPopup';
import JobListingDetailPopup from '../popups/JobListingDetailPopup';
import { getAppliedJobsForUser } from '../contracts/ContractManager';
import { AccountContext } from '../App';
import { isNull } from '../utils/Util';
import Wrapper from './Wrapper';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';


const PreviousJobApplications = () =>{
    const width = useWindowSize();
    const [ clientXY, setClientXY ] = useState([0, 0]);
    const [ showAction, setShowAction ] = useState(false);
    const [ showJobDetail, setShowJobDetail ] = useState(false);
    const { account, jobSeekerDashAddress } = useContext(AccountContext);
    const [ appliedJobsArray, setAppliedJobsArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('No previous job application.');
    const navigate = useNavigate();
    const [ selectedPostingAddress, setSelectedPostingAddress ] = useState('');


    const getAppliedJobsHandler = useCallback(async()=>{
        console.log('----------', jobSeekerDashAddress)
        if(isNull(account.address) || isNull(jobSeekerDashAddress))return;
        setIsLoading(true);
        setMessage('Checking for existing job application...');
        const appliedJobs = await getAppliedJobsForUser(account.address, jobSeekerDashAddress);
        setIsLoading(false);
        setAppliedJobsArray(appliedJobs);
        if(isNull(appliedJobs))setMessage('No previous application.');

    },[account.isConnected, jobSeekerDashAddress]);


    useEffect(()=>{
        getAppliedJobsHandler();
    },[getAppliedJobsHandler]);


    const navigateToJobDetailPage = (postingAddress) =>{
        navigate('/job_application_detail', { state: { selectedPostingAddress: postingAddress }});
    }

    const getStyle = (status) =>{
         const style ={};
         if(status >=3 || status <=8)style.color='#E17726';
         else style.color = '#159500';

         return style;
    }

    const trim = (value, length) =>{
        if(!isNull(value)){
            return (value.length > length)? value.slice(0, length)+'...' : value;
        }

        return '';
    }
 
 
     return(
         <section className={classes.tableParent}>
        {width > 770 && <>
         <div className={classes.tableHeader}>
             <span className={classes.postedHeader}>Application Date</span>
             <span className={classes.jobDescHeader}>Job Description</span>
             <span className={classes.linkHeader}>Link</span>
             <span className={classes.applicantHeader}>Applicants</span>
             <span className={classes.actionHeader}>Status</span>
         </div>
         <ul className={classes.unorderedList}>
            {isNull(appliedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(appliedJobsArray) && !isLoading) &&<button onClick={getAppliedJobsHandler} disabled={isLoading} className={classes.refreshBtn}>Reload</button>}
                </Wrapper>}
            {!isNull(appliedJobsArray) && appliedJobsArray.map(item=>(
                <li key={item.postingAddress} className={classes.list} onClick={()=>navigateToJobDetailPage(item.postingAddress)}>
                     <span className={classes.postedSpan}>{item.apply_date === 0? '--' : <Moment format="MMM Do YYYY, h:mm:ss a">{new Date(item.apply_date * 1000)}</Moment>}</span>
                     <span className={classes.jobTitleSpan}>{trim(item.jobTitle, 20)}</span>
                     <span className={classes.Span}>{trim(item.link, 20)}</span>
                     <span>{item.noOfApplicant}</span>
                     <div className={classes.statusContainer} style={getStyle(item.statusCode)}>{item.status}</div>
                 </li>
            ))}   
         </ul>
         </>}
         {width <= 770 &&<ul className={classes.unorderedListMobile}>
            {isNull(appliedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(appliedJobsArray) && !isLoading) &&<button onClick={getAppliedJobsHandler} disabled={isLoading} className={classes.refreshBtn}>Reload</button>}
                </Wrapper>}
                 {!isNull(appliedJobsArray) && appliedJobsArray.map((item, idx)=>(
                 <li key={item.postingAddress} onClick={()=>navigateToJobDetailPage(item.postingAddress)}>
                     <div className={classes.leftBox}>
                         <h2>{trim(item.jobTitle, 20)}</h2>
                         <p>{item.apply_date === 0? '--' : <Moment format="MMM Do YYYY, h:mm:ss a">{new Date(item.apply_date * 1000)}</Moment>}</p>
                     </div>
                     <div className={classes.rightBox}>
                         <h2 style={getStyle(item.statusCode)}>{item.status}</h2>
                         <p>{item.noOfApplicant}</p>
                     </div>
                 </li>
                 ))}
                 {/* {new Array(20).fill().map((item, idx)=>(
                 <li key={idx}>
                     <div className={classes.leftBox}>
                         <h2>Job Title</h2>
                         <p>2nd May 2023</p>
                     </div>
                     <div className={classes.rightBox}>
                         <h2 style={getStyle(1)}>DRAFT</h2>
                         <p>5</p>
                     </div>
                 </li>
                 ))} */}
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