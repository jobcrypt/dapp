

import classes from '../styles/routes/CookiePolicyRoute.module.css';
import backArrow from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import ReadyToStart from '../components/ReadyToStart';


const CookiePolicyRoute = () =>{
    const navigate = useNavigate();


    useLayoutEffect(()=>{
        document.getElementById('cookie').scrollIntoView({ behavior: 'smooth' });
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
        <section className={classes.parent} id='cookie'>
            <header className={classes.header}>
                <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                <h1>JobCrypt Cookie Policy</h1>
            </header>
            <main className={classes.main}>
                <h1>What are cookies</h1>
                <p>Cookies are small text files containing a string of characters that can be placed on your computer or mobile device that uniquely identify your browser or device. What are cookies used for?Cookies allow a site or services to know if your computer or device has visited that site or service before. Cookies can then be used to help understand how the site or service is being used, help you navigate between pages efficiently, help remember your preferences, and generally improve your browsing experience. Cookies can also help ensure marketing you see online is more relevant to you and your interests.</p>
            </main>
            <main className={classes.main}>
                <h1>What types of cookies does JobCrypt use?</h1>
                <p>There are generally four categories of cookies: “Strictly Necessary,” “Performance,” “Functionality,” and “Targeting.” JobCrypt routinely uses all four categories of cookies on the Service. You can find out more about each cookie category below.</p>
                <span className={classes.span}>
                    <div className={classes.circle}>1</div>
                    <p>Strictly Necessary Cookies. These cookies are essential, as they enable you to move around the Service and use its features, such as accessing logged in or secure areas.</p>
                </span>
                <span className={classes.span}>
                    <div className={classes.circle}>2</div>
                    <p>Performance Cookies. These cookies collect information about how you have used the Service, for example, information related to the unique username you have provided, so that less strain is placed on our backend infrastructure. These cookies may also be used to allow us to know that you have logged in so that we can serve you fresher content than a user who has never logged in. We also use cookies to track aggregate Service usage and experiment with new features and changes on the Service. The information collected is used to improve how the Service works.</p>
                </span>
                <span className={classes.span}>
                    <div className={classes.circle}>3</div>
                    <p>Functionality Cookies. These cookies allow us to remember how you’re logged in, whether you chose to no longer see advertisements, whether you made an edit to an article on the Service while logged out, when you logged in or out, the state or history of Service tools you’ve used. These cookies also allow us to tailor the Service to provide enhanced features and content for you and to remember how you’ve customized the Service in other ways, such as customizing the toolbars we offer in the right column of every page. The information these cookies collect may be anonymous, and they are not used to track your browsing activity on other sites or services.</p>
                </span>
                <span className={classes.span}>
                    <div className={classes.circle}>4</div>
                    <p>Targeting Cookies. JobCrypt, our advertising partners or other third party partners may use these types of cookies to deliver advertising that is relevant to your interests. These cookies can remember that your device has visited a site or service, and may also be able to track your device’s browsing activity on other sites or services other than JobCrypt. This information may be shared with organizations outside JobCrypt, such as advertisers and/or advertising networks to deliver the advertising, and to help measure the effectiveness of an advertising campaign, or other business partners for the purpose of providing aggregate Service usage statistics and aggregate Service testing.</p>
                </span>
            </main>
            <main className={classes.main}>
                <h1>How long will cookies stay on my device?</h1>
                <p>The length of time a cookie will stay on your computer or mobile device depends on whether it is a “persistent” or “session” cookie. Session cookies will only stay on your device until you stop browsing. Persistent cookies stay on your computer or mobile device until they expire or are deleted.</p>
            </main>
            <main className={classes.main}>
                <h1>First and third party cookies</h1>
                <p>If you want to delete cookies follow the instructions at <strong style={style} onClick={()=>openUrl('http://www.wikihow.com/Clear-Your-Browser%27s-Cookies')}>http://www.wikihow.com/Clear-Your-Browser%27s-Cookies</strong>.<br/><br/>
                If you wish to disable your browser from receiving cookies follow the instructions at <strong style={style} onClick={()=>openUrl('http://www.wikihow.com/Disable-Cookies')}>http://www.wikihow.com/Disable-Cookies</strong>.<br/><br/>
                Note that if you set your browser to disable cookies, you may not be able to access certain parts of our Service and other parts of our Service may not work properly.<br/><br/>
                You can find out more information cookie settings at third-party information sites, such as <strong style={style} onClick={()=>openUrl('www.allaboutcookies.org')}>www.allaboutcookies.org</strong>
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

export default CookiePolicyRoute;