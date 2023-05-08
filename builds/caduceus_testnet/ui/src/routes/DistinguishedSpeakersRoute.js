import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ReadyToStart from '../components/ReadyToStart';
import speakerIcon from '../assets/speaker.png';
import classes from '../styles/routes/JobSeekersRoute.module.css';
import backArrow from '../assets/back.png';
import useWindowSize from '../hooks/useWindowSize';

const DistinguishedSpeakersRoute = () =>{
    const navigate = useNavigate();
    const width = useWindowSize();
    useEffect(()=>{
        document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
  },[]);


  const openUrl = (url) =>{
    window.open(url)
  }
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
               {width > 770 && <div className={classes.leftBox}>
                  <img src={speakerIcon} alt='' className={classes.image} />
                </div>}
            </article>
            <article className={classes.article}>
                <div className={classes.rightBox} style={{ minWidth: '100%'}}>
                    <h2>For Speakers</h2>
                    <span>Our Distinguished Speakers set themselves apart as thought leaders in their topic areas with greater emphasis on building industry connections and growing communities. The benefits offered to you the speaker by the programme are:</span>
                    <ul className={classes.ul}>
                        <li>The opportunity to inspire the incoming wave of Web3 professionals through sharing of expertise.</li>
                        <li>The opportunity to showcase new projects and career achievements.</li>
                        <li>The opportunity to build new industry blockchain and Web3 industry networks.</li>
                    </ul>
                </div>
            </article>
            {width <= 770 &&<div className={classes.leftBox}>
                  <img src={speakerIcon} alt='' className={classes.image} />
                </div>}
            <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style} onClick={()=>openUrl('https://docs.google.com/forms/d/e/1FAIpQLSf5eHl4dgF1SAJVXv5a6hJYZHULJU1RCl9cnA9srZ1Wx7AfVg/viewform')}>here</strong></span>
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

export default DistinguishedSpeakersRoute;