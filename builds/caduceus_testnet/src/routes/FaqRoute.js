

import classes from '../styles/routes/FaqRoute.module.css';
import backArrow from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import ReadyToStart from '../components/ReadyToStart';
import PostJobPopup from '../popups/PostJobPopup';


const FaqRoute = () =>{
    const navigate = useNavigate();
    const [ openPostJob, setOpenPostJob ] = useState(false);

    useLayoutEffect(()=>{
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
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
        <section className={classes.parent} id='faq'>
            {openPostJob && <PostJobPopup formToOpen='CREATE_DRAFT' setOpenPostJob={setOpenPostJob} />}
            <header className={classes.header}>
                <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                <h1>JobCrypt F.A.Q.</h1>
            </header>
            <main className={classes.main}>
                <p style={{ fontSize: '15px', marginTop: '10px' }}>2022/02/13</p>
                <h1>The type of personal information we collect</h1>
                <p>We currently collect and process the following information: Personal identifiers, contacts and characteristics e.g., blockchain wallet address, name and contact details, payment transactions, website usage statistics.</p>
            </main>
            <main className={classes.main}>
                <h1>How do I post a job?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>1</div>
                    <p>To post a job on JobCrypt you need to go to the post page, a short-cut is given <strong style={style} onClick={()=>setOpenPostJob(true)}>here</strong>. There you will need to fill out the listed fields with your job description following the step order. You will also need to pay for your listing using cryptocurrency (e.g. <strong style={style} onClick={()=>openUrl('https://www.coingecko.com/en/coins/usd-coin')}>USDC</strong>) Once your listing has been paid when you click post your listing will appear immediately on the JobCrypt.com site. For a video tutorial of the above click <strong style={style}>here</strong></p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>What happens after I post a job?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>2</div>
                    <p>After you have posted your job on JobCrypt, we will then take your listing and distributed to our community members who match your requirements to help accelerate your recruitment drive.</p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>How do I apply for a job?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>3</div>
                    <p>To apply for a job on JobCrypt, you need to first identify the listing that you are interested in either from the JobCrypt.com homepage or via the search function on the homepage. Be sure you're connected to the Optimism network when you do this. Click the listing title and review your selected listing To apply ensure you have staked <strong style={style} onClick={()=>openUrl('https://www.coingecko.com/en/coins/tether')}>1 USDT</strong> with JobCrypt video instructions can be found <strong style={style}>here</strong> Once you have staked you will be able to click the "APPLY HERE" link on your selected job description. This will reveal the final application details for the role you're interested in. When you have finished all your applications you can simply unstake your <strong style={style} onClick={()=>openUrl('https://www.coingecko.com/en/coins/tether')}>1 USDT</strong>, instructions can be found <strong style={style}>here</strong></p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>How do I fund my wallet?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>4</div>
                    <p>Funding your wallet can be done several ways. The easiest way is to visit an on ramp site like <strong style={style} onClick={()=>openUrl('https://www.moonpay.com/')}>Moonpay</strong> where you can buy cryptocurrency directly and have it sent directly on chain to your wallet. Another alternative is to buy it from an exchange like <strong style={style} onClick={()=>openUrl('https://www.binance.com/en')}>Binance</strong> or <strong style={style} onClick={()=>openUrl('https://www.kucoin.com/')}>Kucoin</strong> and then withdraw to your cryptocurrency wallet. NOTE: JobCrypt is not affiliated with any of the service providers mentioned here.</p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>How do I access my Job Seeker dashboard?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>5</div>
                    <p>To access your Job Seeker dashboard you simply click the JobSeeker link on the homepage in the top right hand corner. For convinience a shortcut has been provided <strong style={style} onClick={()=>navigate('/jobseeker_dashboard')}>here</strong>.</p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>How do I access my Employer dashboard?</h1>
                <span className={classes.span}>
                    <div className={classes.circle}>6</div>
                    <p>To access your Employer dashboard you simply click the Employer link on the home page in the top right hand corner for convinience a shortcut has been provided here <strong style={style} onClick={()=>navigate('/employer_dashboard')}>here</strong></p>
                </span>
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

export default FaqRoute;