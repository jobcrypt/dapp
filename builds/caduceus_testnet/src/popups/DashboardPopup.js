import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/popups/DashboardPopup.module.css';
import ConnectMetaMaskPopup from './ConnectMetaMaskPopup';
import { openMetaMask } from '../store/UserWalletSlice';

const DashboardPopup = (props) =>{
    const { setDispatch } = props;
    const dispatch = useDispatch();
    const [ openMetaPopup, setOpenMetaPopup ] = useState(false);
    // const openMetaMaskPopup = useSelector(state=>state.user.openMetaMask);

    const employerHandler = () =>{
        setOpenMetaPopup(true);
        // dispatch(openMetaMask());
    }

    const jobSeekerHandler = () =>{
        setOpenMetaPopup(true);
        // dispatch(openMetaMask());
}

     return(
        <section className={classes.parent} onClick={()=>setDispatch({ TYPE: 'DASHBOARD', status: false })}>
            {openMetaPopup &&<ConnectMetaMaskPopup setOpenMetaPopup={setOpenMetaPopup} setDispatch={setDispatch} />}
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
           <span className={classes.title}>What are you?</span>
           <div className={classes.btnContainer2}>
              <button className={classes.returnBtn} onClick={employerHandler}>Employer</button>
              <button className={classes.postBtn} onClick={jobSeekerHandler}>Job Seeker</button>
           </div>
          </div>
        </section>
     )
}

export default DashboardPopup;