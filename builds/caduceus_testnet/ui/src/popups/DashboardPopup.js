import { useState } from 'react';

import classes from '../styles/popups/DashboardPopup.module.css';
import ConnectMetaMaskPopup from './ConnectMetaMaskPopup';
import { useNavigate } from 'react-router-dom';

const DashboardPopup = (props) =>{
    const { setDispatch, setShowHamburger } = props;
    const navigate = useNavigate();
    const [ openMetaPopup, setOpenMetaPopup ] = useState(false);

    const employerHandler = () =>{
        navigate('/employer_dashboard');
        setShowHamburger(false);
        // setOpenMetaPopup(false);
        setDispatch({ TYPE: 'DASHBOARD', status: false });
    }

    const jobSeekerHandler = () =>{
        navigate('/jobseeker_dashboard');
        setShowHamburger(false);
        // setOpenMetaPopup(false);
        setDispatch({ TYPE: 'DASHBOARD', status: false });
}

     return(
        <section className={classes.parent} onClick={()=>setDispatch({ TYPE: 'DASHBOARD', status: false })}>
            {/* {openMetaPopup &&<ConnectMetaMaskPopup setOpenMetaPopup={setOpenMetaPopup} setDispatch={setDispatch} />} */}
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
           <span className={classes.title}>Select Dashboard</span>
           <div className={classes.btnContainer2}>
              <button className={classes.returnBtn} onClick={employerHandler}>Employer</button>
              <button className={classes.postBtn} onClick={jobSeekerHandler}>Job Seeker</button>
           </div>
          </div>
        </section>
     )
}

export default DashboardPopup;