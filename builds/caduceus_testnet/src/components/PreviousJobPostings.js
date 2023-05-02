import { useCallback, useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';


import classes from '../styles/components/PreviousJobPostings.module.css';
import moreIcon from '../assets/more.png';
import useWindowSize from '../hooks/useWindowSize';
import ActionPopup from '../popups/ActionPopup';
import JobListingDetailPopup from '../popups/JobListingDetailPopup';
import { isNull } from '../utils/Util';
import Wrapper from './Wrapper';
import Spinner from './Spinner';
import { getJobPosting } from '../contracts/ContractManager';
import { AccountContext } from '../App';


const PreviousJobPostings = () =>{
   const width = useWindowSize();
   const [ clientXY, setClientXY ] = useState([0, 0]);
   const [ showAction, setShowAction ] = useState({ isVisible: false, item: null });
   const [ showJobDetail, setShowJobDetail ] = useState({ isVisible: false, item: null });
   const [ postedJobsArray, setPostedJobsArray ] = useState([]);
   const [ isLoading, setIsLoading ] = useState(false);
   const [ message, setMessage ] = useState('You don\'t have any job posted yet.');
   const { employerDashAddress, account } = useContext(AccountContext);


   const getClientXY = (e, item) =>{
      setClientXY([e.clientX, e.clientY]);
      if(item.status === 'ARCHIVED')return;
      setShowAction({ isVisible: true, item: item })
   }

   const getJobPostingHandler = useCallback(async() =>{
    console.log('clicked and dash address for account is : ', employerDashAddress);
    if(isNull(employerDashAddress))return;

    setIsLoading(true);
    setMessage('Loading...')
    setPostedJobsArray([]);
    const result = await getJobPosting(employerDashAddress);
    if(!isNull(result)){
        setIsLoading(false);
        setPostedJobsArray(result);
    }else{
        setIsLoading(false);
        setMessage('You don\t have any job posted yet.');
    }
   

   },[employerDashAddress, account.address]);


    useEffect(()=>{        
        getJobPostingHandler();
    },[getJobPostingHandler]);


    const getStyle = (status) =>{
       const style = {};
       if (status === "DRAFT" || status === 'POSTED' || status === 'FILLED') {
           style.color = "#159500";
    }

    if (status === "CANCELLED" || status === "EXPIRED" || status === "ARCHIVED") {
         style.color ='#E17726';
    }
    return style;
    }


    const showPostedJobDetail = (item) =>{
        setShowJobDetail({ isVisible: true, item: item }); 
    }



    return(
        <section className={classes.tableParent}>
            {showAction.isVisible && <ActionPopup clientX={clientXY[0]} clientY={clientXY[1]} setShowAction={setShowAction} item ={showAction.item} />}
            {showJobDetail.isVisible && <JobListingDetailPopup setShowJobDetail={setShowJobDetail} item ={showJobDetail.item} />}
       {width > 770 && <>
        <div className={classes.tableHeader}>
            <span className={classes.postedHeader}>Posted Date</span>
            <span className={classes.expiryHeader}>Expiry Date</span>
            <span className={classes.jobDescHeader}>Job Title</span>
            <span className={classes.applicantHeader}>Applicants</span>
            <span className={classes.statusHeader}>Status</span>
            <span className={classes.actionHeader}>Action</span>
        </div>
        <ul className={classes.unorderedList}>
        {isNull(postedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(postedJobsArray) && !isLoading) &&<button disabled={isLoading} className={classes.refreshBtn} onClick={getJobPostingHandler}>Reload</button>}
                </Wrapper>}
                {!isNull(postedJobsArray) && postedJobsArray.map(item=>(
                    <li key={item.postingAddress} className={classes.list}>
                    <span><Moment local>{new Date(item.postedDate)}</Moment></span>
                    <span><Moment local>{new Date(item.expiryDate)}</Moment></span>
                    <span>{item.jobTitle}</span>
                    <span>{item.applicantCount}</span>
                    <div className={classes.statusContainer} style={getStyle(item.status)}>{item.status}</div>
                    <span>
                        <div className={classes.blackCircle} onClick={(event)=>getClientXY(event, item)}>
                            <img src={moreIcon} alt='' />
                        </div>
                    </span>
                </li>
                ))}
            {/* {new Array(15).fill().map((item, idx)=>(
                <li key={idx} className={classes.list}>
                    <span>01 April, 2023 07:22:13</span>
                    <span>01 April, 2023 07:22:13</span>
                    <span>UI/UX Designer</span>
                    <span>50</span>
                    <div className={classes.statusContainer} style={idx%2===0? { color: '#E17726'} : { color: '#159500'}}>{`${idx%2===0? 'Draft' : 'Posted'}`}</div>
                    <span>
                        <div className={classes.blackCircle} onClick={getClientXY}>
                            <img src={moreIcon} alt='' />
                        </div>
                    </span>
                </li>
            ))} */}
        </ul>
        </>}
        {width <= 770 &&<ul className={classes.unorderedListMobile}>
        {isNull(postedJobsArray)&&<Wrapper height='fit-content'>
                 {!isNull(message) &&<p className={classes.statusTxt}>{message}</p>}
                 {isLoading &&<Spinner size={40} color1={'#171d32'} />}
                 {(isNull(postedJobsArray) && !isLoading) &&<button disabled={isLoading} className={classes.refreshBtn} onClick={getJobPostingHandler}>Reload</button>}
                </Wrapper>}
                {!isNull(postedJobsArray) && postedJobsArray.map(item=>(
                    <li key={item.postingAddress} onClick={()=>showPostedJobDetail(item)}>
                    <div className={classes.leftBox}>
                        <h2>{item.jobTitle}</h2>
                        <p><Moment local>{new Date(item.postedDate)}</Moment></p>
                    </div>
                    <div className={classes.rightBox}>
                        <h2 style={getStyle(item.status)}>{item.status}</h2>
                        <p>{item.applicantCount}</p>
                    </div>
                </li>
                ))}
                {/* {new Array(15).fill().map((item, idx)=>(
                <li key={idx} onClick={()=>setShowJobDetail(true)}>
                    <div className={classes.leftBox}>
                        <h2>UI/UX Designer</h2>
                        <p>01 April, 2023 07:13:48</p>
                    </div>
                    <div className={classes.rightBox}>
                        <h2 style={idx%2===0? { color: '#E17726'} : { color: '#159500'}}>Listed</h2>
                        <p>50</p>
                    </div>
                </li>
                ))} */}
        </ul>}
    </section>
    )
}

export default PreviousJobPostings;