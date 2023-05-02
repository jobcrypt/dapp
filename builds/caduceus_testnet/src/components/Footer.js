import { useNavigate } from 'react-router-dom';


import classes from '../styles/components/Footer.module.css';
import logo from '../assets/apple.png';
import youtube from '../assets/youtube.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import discord from '../assets/discord.png';
import twitter from '../assets/twitter.png';
// import youtube from '../assets/youtube.png';

const Footer = () =>{
    const navigate = useNavigate();

    const navigateToPath = (path, where=null)=>{
        console.log(where)
        navigate(path, { state: { scroll: where}});
    }

    const openUrl = (url) =>{
        window.open(url)
    }

    return(
        <footer className={classes.footer}>
            <section className={classes.firstSection}>
                <div className={classes.firstBox}>
                    <img src={logo} alt='' />
                    <span className={classes.socialIconContainer}>
                        <img src={instagram} alt='' className={classes.instagram} onClick={()=>openUrl('https://instagram.com/jobcrypt?igshid=YmMyMTA2M2Y=')} />
                        <img src={facebook} alt='' className={classes.facebook} onClick={()=>openUrl('https://www.facebook.com/profile.php?id=100086242797183&mibextid=ZbWKwL')} />
                        <img src={twitter} alt='' className={classes.twitter} onClick={()=>openUrl('https://twitter.com/JobCrypt?t=lKJ39e8sY9Q2FTktDoQw_g&s=09')} />
                        <img src={youtube} alt='' className={classes.youtube} onClick={()=>openUrl('https://youtube.com/@jobcrypt6750')} />
                        <img src={discord} alt='' className={classes.discord} onClick={()=>openUrl('https://discord.gg/kDTwvf59')} />
                    </span>
                </div>
                <div className={classes.secBox}>
                    <h2>Quick Links</h2>
                    {/* <p onClick={()=>openUrl('https://www.eventbrite.com/cc/jobcrypt-blockchain-sustainability-week-uk-2023-2015709?utm_source=LinkedIn&utm_medium=link&utm_campaign=Q2')}>Programmes</p> */}
                    <p onClick={()=>navigate('/featured-events', 'featured-events')}>Events</p>
                    <p onClick={()=>navigate('/faq')}>FAQS</p>
                </div>
                <div className={classes.secBox}>
                    <h2>Terms & Policy</h2>
                    <p onClick={()=>navigate('/cookie-policy')}>Cookie Policy</p>
                    <p onClick={()=>navigate('/terms-of-service')}>Terms of Service</p>
                    <p onClick={()=>navigate('/privacy-policy')}>Privacy Policy</p>
                </div>
                <div className={classes.secBox}>
                    <h2>Contact</h2>
                    <p onClick={()=>window.open('mailto:contact@jobcrypt.com')}>Contact Us</p>
                    <p onClick={()=>navigateToPath('/about', 'about' )}>About Us</p>
                </div>
            </section>
            <section className={classes.copyrightContainer}>
                <p>&copy; Copyright 2023 <strong style={{ color: '#be8e24'}}>JobCrypt. </strong> All rights reserved</p>
            </section>
        </footer>
    )
}

export default Footer;