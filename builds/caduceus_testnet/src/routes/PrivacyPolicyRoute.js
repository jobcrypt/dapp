

import classes from '../styles/routes/TermsOfServiceRoute.module.css';
import backArrow from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import ReadyToStart from '../components/ReadyToStart';


const PrivacyPolicyRoute = () =>{
    const navigate = useNavigate();


    useLayoutEffect(()=>{
        document.getElementById('policy').scrollIntoView({ behavior: 'smooth' });
    },[]);

    const openUrl = (url) =>{
        let URL = url;
        // if(!url.startsWith('http://' || !url.startsWith('https://'))){
        //     URL = 'https://'+url;
        // }
        window.open(URL)
      }

    const style={
        color: '#be8e24',
        cursor: 'pointer'
    }

    return(
        <section className={classes.parent} id='policy'>
            <header className={classes.header}>
                <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                <h1>JobCrypt Privacy Policy</h1>
            </header>
            <main className={classes.main}>
                <p style={{ fontSize: '15px', marginTop: '10px' }}>2022/02/13</p>
                <h1>The type of personal information we collect</h1>
                <p>We currently collect and process the following information: Personal identifiers, contacts and characteristics e.g., blockchain wallet address, name and contact details, payment transactions, website usage statistics.</p>
            </main>
            <main className={classes.main}>
                <h1>How we get the personal information and why we have it</h1>
                <p>Most of the personal information we process is provided to us directly by you for one of the following reasons: Applying for work, making a job posting, utilising our site We also receive personal information indirectly, from the following sources in the following scenarios: Wallet contents when executing blockchain transactions for security or your making purchases. We use the information that you have given us in order to secure our site and our dApp, support your purchases and use of our site We may share this information with government organisations or designated authorities on legal request. Under the General Data Protection Regulation (GDPR), the lawful bases we rely on for processing this information are:</p>
                <ol className={classes.ul}>
                    <li>Your consent. You are able to remove your consent at any time. You can do this by contacting <strong style={style} onClick={()=>openUrl('https://discord.gg/kDTwvf59')}>Discord</strong></li>
                    <li>We have a contractual obligation.</li>
                    <li>We have a legal obligation.</li>
                    <li>We have a vital interest.</li>
                    <li>We need it to perform a public task.</li>
                    <li>We have a legitimate interest.</li>
                </ol>
            </main>
            <main className={classes.main}>
                <h1>Your data protection rights</h1>
                <ul className={classes.ul}>
                    <li>Your right of access - You have the right to ask us for copies of your personal information.</li>
                    <li>Your right to rectification - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.</li>
                    <li>Your right to erasure - You have the right to ask us to erase your personal information in certain circumstances.</li>
                    <li>Your right to restriction of processing - You have the right to ask us to restrict the processing of your personal information in certain circumstances.</li>
                    <li>Your right to object to processing - You have the the right to object to the processing of your personal information in certain circumstances.</li>
                    <li>Your right to data portability - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.</li>
                    <li>You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.</li>
                    <li>Please contact us on <strong style={style} onClick={()=>openUrl('https://discord.gg/kDTwvf59')}>Discord</strong> if you wish to make a request.</li>
                </ul>
            </main>
            <main className={classes.main}>
                <h1>How to complain</h1>
                <p>If you have any concerns about our use of your personal information, you can make a complaint to us on <strong style={style} onClick={()=>openUrl('https://discord.gg/kDTwvf59')}>Discord</strong></p>
               
                <p>You can also complain to the ICO if you are unhappy with how we have used your data.<br/>
                Our ICO:00012877168<br/> 
                The ICO’s address: Information Commissioner’s Office - Wycliffe House, <br/> 
                Water Lane, Wilmslow, Cheshire, <br/> 
                SK9 5AF, United Kingdom <br/> 
                Helpline number: 0303 123 1113 <br/> 
                ICO Website: <strong style={style} onClick={()=>openUrl('https://www.ico.org.uk')}>https://www.ico.org.uk</strong>
                </p>
            </main>
            {/* <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style} onClick={()=>openUrl('https://docs.google.com/forms/d/e/1FAIpQLSf79sYKcwAyIHhjGKp0zQyVL4zYgHtJRJ_NWANyIibnHzlsPg/viewform')}>here</strong></span>
                </div>
            </article> */}
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

export default PrivacyPolicyRoute;