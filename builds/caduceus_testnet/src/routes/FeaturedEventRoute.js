import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import classes from '../styles/routes/FeaturedEventRoute.module.css';
import backArrow from '../assets/back.png';
import ReadyToStart from '../components/ReadyToStart';
import germanyIcon from '../assets/germany.png';
import ukIcon from '../assets/uk.png';
import groupIcon from '../assets/group.png';
import wifiIcon from '../assets/wifi.png';
import locationIcon from '../assets/location.png';
import SustanabilityWeekEvent from '../components/SustanabilityWeekEvent';
import useWindowSize from '../hooks/useWindowSize';
import ReactPlayer from 'react-player';

const FeaturedEventRoute = () =>{
    const navigate = useNavigate();
    const width = useWindowSize();


    useEffect(()=>{
        document.getElementById('parent').scrollIntoView({ behavior: "smooth" });
  },[]);


    const style={
        color: '#be8e24'
    }
    return(
        <section className={classes.parent} id='parent'>
            <article className={classes.firstContainer}>
                <div>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                    </span>
                    <p className={classes.title}>Featured Events</p>
                </div>
                <h1>Check out our upcoming featured events.</h1>
                <p className={classes.content}>Our events help us to connect to you where your are, bringing the best in blockchain and web3 education to your city</p>
            </article>
            {width <= 770 &&<article className={classes.sustainibilityParent}>
               <SustanabilityWeekEvent />
            </article>}
            {width > 770 &&
              <main className={classes.main}>
                    <article className={classes.sustainibilityParent}>
                    <div className={classes.sustainabilityDiv}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                        <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                        <footer className={classes.footer}>
                            <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                        </footer>
                    </div>
                    <div className={classes.videoContainer}>
                        <span>
                        <ReactPlayer url={'https://youtu.be/7T-NvwciBJM'} style={{ minHeight: '100%', minWidth: '100%', height: '100%'}} controls/>
                        </span>
                    </div>
                    </article>
                    <article className={classes.sustainibilityParent}>
                        <div className={classes.sustainabilityDiv}>
                        <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                        <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                        <footer className={classes.footer}>
                            <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                        </footer>
                        </div>
                <div className={classes.videoContainer}>
                    <span>
                    <ReactPlayer url={'https://youtu.be/5HO6IeBqACs'} style={{ minHeight: '100%', minWidth: '100%', height: '100%'}} controls />
                    </span>
                </div>
                </article>
                <article className={classes.sustainibilityParent}>
                        <div className={classes.sustainabilityDiv}>
                        <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                        <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                        <footer className={classes.footer}>
                            <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                        </footer>
                        </div>
                <div className={classes.videoContainer}>
                    <span>
                    <ReactPlayer url={'https://youtu.be/JayvCQsVAEo'} style={{ minHeight: '100%', minWidth: '100%', height: '100%'}} controls />
                    </span>
                </div>
                </article>
         </main>
            }
            <article className={classes.secondContainer}>
                <h1>2023 Events Calendar.</h1>
            <section className={classes.calendarParent}>
        <article className={classes.calendarArticle}>
           <div>
                <header className={classes.eventHeader}>
                    <img src={germanyIcon} alt='' />
                    <p>Germany</p>
                </header>
                <ul className={classes.calendarList}>
                    {new Array(5).fill().map((item, idx)=>(
                            <li style={idx % 2 === 0? { backgroundColor: 'rgb(2, 75, 2)' } : {backgroundColor: 'rgb(122, 4, 4)' }}>
                            <span className={classes.firstSpan}>
                                <header><b>Janurary</b>&nbsp;|&nbsp;Wednesday 25th, 2023</header>
                                <section>
                                    <span className={classes.iconGroupContainer}>
                                        <img src={idx%2===0? groupIcon : wifiIcon} alt='' />
                                    </span>
                                    <span className={classes.titleGroupContainer}>
                                            <h2>Blockchain & Web3 Talk</h2>
                                            <div className={classes.blockContainer}>
                                                <img src={locationIcon} alt='' />
                                                <p>Online, Germany</p>
                                            </div>
                                    </span>
                                </section>
                            </span>
                            <span className={classes.secondSpan}>
                                17:45<br/><br/>To<br/><br/>21:00<br/><br/>GMT+1
                            </span>
                            </li>
                    ))}
                   
                </ul>
                <footer className={classes.eventFooter}>View More</footer>
           </div>
           <div>
           <header className={classes.eventHeader}>
                    <img src={ukIcon} alt='' />
                    <p>United Kingdom</p>
                </header>
                <ul className={classes.calendarList}>
                    {new Array(5).fill().map((item, idx)=>(
                            <li style={idx % 2 === 0? { backgroundColor: 'rgb(2, 75, 2)' } : {backgroundColor: 'rgb(122, 4, 4)' }}>
                            <span className={classes.firstSpan}>
                            <header><b>Janurary</b>&nbsp;|&nbsp;Wednesday 25th, 2023</header>
                                <section>
                                    <span className={classes.iconGroupContainer}>
                                            <img src={idx%2===0? groupIcon : wifiIcon} alt='' />
                                    </span>
                                    <span className={classes.titleGroupContainer}>
                                            <h2>Blockchain & Web3 Talk</h2>
                                            <div className={classes.blockContainer}>
                                                <img src={locationIcon} alt='' />
                                                <p>Online, Uk</p>
                                            </div>
                                    </span>
                                </section>
                            </span>
                            <span className={classes.secondSpan}>
                                17:45<br/><br/>To<br/><br/>21:00<br/><br/>GMT+1
                            </span>
                            </li>
                    ))}
                   
                </ul>
                <footer className={classes.eventFooter}>View More</footer>
           </div>
        </article>
        <article className={classes.contactUsContainer}>
            <h1>Contact</h1>
            <p>For partnerships or more information about JobCrypt, Contact us on our <strong style={style}>Discord</strong> or <strong style={style}>Email</strong> us</p>
        </article>
        <ReadyToStart />
    </section>
            </article>
        </section>
    )
}

export default FeaturedEventRoute;