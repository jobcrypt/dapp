import { useState } from 'react';


import classes from '../styles/routes/BrowseJobRoute.module.css';
import hero from '../assets/hero.png';
import moreIcon from '../assets/more.png';
import PromotionPane from '../components/PromotionPane';
import PreviousApplication from '../components/PreviousApplication';





const BrowseJobRoute = () =>{
    const [ openPostJob, setOpenPostJob ] = useState(false);


    const srollToListings = () =>{
        document.getElementById('listing').scrollIntoView({ behavior: "smooth" });
    }



    return(
        <section className={classes.parent}>
            <main className={classes.hero}>
                <img src={hero} alt='' className={classes.heroImage} />
                <h1>Discover or Post Jobs</h1>
                <p>Find great jobs in the metaverse at startups that uses conseus technology</p>
                <div className={classes.btnContainer}>
                    <button className={classes.postJobBtn} onClick={srollToListings}>Browse Jobs</button>
                    <button className={classes.viewListingBtn} onClick={()=>setOpenPostJob(true)}>Previous Applications</button>
                </div>
            </main>
           <PromotionPane />
            <main className={classes.jobListingParent} id='listing'>
                <PreviousApplication />
            </main>
        </section>
    )
}

export default BrowseJobRoute;