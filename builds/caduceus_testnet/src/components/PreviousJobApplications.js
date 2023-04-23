

import classes from '../styles/components/PreviousJobApplications.module.css';
import moreIcon from '../assets/more.png';
import useWindowSize from '../hooks/useWindowSize';
import { useState } from 'react';
import ActionPopup from '../popups/ActionPopup';
import JobListingDetailPopup from '../popups/JobListingDetailPopup';


const PreviousJobApplications = () =>{
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
             <span className={classes.postedHeader}>Application Date</span>
             <span className={classes.jobDescHeader}>Job Description</span>
             <span className={classes.linkHeader}>Link</span>
             <span className={classes.applicantHeader}>Applicants</span>
             <span className={classes.actionHeader}>Action</span>
         </div>
         <ul className={classes.unorderedList}>
             {new Array(15).fill().map((item, idx)=>(
                 <li key={idx} className={classes.list}>
                     <span>01 April, 2023 07:22:13</span>
                     <span>UI/UX Designer</span>
                     <span>hr@lawrence.com</span>
                     <span>50</span>
                     <div className={classes.statusContainer} style={idx%2===0? { color: '#E17726'} : { color: '#159500'}}>{`${idx%2===0? 'Open' : 'Closed'}`}</div>
                 </li>
             ))}
         </ul>
         </>}
         {width <= 770 &&<ul className={classes.unorderedListMobile}>
                 {new Array(15).fill().map((item, idx)=>(
                 <li key={idx}>
                     <div className={classes.leftBox}>
                         <h2>UI/UX Designer</h2>
                         <p>01 April, 2023 07:13:48</p>
                     </div>
                     <div className={classes.rightBox}>
                         <h2 style={idx%2===0? { color: '#E17726'} : { color: '#159500'}}>{`${idx%2===0? 'Open' : 'Closed'}`}</h2>
                         <p>50</p>
                     </div>
                 </li>
                 ))}
         </ul>}
     </section>
     )
}

export default PreviousJobApplications;