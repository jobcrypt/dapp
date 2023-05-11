import { useContext, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import classes from '../styles/routes/EmployerDashboardRoute.module.css';
import PreviousJobPostings from '../components/PreviousJobPostings';
import { createEmployerDashboard, findEmployerDashboard } from '../contracts/ContractManager';
import { AccountContext } from '../App';
import { isNull } from '../utils/Util';
import PostJobPopup from '../popups/PostJobPopup';
import useConnectMetaMask from '../hooks/useMetamask';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';


const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';
const EmployerDashboardRoute = () =>{
    //  const [ openPostJob, setOpenPostJob ] = useState(false);
     const [ hasDashboard, setHasDashboard ] = useState(false);
     const { setEmployerDashAddress, account } = useContext(AccountContext);
     const navigate = useNavigate();
     const [ openPostJob, setOpenPostJob ] = useState(false);
     const { connect } = useConnectMetaMask();
     const [ openMetaPopup, setOpenMetaPopup ] = useState(false);
     const pathRef = useRef(null);

     
     const getEmployerDashboard = useCallback(async() =>{
        // console.log('isconnected: ', account.isConnected)
        if(!account.isConnected)return;
        // console.log('a')
        const dashAddress = await findEmployerDashboard();
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            console.log('dash: ', dashAddress);
            setHasDashboard(true);
            setEmployerDashAddress(dashAddress);
      }else{
            setHasDashboard(false);
      }
    
    },[account.address])

    const createDashboard = async() =>{
        const dashAddress = await createEmployerDashboard();
        // console.log("Dashboard address: ", dashAddress);
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            setHasDashboard(true);
            setEmployerDashAddress(dashAddress);
            // sessionStorage.setItem('dash', dashAddress)
        }else{
            setHasDashboard(false);
        }
    }

     useLayoutEffect(()=>{
        getEmployerDashboard();
     },[getEmployerDashboard]);

     useLayoutEffect(()=>{
        document.getElementById('listing').scrollIntoView({ behavior: "smooth" });
     },[]);

    const handleNavigation = (type) =>{
        if(!account.isConnected){
            setOpenMetaPopup(true);
        }else{
            if(type === 'post'){
                setOpenPostJob(true);
                pathRef.current = '';
            }else{
                navigate('/browse-job');
                pathRef.current = '/browse-job';
            }
        }
     }

    return(
        <>
        {openMetaPopup && <ConnectMetaMaskPopup path={pathRef.current} setOpenMetaPopup={setOpenMetaPopup} shouldUseDispatch={false} />}
        {openPostJob && <PostJobPopup formToOpen='CREATE_DRAFT' setOpenPostJob={setOpenPostJob} />}
        <section className={classes.parent} id='listing'>
            <span className={classes.header}>
                <h1>Your Previous Job Postings</h1>
                <div className={classes.btnContainer}>
                {!hasDashboard &&<button onClick={createDashboard}>Create Dashboard</button>}
                <button onClick={()=>handleNavigation('post')}>Post Jobs</button>
                <button onClick={()=>handleNavigation('browse')}>Browse Jobs</button>
                </div>
            </span>
            <PreviousJobPostings />
        </section>
        </>
    )
}

export default EmployerDashboardRoute;