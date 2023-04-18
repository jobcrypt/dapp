import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ReadyToStart from '../components/ReadyToStart';
import jobseekerIcon from '../assets/Layer.png';
import classes from '../styles/routes/JobSeekersRoute.module.css';
import backArrow from '../assets/back.png';


const CommunityRoute = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
  },[]);


    const style={
        color: '#be8e24',
        fontWeight: 'normal',
        cursor: 'pointer'
    }


    return(
        <section className={classes.parent} id='parent'>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                    </span>
                        Community Programme</h2>
                    <p>What is the Jobcrypt Community Programme?</p>
                    <span>JobCrypt community programme has the purpose of supporting new and emergant projects that are looking to scale in Web3 and Blockchain. The goal of the programme is to foster a culture of community innovation that allows new projects to access some of the best talent out there and hence create future defining experiences in Web3</span>
                </div>
                <div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>How it works</h2>
                    <span>As part of the JobCrypt community programme, new projects are provided with 3 community listings annually with wgich to secure talent to help them reach their next key milestone be that project build, venture funding or commercial launch. Projets also have access to JobCrypt Beta features, thus helping define the future of work.</span>
                </div>
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style}>here</strong></span>
                </div>
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Contact</h2>
                    <span>For partnerships or more information about JobCrypt, Contact us on our <strong style={style}>Discord</strong> or <strong style={style}>Email</strong> us</span>
                    {/* <p>For partnerships or more information about JobCrypt, Contact us on our <strong style={style}>Discord</strong> or <strong style={style}>Email</strong> us</p> */}
                </div>
           </article>
        <ReadyToStart />
        </section>
    )
}

export default CommunityRoute;