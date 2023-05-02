

import classes from '../styles/popups/ApplyForJobPopup.module.css';
import success from '../assets/Success2.png';
import { useNavigate } from 'react-router-dom';


const ApplyForJobPopup = (props) =>{
    const { setApply, apply } = props;
    const navigate = useNavigate();
    
    const navigateToJobBoard = () =>{
        // navigate('/browse-job'); 
        setApply(prev=>({ ...prev, status: false }));
    }


   return(
    <section className={classes.parent} onClick={()=>setApply(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={success} alt='' className={classes.success} />
                <h1>Congratulations!!!</h1>
                <p className={classes.sendResumeTxt}>Kindly send your resume to</p>
                <p className={classes.emailTxt}>{apply.applyLink}</p>
                <button onClick={navigateToJobBoard}>Go To Job Board</button>
            </div>
        </section>
   )
}

export default ApplyForJobPopup;