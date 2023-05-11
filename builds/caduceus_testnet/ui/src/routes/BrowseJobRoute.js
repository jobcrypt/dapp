import { useNavigate } from 'react-router-dom';

import classes from '../styles/routes/BrowseJobRoute.module.css';
import hero from '../assets/hero.png';
import moreIcon from '../assets/more.png';
import PromotionPane from '../components/PromotionPane_old';
import BrowseJobs from '../components/BrowseJobs';
import { useState } from 'react';
import PreviousApplicationPopup from '../popups/PreviousApplicationPopup';





const BrowseJobRoute = () =>{
    const navigate = useNavigate();
    const [ openPopup, setOpenPopup ] = useState(false);


    const srollToListings = () =>{
        document.getElementById('browse').scrollIntoView({ behavior: "smooth" });
    }



    return(
        <section className={classes.parent}>
            {openPopup && <PreviousApplicationPopup setOpenPopup={setOpenPopup} />}
            {/* <main className={classes.hero}>
                <img src={hero} alt='' className={classes.heroImage} />
                <h1>Discover or Post Jobs</h1>
                <p>Find great jobs in the metaverse at startups that uses conseus technology</p>
                <div className={classes.btnContainer}>
                </div>
            </main> */}
            <BrowseJobs />
           {/* <PromotionPane /> */}
            {/* <main className={classes.jobListingParent} id='browse'>
            <BrowseJobs />
            </main> */}
        </section>
    )
}

export default BrowseJobRoute;