import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import classes from '../styles/popups/DashboardPopup.module.css';
import ConnectMetaMaskPopup from './ConnectMetaMaskPopup';
import cancelIcon from '../assets/x.png';
import dashIcon from '../assets/dash.png';



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

    const closeHandler = () =>{
        setOpenMetaPopup(false);
        setDispatch({ TYPE: 'DASHBOARD', status: false });
    }

     return(
        <section className={classes.parent}>
           <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <span className={classes.cancelParent}>
                    <div className={classes.cancel} onClick={closeHandler}>
                        <img src={cancelIcon} alt='' />
                    </div>
                </span>
                <span className={classes.titleContainer}>
                    <img src={dashIcon} alt='' />
                    <h1>SELECT DASHBOARD</h1>
                </span>
                <span className={classes.btnContainer}>
                    <button onClick={employerHandler}>EMPLOYER</button>
                    <button onClick={jobSeekerHandler}>JOBSEEKER</button>
                </span>
           </div>
       </section> 
      
     )
}

export default DashboardPopup;

{/* <section className={classes.parent} onClick={()=>setDispatch({ TYPE: 'DASHBOARD', status: false })}>
<div className={classes.box} onClick={(e)=>e.stopPropagation()}>
<span className={classes.title}>Select Dashboard</span>
<div className={classes.btnContainer2}>
  <button className={classes.returnBtn} onClick={employerHandler}>Employer</button>
  <button className={classes.postBtn} onClick={jobSeekerHandler}>Job Seeker</button>
</div>
</div>
</section> */}