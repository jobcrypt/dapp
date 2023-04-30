import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'


import classes from '../styles/routes/HomeRoute.module.css';
import hero from '../assets/hero.png';
import decentralized from '../assets/decentralized.png';
import permissionless from '../assets/permissionless.png';
import openIcon from '../assets/open.png';
import speakerIcon from '../assets/speaker.png';
import employerIocn from '../assets/employer.png';
import communityIcon from '../assets/community.png';
import jobseekerIcon from '../assets/jobseeker.png';
import rail from '../assets/rail.png';
import businessIcon from '../assets/corporate_businessman.png';
import frame9 from '../assets/Frame9.png';
import frame10 from '../assets/Frame10.png';
import frame11 from '../assets/Frame11.png';
import frame12 from '../assets/Frame12.png';
import frame13 from '../assets/Frame13.png';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';
import PromotionPane from '../components/PromotionPane';
import SustanabilityWeekEvent from '../components/SustanabilityWeekEvent';
import ReadyToStart from '../components/ReadyToStart';
import useWindowSize from '../hooks/useWindowSize';
import { AccountContext } from '../App';
import PostJobPopup from '../popups/PostJobPopup';



 const HomeRoute = () =>{
    const navigate = useNavigate();
   const [ openMetaPopup, setOpenMetaPopup ] = useState(false);
   const width = useWindowSize();
   const { account } = useContext(AccountContext);
   const [ isMetaMaskInstalled, setIsMetamaskInstalled ] = useState(false);
   const [ openPostJob, setOpenPostJob ] = useState(false);



   useEffect(()=>{
    try{
      if(window.ethereum)setIsMetamaskInstalled(true);
      else setIsMetamaskInstalled(false)
    }catch(err){
        setIsMetamaskInstalled(false);
    }

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
    {openPostJob && <PostJobPopup formToOpen='CREATE_DRAFT' setOpenPostJob={setOpenPostJob} />}
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
            {/* <p>Install caduceus to metamask and stake to apply or post web3 jobs </p> */}
            {account.isConnected &&<p>Welcome onboard, Choose what you want to do.</p>}
            <div className={classes.connectBtnContainer}>
                {account.isConnected &&<>
                <button className={classes.dashboardBtn} onClick={()=>navigate('/browse-job')}>BROWSE JOBS</button>
                <button className={classes.dashboardBtn} onClick={()=>setOpenPostJob(true)}>POST JOBS</button>
                </>}
                {!account.isConnected &&<button className={classes.connectWalletBtn} onClick={()=>setOpenMetaPopup(true)}>CONNECT WALLET</button>}
            </div>
            <button className={classes.needCryptoBtn} onClick={()=>window.open('https://www.moonpay.com/buy')}>Need Crypto?</button>
         </section>
    </section>
    <main className={classes.main}>
    <PromotionPane />
    {!isMetaMaskInstalled &&<section className={classes.center}>
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
                   <div className={classes.jobTop}>Latest Jobs</div>
                   <div className={classes.content}>
                      <p>Multiple jobs are uploaded on the blockchain by the hour. <a href='https://metamask.io'>Install metamask</a> to view available jobs</p>
                   </div>
               </li>
               <li>
                   <div className={classes.jobTop}>Popular Jobs</div>
                   <div className={classes.content}>
                      <p>Multiple jobs are uploaded on the blockchain by the hour. <a href='https://metamask.io'>Install metamask</a> to view available jobs</p>
                   </div>
               </li>
          </ul>
      </article>
    </section>}
    <section className={classes.permissionlessContainer}>
      <div className={classes.permissionTop}>
        <p>Reasons why millions of</p>
        <h1>WEB 3 Job Seekers use JobCrypt</h1>
      </div>
      <article className={classes.permissionBoxParent}>
            <div className={classes.tallBox}>
                <img src={permissionless} alt='' className={classes.permissionless} />
                <h2>Permissionless</h2>
                <p>Posting on Jobcrypt is permissionless, Post your job when you want. Only you have access to your listings.</p>
            </div>
            <div className={classes.tallBox}>
                <img src={decentralized} alt='' className={classes.decentralized} />
                <h2>Decentralized</h2>
                <p>Job listings are 100% decentralized, we don't have any secret databases anywhere.</p>
            </div>
            <div className={classes.tallBox}>
                <img src={openIcon} alt='' className={classes.openIcon} />
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
        <SustanabilityWeekEvent />
    </section>
   
    {/* <CalendarEvent /> */}
    {/* <SustanabilityWeekEvent /> */}
    {/* <section className={classes.backedByContainer}>
        <h1>Backed By</h1>
        <span className={classes.framesContainer}>
            <img src={frame9} alt='' />
            <img src={frame10} alt='' />
            <img src={frame11} alt='' />
            <img src={frame12} alt='' />
            <img src={frame13}alt='' />
        </span>
    </section> */}
    <ReadyToStart />
    </main>
    </>
   )
}

export default HomeRoute;