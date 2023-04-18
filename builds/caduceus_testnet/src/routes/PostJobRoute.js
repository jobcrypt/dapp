import { useState } from 'react';


import classes from '../styles/routes/PostJobRoute.module.css';
import hero from '../assets/hero.png';
import PostJobPopup from '../popups/PostJobPopup';
import JobListings from '../components/JobListings';


const PostJobRoute = () =>{
     const [ openPostJob, setOpenPostJob ] = useState(false);


    const srollToListings = () =>{
        document.getElementById('listing').scrollIntoView({ behavior: "smooth" });
    }
    return(
        <section className={classes.parent}>
            {openPostJob && <PostJobPopup setOpenPostJob={setOpenPostJob} />}
            <main className={classes.hero}>
                <img src={hero} alt='' className={classes.heroImage} />
                <h1>Discover or Post Jobs</h1>
                {/* <img src={discoverImage} alt='Discover or post jobs' className={classes.discoverImage} /> */}
                <p>Find great jobs in the metaverse at startups that uses conseus technology</p>
                <div className={classes.btnContainer}>
                    <button className={classes.postJobBtn} onClick={()=>setOpenPostJob(true)}>Post Jobs</button>
                    <button className={classes.viewListingBtn} onClick={srollToListings}>View Listings</button>
                </div>
            </main>
            <main className={classes.jobListingParent} id='listing'>
                <h1 className={classes.listingTitle}>Your Job Listing</h1>
                <JobListings />
            </main>
        </section>
    )
}

export default PostJobRoute;