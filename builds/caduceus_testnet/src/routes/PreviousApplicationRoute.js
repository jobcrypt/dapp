
import classes from '../styles/routes/PreviousApplicationRoute.module.css';
import hero from '../assets/hero.png';
import PreviousJobApplications from '../components/PreviousJobApplications';


const PreviousApplicationRoute = () =>{
    return(
        <secton className={classes.parent}>
             <img src={hero} alt='' className={classes.hero} />
             <h1>Your Previous Job Applications</h1>
             <PreviousJobApplications />
        </secton>
    )
}

export default PreviousApplicationRoute;