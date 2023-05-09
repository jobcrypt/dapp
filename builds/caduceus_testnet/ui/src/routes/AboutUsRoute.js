import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import classes from '../styles/routes/JobSeekersRoute.module.css';
import jobseekerIcon from '../assets/Layer.png';
import ReadyToStart from '../components/ReadyToStart';
import backArrow from '../assets/back.png';
import person from '../assets/person.png';
import contact from '../assets/contact.png';
import hackathon from '../assets/hackathon.png';
import filecoin from '../assets/filecoin.png';
import jobcrypt from '../assets/jobcrypt.png';
import frameImage from '../assets/Frame_image.png';
import useWindowSize from '../hooks/useWindowSize';



const AboutUsRoute = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const width = useWindowSize();

    useEffect(()=>{
    //    console.log(location)
       document.getElementById('about').scrollIntoView({ behavior: "smooth" });
    },[location.state.scroll])


    const openUrl = (url) =>{
        window.open(url);
    }


    const style={
        color: '#be8e24',
        fontWeight: 'normal',
        cursor: 'pointer'
    }
    
    return(
        <section className={classes.parent}>
            <img src={frameImage} alt='' className={classes.frameImage} />
            <article className={classes.article} id='about'>
                <div className={classes.rightBox}>
                    <h2>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                    </span>
                        About</h2>
                    <p>What is JobCrypt?</p>
                    <span>JobCrypt is the first fully decentralized job board hosted on the optimism network. We use the blockchain and the decentralized storage to serve permissionless job listings on the decentralized web. Our service enables applicants to apply using the power of the blockchain enabling them to verifably reach out to employers and enabling employers to accurately engage real applicants through decentralized ledger technology.</span>
                </div>
                {width > 770 &&<div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>}
            </article>
            <article className={classes.article} id='why'>
            <div className={classes.rightBox} style={{ minWidth: '100%'}}>
                    <h2>Why Us</h2>
                    <p>JobCrypt provides decentralized listings to the Web3, Blockchain, DeFI, NFT, Metaverse and Gaming communities</p>
                    <span>We ensure that candidates understand the fundamentals of blockchain through experimental learning ensuring that they can hit the ground running in their various disciplines and innovate new solutions that cater for decentralized operation.</span>
                </div>
                {/* <div className={classes.leftBox}></div> */}
            </article>
            <article className={classes.article}>
            <div className={classes.rightBox} style={{ minWidth: '100%'}}>
                <h3 className={classes.h3}>Why we use Web3</h3>
                {/* <p>JobCrypt provides decentralized listings to the Web3, Blockchain, DeFI, NFT, Metaverse and Gaming communities</p> */}
                <span>Traditional job board allow for inauthentic responses to employment listings quite simply, anyone can say for example "I know web3" with no proof leading to difficult consequences for both job seekers and employers</span>
            </div>
            <div className={classes.leftBox}></div>
            </article>
            <section className={classes.benefitSection} style={{ minWidth: '100%'}}>
                <ul className={classes.benefitList}>
                    <li>
                        <div className={classes.benefitIconBox}>
                            <span className={classes.benefitIconContainer}>
                                <img src={person} alt='' />
                            </span>
                        </div>
                        <div className={classes.benefitContent}>
                            <h3 className={classes.benefitH3}>Benefits for Employers</h3>
                            <p>By using JobCrypt, employers are assured that their staff are fully competent in the basics of using Web3 as part of their daily operation saving them on training time off and re-work.</p>
                        </div>
                    </li>
                    <li>
                        <div className={classes.benefitIconBox}>
                            <span className={classes.benefitIconContainer}>
                                <img src={contact} alt='' />
                            </span>
                        </div>
                        <div className={classes.benefitContent}>
                            <h3 className={classes.benefitH3}>Benefits for Job Seekers</h3>
                            <p>By applying through JobCrypt, job seekers can clearly demonstrate that they ahe Web3 capable and worthy of clear and concise consideration by employer.</p>
                        </div>
                    </li>
                </ul>
            <div className={classes.leftBox}></div>
            </section>
            <article className={classes.article}>
            <div className={classes.rightBox} style={{ minWidth: '100%', marginTop: '0px'}}>
                <span>Web3 and Blockchain are here to move the world forward. At JobCrypt we have recognised this tectonic shift in technology and are working hard to ensure that the right individuals with the right skills and competencies are being deployed to help address the challenges that come with this sea change.</span>
            </div>
            <div className={classes.leftBox}></div>
            </article>
            {width <= 770 &&<div className={classes.leftBox}>
                  <img src={jobseekerIcon} alt='' className={classes.image} />
                </div>}
           <section className={classes.awardsContainer} id='awards'>
                <h2>Awards</h2>
                <p>Since inception, we have grown from strength to strength supported by some of the best organisations in business</p>
                <main className={classes.supportContainer}>
                    <div>
                        <span className={classes.supportIconContainer}>
                            <img src={hackathon} alt='' />
                        </span>
                        <div className={classes.caption}>
                        <strong>Browser3000<br/><p style={{ fontWeight: 'normal', margin: '0px'}}>2021</p></strong>
                        <button onClick={()=>window.open('https://browsers3000.devpost.com/')}>Learn More</button>
                        </div>
                    </div>
                    <div>
                        <span className={classes.supportIconContainer}>
                            <img src={filecoin} alt='' />
                        </span>
                        <div className={classes.caption}>
                            <strong>Filecoin Next Steps Grant Awardee<br/><p style={{ fontWeight: 'normal', margin: '0px'}}>2021</p></strong>
                            <button onClick={()=>window.open('https://github.com/filecoin-project/devgrants/issues/340')}>Learn More</button>
                        </div>
                    </div>
                    <div>
                        <span className={classes.supportIconContainer}>
                            <img src={jobcrypt} alt='' />
                        </span>
                        <div className={classes.caption}>
                            <strong>JobCrypt on optimism mainnet<br/><p style={{ fontWeight: 'normal', margin: '0px'}}>2022</p></strong>
                            <button onClick={()=>window.open('https://optimistic.etherscan.io/tx/0xb15a81d8d42fd0de6304dfeddf585af449df394562434d1d9b402ba31c0768cf')}>Learn More</button>
                        </div>
                    </div>
                </main>
           </section>
           <article className={classes.article} id='contact'>
           <article className={classes.contactUsContainer}>
                <h1>Contact</h1>
                <p>For partnerships or more information about JobCrypt, Contact us on our <strong  onClick={()=>openUrl('https://discord.gg/kDTwvf59')} style={style}>Discord</strong> or <strong style={style} onClick={()=>openUrl('mailto:contact@jobcrypt.com')}>Email</strong> us</p>
            </article>
           </article>
        <ReadyToStart />
        </section>
    )
}

export default AboutUsRoute;