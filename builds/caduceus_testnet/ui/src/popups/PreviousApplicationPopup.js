

import { useCallback, useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import classes from '../styles/popups/PreviousApplicationPopup.module.css';
import { createJobSeekerDashboard, findJobSeekerDashboard } from '../contracts/ContractManager';
import { AccountContext } from '../App';
import { useNavigate } from 'react-router-dom';


const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

const PreviousApplicationPopup = (props) =>{
     const { setOpenPopup } = props;
     const [ isLoading, setIsLoading ] = useState({status: false, message: ''});
     const [hasDashBoard, setHasDashboard] = useState(false);
     const [ isCreating, setIsCreating ] = useState({ status: false, message: '' });
     const navigate = useNavigate();
     const { account } = useContext(AccountContext);

     
     const findJobSeekerDashboardHandler = useCallback(async() =>{
        if(!account.isConnected)return;
        setIsLoading({ status: true, message: '' });
        let dashAddress = await findJobSeekerDashboard();
        setIsLoading({ status: false, message: '' });
        console.log(dashAddress)
        if(dashAddress !== ZERO_ADDRESS){
            setHasDashboard(true);
        }else{
            setHasDashboard(false)
        }
    
    },[]);


    const createJobSeekerDashboardHandler = useCallback(async() =>{
        if(!account.isConnected)return;
        setIsCreating({ status: true, message: 'Creating your dashboard, please wait...'});
            const address = await createJobSeekerDashboard();
            console.log('Address: ',address)
        if(address !== ZERO_ADDRESS){
            setHasDashboard(true);
            setIsCreating({ status: false, message: 'Dashboard created successfully!' });
            sessionStorage.setItem('jobseeker_address', address);
            // sessionStorage.setItem('jobseeker_dash', dashAddress)
        }
    },[]);


     useEffect(()=>{
        findJobSeekerDashboardHandler();
     },[findJobSeekerDashboardHandler]);

     
     const userNoDashboard=(
        <div className={classes.box}>
        <header className={classes.header}>
           {isLoading.status &&<p>Checking your status...</p>}
           {!isLoading.status && <p>Create your dashboard</p>}
        </header>
        <span className={classes.center}>
            {(isLoading.status || isCreating.status) &&<Spinner size={40} color1={'#2c2231'} />}
            {isLoading.status && <p>Checking for exisiting dashboard.</p>}
           {!isLoading.status &&<p>You don't have a dashboard yet. Please create one</p>}
        </span>
        <span className={classes.btnContainer}>
           <button className={classes.normalBtn} onClick={()=>setOpenPopup(false)}>Close</button>
           {!hasDashBoard &&<button className={classes.linearGradBtn} onClick={createJobSeekerDashboardHandler} disabled={isLoading.status}>Create Dashboard</button>}
           {!hasDashBoard &&<p>Warning: This action incurs gas fee</p>}
        </span>
   </div>
     )

     const userHasdashboard=(
        <div className={classes.box}>
        <header className={classes.header}>
           <p>Your Dashboard</p>
        </header>
        <span className={classes.center}>
           <p>You can now view your previous Applications</p>
        </span>
        <span className={classes.btnContainer}>
           <button className={classes.normalBtn} onClick={()=>setOpenPopup(false)}>Close</button>
           {hasDashBoard &&<button className={classes.linearGradBtn} onClick={()=>navigate('/previous-application')}>View Previous Application</button>}
        </span>
   </div>
     )
    return(
        <section className={classes.parent}>
           {hasDashBoard && userHasdashboard}
           {!hasDashBoard && userNoDashboard}
        </section>
    )
}

export default PreviousApplicationPopup;