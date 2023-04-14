import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ReadyToStart from '../components/ReadyToStart';
import jobseekerIcon from '../assets/Layer.png';
import classes from '../styles/routes/JobSeekersRoute.module.css';
import backArrow from '../assets/back.png';

const SpeakersRoute = () =>{
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
                        Distinguished Speakers Programme</h2>
                    <p>What is the Jobcrypt Distinguished Speakers Programme?</p>
                    <span>JobCrypt Distinguished Speakers Programme has been created to support our community engagement efforts. Our goal is to help accelerate mainstream understanding of Blockchain and Web3 capabilities beyond those cryptocurrency. As part of this, JobCrypt will be hosting a series of talks online and in-person accross europe through 2023 and beyond. Presenters at our events will be drawn from out Distinguished Speakers Programme. Participation in the programme is free and voluntary</span>
                </div>
                <div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>For Speakers</h2>
                    <span>Our Distinguished Speakers set themselves apart as thought leaders in their topic areas with greater emphasis on building industry connections and growing communities. The benefits offered to you the speaker by the programme are:</span>
                    <ul className={classes.ul}>
                        <li>The opportunity to inspire the incoming wave of Web3 professionals through sharing of expertise.</li>
                        <li>The opportunity to showcase new projects and career achievements.</li>
                        <li>The opportunity to build new industry blockchain and Web3 industry networks.</li>
                    </ul>
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

export default SpeakersRoute;