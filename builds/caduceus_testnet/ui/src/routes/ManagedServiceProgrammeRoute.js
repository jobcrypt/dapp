import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ReadyToStart from '../components/ReadyToStart';
import employerIcon from '../assets/employer.png';
import backArrow from '../assets/back.png';
import classes from '../styles/routes/JobSeekersRoute.module.css';
import useWindowSize from '../hooks/useWindowSize';

const ManagedServiceProgrammeRoute = (props) =>{
    const navigate = useNavigate();
    const width = useWindowSize();


    useEffect(()=>{
        document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
  },[]);


    const style={
        color: '#be8e24',
        fontWeight: 'normal',
        cursor: 'pointer'
    }

    const openUrl = (url) =>{
        window.open(url);
    }

    return(
        <section className={classes.parent} id='parent'>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                    </span>
                        Managed Service Programme</h2>
                    <p>What is the Jobcrypt Managed Service Programme?</p>
                    <span>As a busy employer building the future of commerce and digital in web3, the JobCrypt managed service programme has been created to help you manage the challenging time constraints associated with acquiring the right talent. Be it co-founder or senior level staff down to analyst and entry level juniors. The JobCrypt Managed Service Programme will help find you the right individuals quickly and cost efficient ensuring that your focus is where it needs to be i.e getting your priorities done.</span>
                </div>
                {width > 770 &&<div className={classes.leftBox}>
                  <img src={employerIcon} alt='' className={classes.image} />
                </div>}
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox} style={{ minWidth: '100%'}}>
                    <h2>How it works</h2>
                    <span>Our team will tailor your listings requirements to your needs and design a tailor made outreach campaign for your job opportunity. <br/>Once your job is listed on JobCrypt, we will embark on this outreach campaign engaging the right communities and instiyutions to ensure appropriately qualified individuals apply to your role in the shortest time possible. During this period, we will carefully monitor the performance of your campaign ensuring that you receive the right number of qualified applicants.At the end of the campaign period, we will provide you with the campaign report to support your further hiring decisions. Our team is on hand to support any requests you may have or optimisations that you may require during the campaign with the goal of helping you achieve your recruitment process.</span>
                </div>
            </article>
            {width <= 770 &&<div className={classes.leftBox}>
                  <img src={employerIcon} alt='' className={classes.image} />
                </div>}
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style} onClick={()=>openUrl('https://docs.google.com/forms/d/e/1FAIpQLSeRQxNlubRtMEbX3k39CsCRObZS96a23okYe4DeC6k1-D0AUA/viewform')}>here</strong></span>
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

export default ManagedServiceProgrammeRoute;