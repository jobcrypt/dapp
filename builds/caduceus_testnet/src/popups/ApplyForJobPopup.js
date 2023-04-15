

import classes from '../styles/popups/ApplyForJobPopup.module.css';
import success from '../assets/Success2.png';
import { useNavigate } from 'react-router-dom';


const ApplyForJobPopup = (props) =>{
    const { setApply } = props;
    const navigate = useNavigate();
    
    const navigateToJobBoard = () =>{
        navigate('/browse-job'); 
        setApply(false);
    }


   return(
    <section className={classes.parent} onClick={()=>setApply(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={success} alt='' className={classes.success} />
                <h1>Congratulations!!!</h1>
                <p className={classes.sendResumeTxt}>Kindly send your resume to</p>
                <p className={classes.emailTxt}>career@resume.com</p>
                <button onClick={navigateToJobBoard}>Go To Job Board</button>
            </div>
        </section>
   )
}

export default ApplyForJobPopup;