
import classes from '../styles/routes/PreviousApplication.module.css';
import hero from '../assets/hero.png';
import JobListings from '../components/JobListings';


const PreviousApplication = () =>{
    return(
        <secton className={classes.parent}>
             <img src={hero} alt='' className={classes.hero} />
             <h1>Your Previous Job Applications</h1>
             <JobListings />
        </secton>
    )
}

export default PreviousApplication;