
import classes from '../styles/routes/JobSeekerDashboardRoute.module.css';
import PreviousJobApplications from '../components/PreviousJobApplications';
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createJobSeekerDashboard, findJobSeekerDashboard } from '../contracts/ContractManager';
import { AccountContext } from '../App';
import { isNull } from '../utils/Util';
import { useNavigate } from 'react-router-dom';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';



const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';
const JobSeekerDashboardRoute = () =>{
    const { account } = useContext(AccountContext);
    const [ hasDashboard, setHasDashboard ] = useState(false);
    const navigate = useNavigate();
    const [ openMetaPopup, setOpenMetaPopup ] = useState(false);


    const findJobSeekerDashboardHandler = useCallback(async() =>{
        if(!account.isConnected)return;
        const dashAddress = await findJobSeekerDashboard();
        console.log(dashAddress)
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            setHasDashboard(true);
            // sessionStorage.setItem('jobseeker_address', dashAddress);
        }else{
            setHasDashboard(false)
        }
    
    },[account.address]);

    useEffect(()=>{
        findJobSeekerDashboardHandler();
    },[findJobSeekerDashboardHandler]);

    useLayoutEffect(()=>{
        document.getElementById('posting').scrollIntoView({ behavior: "smooth" });
     },[]);
    
    const createJobSeekerDashboardHandler = useCallback(async() =>{
        if(!account.isConnected)return;
            const dashAddress = await createJobSeekerDashboard();
        if(dashAddress !== ZERO_ADDRESS && !isNull(dashAddress)){
            setHasDashboard(true);
            // sessionStorage.setItem('jobseeker_address', dashAddress);
        }
    },[account.address]);


    const browseJobsHandler = (type) =>{
        if(!account.isConnected){
            setOpenMetaPopup(true);
        }else{
            navigate('/browse-job');
        }
     }


    return(
        <section className={classes.parent} id='posting'>
            {openMetaPopup && <ConnectMetaMaskPopup path='/browse-job' setOpenMetaPopup={setOpenMetaPopup} shouldUseDispatch={false} />}
             <span className={classes.header}>
                 <h1>Your Previous Job Applications</h1>
                 <div className={classes.btnContainer}>
                    {!hasDashboard &&<button onClick={createJobSeekerDashboardHandler}>Create Dashboard</button>}
                    <button onClick={browseJobsHandler}>Browse Jobs</button>
                 </div>
             </span>
             <PreviousJobApplications />
        </section>
    )
}

export default JobSeekerDashboardRoute;