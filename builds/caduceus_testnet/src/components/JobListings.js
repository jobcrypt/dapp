

import classes from '../styles/components/JobListings.module.css';
import moreIcon from '../assets/more.png';
import useWindowSize from '../hooks/useWindowSize';
import { useState } from 'react';
import ActionPopup from '../popups/ActionPopup';
import JobListingDetailPopup from '../popups/JobListingDetailPopup';

const JobListings = () =>{
   const width = useWindowSize();
   const [ clientXY, setClientXY ] = useState([0, 0]);
   const [ showAction, setShowAction ] = useState(false);
   const [ showJobDetail, setShowJobDetail ] = useState(false);



   const getClientXY = (e) =>{
      setClientXY([e.clientX, e.clientY]);
      setShowAction(true)
   }


    return(
        <section className={classes.tableParent}>
            {showAction && <ActionPopup clientX={clientXY[0]} clientY={clientXY[1]} setShowAction={setShowAction} />}
            {showJobDetail && <JobListingDetailPopup setShowJobDetail={setShowJobDetail} />}
       {width > 770 && <>
        <div className={classes.tableHeader}>
            <span className={classes.postedHeader}>Posted Date</span>
            <span className={classes.expiryHeader}>Expiry Date</span>
            <span className={classes.jobDescHeader}>Job Description</span>
            <span className={classes.applicantHeader}>Applicants</span>
            <span className={classes.statusHeader}>Status</span>
            <span className={classes.actionHeader}>Action</span>
        </div>
        <ul className={classes.unorderedList}>
            {new Array(15).fill().map((item, idx)=>(
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
            ))}
        </ul>
        </>}
        {width <= 770 &&<ul className={classes.unorderedListMobile}>
                {new Array(15).fill().map((item, idx)=>(
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
                ))}
        </ul>}
    </section>
    )
}

export default JobListings;