import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import classes from '../styles/routes/JobSeekersRoute.module.css';
import jobseekerIcon from '../assets/jobseeker.png';
import ReadyToStart from '../components/ReadyToStart';
import backArrow from '../assets/back.png';
import useWindowSize from '../hooks/useWindowSize';


const JobFinderProgrammeRoute = (props) =>{
    const width = useWindowSize();
    const navigate = useNavigate();

    useEffect(()=>{
        document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
  },[]);

    const style={
        color: '#be8e24',
        fontWeight: 'normal',
        cursor: 'pointer'
    }

    const openUrl =(url) =>{
        window.open(url)
    }


    return(
        <section className={classes.parent} id='parent'>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                    </span>
                        Job Finders Programme</h2>
                    <p>What is finder programme?</p>
                    <span>JobCrypt Job Finder Programme has been created to accelerate the job search process for you the job seeker. By enrolling into the programme, you the job seeker get early access to the latest roles in blockchain and web3 that are posted to JobCrypt. These roles are carefully matched to your Job Seekers profile saving critical time in finding and executing against the right opportunity for your skills.</span>
                </div>
               {width > 770 && <div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>}
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox} style={{ minWidth: '100%'}}>
                    <h2>How it works</h2>
                    <span>To get alerts as a Job Seeker, you will need to create your dashboard on JobCrypt and sign up on the form below. Your skill preferences will then be mapped to the skills on our chain search, thus when you access your dashboard, you will receive notification of the latest jobs that have been posted matching your skills.</span>
                </div>
            </article>
            {width <= 770 && <div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>}
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style} onClick={()=>openUrl('https://docs.google.com/forms/d/e/1FAIpQLSf79sYKcwAyIHhjGKp0zQyVL4zYgHtJRJ_NWANyIibnHzlsPg/viewform')}>here</strong></span>
                </div>
            </article>
            <article className={classes.article}>
            <article className={classes.contactUsContainer}>
                <h1>Contact</h1>
                <p>For partnerships or more information about JobCrypt, Contact us on our <strong  onClick={()=>openUrl('https://discord.gg/kDTwvf59')} style={style}>Discord</strong> or <strong style={style} onClick={()=>openUrl('mailto:contact@jobcrypt.com')}>Email</strong> us</p>
            </article>
           </article>
        <ReadyToStart />
        </section>
    )
}

export default JobFinderProgrammeRoute;