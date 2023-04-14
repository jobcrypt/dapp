
import classes from '../styles/components/Footer.module.css';
import logo from '../assets/logo.png';
import youtube from '../assets/youtube.png';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import discord from '../assets/discord.png';
import twitter from '../assets/twitter.png';
// import youtube from '../assets/youtube.png';

const Footer = () =>{
    console.log('footer rendered')
    return(
        <footer className={classes.footer}>
            <section className={classes.firstSection}>
                <div className={classes.firstBox}>
                    <img src={logo} alt='' />
                    <span className={classes.socialIconContainer}>
                        <img src={instagram} alt='' className={classes.instagram} />
                        <img src={facebook} alt='' className={classes.facebook} />
                        <img src={twitter} alt='' className={classes.twitter} />
                        <img src={youtube} alt='' className={classes.youtube} />
                        <img src={discord} alt='' className={classes.discord} />
                    </span>
                </div>
                <div className={classes.secBox}>
                    <h2>Quick Links</h2>
                    <p>Programmes</p>
                    <p>Events</p>
                    <p>FAQS</p>
                </div>
                <div className={classes.secBox}>
                    <h2>Contact</h2>
                    <p>Contact Us</p>
                    <p>About Us</p>
                </div>
            </section>
            <section className={classes.copyrightContainer}>
                <p>&copy; Copyright 2023 <strong style={{ color: '#be8e24'}}>JobCrypt. </strong> All rights reserved</p>
            </section>
        </footer>
    )
}

export default Footer;