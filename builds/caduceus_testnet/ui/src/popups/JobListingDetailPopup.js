import { useContext, useEffect, useState } from 'react';

import classes from '../styles/popups/JobListingDetailPopup.module.css';
import backIcon from '../assets/back.png';
import moreIcon from '../assets/more.png';
import dropdown from '../assets/dropdown.png';
import PostJobPopup from "./PostJobPopup";
import ArchivePostingPopup from "./ArchivePostingPopup";
import Moment from 'react-moment';
import { isNull } from '../utils/Util';
import { executeJobPostingAction } from '../contracts/ContractManager';
import { FormContext } from '../App';


const JobListingDetailPopup = (props) =>{
    const { setShowJobDetail, item } = props;
    const [ showPopup, setShowPopup ] = useState(false);
    const [ openPostJob, setOpenPostJob ] = useState(false);
    const [ openArchive, setOpenArchive ] = useState(false);
    const { setEmployerPostingAddress } = useContext(FormContext);

    useEffect(()=>{
        setEmployerPostingAddress(item.postedJobAddress);
        item.options.filter(item=> (item !== '' || item !== null || item !== undefined));
    },[]);

    const handleOption = async(option) =>{
        let code, status='';
        if(option === 'EDIT')setOpenPostJob(true);
        // if(option === 'EXTEND')
        else{
            if(option === 'FILL'){
                code = 2;
                status = 'FILLED'
            }
            if(option === 'CANCEL'){
                code = 3;
                status = 'CANCELLED';
            }
            if(option === 'ARCHIVE'){
                code = 8;
                status = 'ARCHIVED';
            }
           const result = await executeJobPostingAction(code, item.postedJobAddress);
           if(!isNull(result))item.status = status;
        }
    }


    const archiveJobHandler = () =>{
        setOpenArchive(true);
    }

    const getStyle = (status) =>{
        const style = {};
        if (status === "DRAFT" || status === 'POSTED' || status === 'FILLED') {
            style.color = "#159500";
     }
 
     if (status === "CANCELLED" || status === "EXPIRED") {
          style.color ='#E17726';
     }
     return style;
     }

    
    return(
        <section className={classes.parent}>
            {openPostJob && <PostJobPopup formToOpen='EDIT_DRAFT' setOpenPostJob={setOpenPostJob} />}
        {openArchive && <ArchivePostingPopup setOpenArchive={setOpenArchive} setShowJobDetail={setShowJobDetail} />}
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <header className={classes.header}>
                    <img src={backIcon} alt='' onClick={()=>setShowJobDetail(false)} />
                    <p>Listing Details</p>
                    <span className={classes.moreContainer} 
                         tabIndex={1}
                         onFocus={()=>setShowPopup(true)}
                         onBlur={()=>setShowPopup(false)}
                         >
                        <img src={moreIcon} alt='' />
                   {showPopup &&<div className={classes.dropdownContainer}>
                        <img src={dropdown} alt='' />
                        {!isNull(item.options) && item.options.map(option=>(
                            <p key={option} onClick={()=>handleOption(option)}>{option}</p>
                        ))}
                        {/* <p onClick={editJobHandler}>Edit Listing</p> */}
                        {/* <p>Report Listing</p> */}
                        {/* <p onClick={archiveJobHandler}>Archive Job</p> */}
                    </div>}
                    </span>
                </header>
                <div className={classes.content}>
                    <h2>Listed Date And Time</h2>
                    <p><Moment format="MMM Do YYYY, h:mm:ss a">{new Date(item.postedDate)}</Moment></p>
                </div>
                <div className={classes.content}>
                    <h2>Expiry Date And Time</h2>
                    <p><Moment format="MMM Do YYYY, h:mm:ss a">{new Date(item.expiryDate)}</Moment></p>
                </div>
                <div className={classes.content}>
                    <h2>Job Title</h2>
                    <p>{item.jobTitle}</p>
                </div>
                <div className={classes.content}>
                    <h2>Applicants</h2>
                    <p>{item.applicantCount}</p>
                </div>
                <div className={classes.content}>
                    <h2>Status</h2>
                    <p style={getStyle(item.status)}>{item.status}</p>
                </div>
            </div>
        </section>
    )
}

export default JobListingDetailPopup;