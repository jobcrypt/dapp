import { useNavigate } from 'react-router-dom';

import classes from '../styles/routes/BrowseJobRoute.module.css';
import hero from '../assets/hero.png';
import moreIcon from '../assets/more.png';
import PromotionPane from '../components/PromotionPane';
import BrowseJobs from '../components/BrowseJobs';





const BrowseJobRoute = () =>{
    const navigate = useNavigate();


    const srollToListings = () =>{
        document.getElementById('browse').scrollIntoView({ behavior: "smooth" });
    }



    return(
        <section className={classes.parent}>
            <main className={classes.hero}>
                <img src={hero} alt='' className={classes.heroImage} />
                <h1>Discover or Post Jobs</h1>
                <p>Find great jobs in the metaverse at startups that uses conseus technology</p>
                <div className={classes.btnContainer}>
                    <button className={classes.postJobBtn} onClick={srollToListings}>Browse Jobs</button>
                    <button className={classes.viewListingBtn} onClick={()=>navigate('/previous-application')}>Previous Applications</button>
                </div>
            </main>
           <PromotionPane />
            <main className={classes.jobListingParent} id='browse'>
            <BrowseJobs />
            </main>
        </section>
    )
}

export default BrowseJobRoute;