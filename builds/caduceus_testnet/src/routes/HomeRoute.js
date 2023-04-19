import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


import classes from '../styles/routes/HomeRoute.module.css';
import hero from '../assets/hero.png';
import vector1 from '../assets/Vector1.png';
import vector2 from '../assets/Vector2.png';
import decentralized from '../assets/decentralized.png';
import permissionless from '../assets/permissionless.png';
import openIcon from '../assets/open.png';
import decentralized_svg from '../assets/decentralized.svg';
import permissionless_svg from '../assets/permissionless.svg';
import openIcon_svg from '../assets/open.svg';
import speakerIcon from '../assets/speaker.png';
import employerIocn from '../assets/employer.png';
import communityIcon from '../assets/community.png';
import jobseekerIcon from '../assets/jobseeker.png';
import rail from '../assets/rail.png';
import businessIcon from '../assets/corporate_businessman.png';
import CalendarEvent from '../components/CalendarEvent';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';
import PromotionPane from '../components/PromotionPane';
import SustanabilityWeekEvent from '../components/SustanabilityWeekEvent';
import ReadyToStart from '../components/ReadyToStart';
import useWindowSize from '../hooks/useWindowSize';



 const HomeRoute = (props) =>{
    const navigate = useNavigate();
   const [promoArray] = useState([ vector1, vector2, vector1, vector2, vector1, vector2, vector1, vector2 ]);
   const [ openMetaPopup, setOpenMetaPopup ] = useState(false);
   const width = useWindowSize();

   useEffect(()=>{
    document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
   },[]);

   let styleCol, styleRev;
   if(width <= 770){
    styleCol = { 
        flexDirection: 'column', 
        msFlexDirection: 'column'
    }
    styleRev = { 
        flexDirection: 'column-reverse', 
        msFlexDirection: 'column-reverse'
    }
   }
  return(
    <>
    {openMetaPopup && <ConnectMetaMaskPopup setOpenMetaPopup={setOpenMetaPopup} />}
    
    <section className={classes.parent} id='parent'>
      <span className={classes.heroContainer}>
         <img src={hero} alt='' className={classes.hero} />
      </span>
         <span className={classes.welcome}>
            {/* <img src={welcomeIcon} alt='Welcome to JobCrypt' /> */}
            <h1>Welcome To JobCrypt</h1>
         </span>
         <p className={classes.applicantTxt}>Where every applicant is a WEB 3 user</p>
         <section className={classes.smallSection}>
            <p>Install caduceus to metamask and stake to apply or post web3 jobs </p>
            <button className={classes.connectWalletBtn} onClick={()=>setOpenMetaPopup(true)}>CONNECT WALLET</button>
            <button className={classes.needCryptoBtn}>Need Crypto?</button>
         </section>
    </section>
    <main className={classes.main}>
    <PromotionPane />
    <section className={classes.center}>
      <article className={classes.rectangle}>
          <h1>Job Board</h1>
          <ul className={classes.box}>
               <li>
                   <div className={classes.jobTop}>Featured Jobs</div>
                   <div className={classes.content}>
                      <p>Multiple jobs are uploaded on the blockchain by the hour. <a href='https://metamask.io'>Install metamask</a> to view available jobs</p>
                   </div>
               </li>
               <li>
                   <div className={classes.jobTop}>Featured Jobs</div>
                   <div className={classes.content}>
                      <p>Multiple jobs are uploaded on the blockchain by the hour. <a href='https://metamask.io'>Install metamask</a> to view available jobs</p>
                   </div>
               </li>
               <li>
                   <div className={classes.jobTop}>Featured Jobs</div>
                   <div className={classes.content}>
                      <p>Multiple jobs are uploaded on the blockchain by the hour. <a href='https://metamask.io'>Install metamask</a> to view available jobs</p>
                   </div>
               </li>
          </ul>
      </article>
    </section>
    <section className={classes.permissionlessContainer}>
      <div className={classes.permissionTop}>
        <p>Reasons why millions of</p>
        <h1>WEB 3 Job Seekers use JobCrypt</h1>
      </div>
      <article className={classes.permissionBoxParent}>
            <div className={classes.tallBox}>
                <img src={permissionless_svg} alt='' />
                <h2>Permissionless</h2>
                <p>Posting on Jobcrypt is permissionless, Post your job when you want. Only you have access to your listings.</p>
            </div>
            <div className={classes.tallBox}>
                <img src={decentralized_svg} alt='' />
                <h2>Decentralized</h2>
                <p>Job listings are 100% decentralized, we don't have any secret databases anywhere.</p>
            </div>
            <div className={classes.tallBox}>
                <img src={openIcon_svg} alt='' />
                <h2>Open</h2>
                <p>JobCrypt listings are open, they live on the blockchain and using Open Block EI, only you can modify your listings</p>
            </div>
      </article>
    </section>
    <section className={classes.bundle}>
    <article className={classes.article} style={styleRev}>
        <div className={classes.leftBox} style={{ justifyContent: 'flex-start'}}>
              <img src={jobseekerIcon} alt='' className={classes.image} />
        </div>
        <div className={classes.rightBox}>
            <h2>Job Finders</h2>
            <p>What is finder programme?</p>
            <span>JobCrypt Job Finder Programme has been created to accelerate the job search for you the Job Seeker. By enrolling into the programme you the job...</span>
            <button className={classes.learnMoreBtn} onClick={()=>navigate('/job-seekers')}>Learn More</button>
        </div>
    </article>
    <article className={classes.article}style={styleCol}>
        <div className={classes.rightBox}>
            <h2>Employer</h2>
            <p>What is Managed Services?</p>
            <span>As a busy employer building the future of commerce and digital in Web3. the JobCrypt Managed Service Programme has been created to help you manages the challengies.</span>
            <button className={classes.learnMoreBtn} onClick={()=>navigate('/employer')}>Learn More</button>
        </div>
        <div className={classes.leftBox} style={{ justifyContent: 'flex-end'}}>
              <img src={employerIocn} alt='' className={classes.image} />
        </div>
    </article>
    <article className={classes.article}>
        <div className={classes.leftBox} style={{ justifyContent: 'flex-start'}}>
              <img src={communityIcon} alt='' className={classes.image} />
        </div>
        <div className={classes.rightBox}>
            <h2>Community</h2>
            <p>What is Community Programme?</p>
            <span>JobCrypt Community Programme has the prupose of supporting new and emergent projects that are looking to scale in Web3 and Blockchcin. The goal of the programme.</span>
            <button className={classes.learnMoreBtn} onClick={()=>navigate('/community')}>Learn More</button>
        </div>
    </article>
    <article className={classes.article} style={styleCol}>
        <div className={classes.rightBox}>
            <h2>Speakers</h2>
            <p>What is Distinguished Speaker Programme?</p>
            <span>JobCrypt Distinguished S[eakers Programme has been created to support our community Engagement efforts. Our goal is to help...].</span>
            <button className={classes.learnMoreBtn} onClick={()=>navigate('/speakers')}>Learn More</button>
        </div>
        <div className={classes.leftBox} style={{ justifyContent: 'flex-end'}}>
              <img src={speakerIcon} alt='' className={classes.image} />
        </div>
    </article>
    </section>
    <section className={classes.blueSection}>
    <article className={classes.railContainer}>
        <img src={rail} alt='' />
    </article>
        <img src={businessIcon} alt='' />
        <h1>Featured Events</h1>
        <p>Our events help us to conect to you, bring the best in blockchain and web3 education to your city</p>
        <div>
            <button onClick={()=>navigate('/featured-events')}>Learn More</button>
        </div>
    </section>
    {/* <CalendarEvent /> */}
    <SustanabilityWeekEvent />
    <ReadyToStart />
    </main>
    </>
   )
}

export default HomeRoute;