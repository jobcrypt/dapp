

import { useNavigate } from 'react-router-dom';
import ReadyToStart from '../../components/ReadyToStart';
import classes from '../../styles/eventPages/Events.module.css';
import backArrow from '../../assets/back.png';
import ukIcon from '../../assets/uk.png';
import germanyIcon from '../../assets/germany.png';
import eventTimeIcon from '../../assets/event_time.png';
import eventCalendarIcon from '../../assets/event_calendar.png';
import eventLocationIcon from '../../assets/event_location.png';
import discord from '../../assets/discord.png';
import useWindowSize from '../../hooks/useWindowSize';
import { useLayoutEffect } from 'react';


const May_8_Monday = () =>{
    const navigate = useNavigate();
    const width = useWindowSize();

    useLayoutEffect(()=>{
        document.getElementById('may8monday').scrollIntoView({ behavior: 'smooth' });
    },[])

    return(
        <section className={classes.parent} id='may8monday'>
            <article className={classes.firstContainer}>
                <div>
                    <span className={classes.pointerContainer}>
                        <img src={backArrow} alt='' onClick={()=>navigate('/featured-events')} />
                    </span>
                    <section className={classes.topEventsContainer}>
                        <div className={classes.smallCard}>
                            <span className={classes.countryContainer}>
                                <img src={ukIcon} alt='' />
                            </span>
                            <div className={classes.eventsDetailContainer}>
                                <p className={classes.eventTitle}>UK Coronation NFT Airdrop</p>
                                <span className={classes.locationContainer}>
                                    <img src={eventLocationIcon} alt='' />
                                    <p>Online | UK</p>
                                </span>
                                <span className={classes.locationContainer}>
                                    <img src={eventCalendarIcon} alt='' />
                                    <p>8th May 2023</p>
                                </span>
                            </div>
                        </div>
                        <div className={classes.smallCard}>
                            <span className={classes.countryContainer}>
                                <img src={ukIcon} alt='' />
                            </span>
                            <div className={classes.eventsDetailContainer}>
                                <p className={classes.eventTitle}>Introduction to DAOs in sustainability</p>
                                <span className={classes.locationContainer}>
                                    <img src={eventLocationIcon} alt='' />
                                    <p>Online | UK</p>
                                </span>
                                <span className={classes.locationContainer}>
                                    <img src={eventCalendarIcon} alt='' />
                                    <p>11th May 2023</p>
                                </span>
                            </div>
                        </div>
                        <div className={classes.smallCard}>
                            <span className={classes.countryContainer}>
                                <img src={ukIcon} alt='' />
                            </span>
                            <div className={classes.eventsDetailContainer}>
                                <p className={classes.eventTitle}>Introduction to Blockchain NFTs in work, entertainment and socials</p>
                                <span className={classes.locationContainer}>
                                    <img src={eventLocationIcon} alt='' />
                                    <p>Munich | Germany</p>
                                </span>
                                <span className={classes.locationContainer}>
                                    <img src={eventCalendarIcon} alt='' />
                                    <p>24th May 2023</p>
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
            <article className={classes.secondContainer}>
                <section className={classes.boxTitle}>
                    <div className={classes.boxInside}>
                        <span>
                            <h1>JobCrypt Munich Talk Series - Event</h1>
                        </span>
                        <span>
                            <h1>Introduction to NFTs in Work, Entertainment and Social</h1>
                        </span>
                    </div>
                </section>
                <p className={classes.content1}>This event will introduce attendees to the basics of Sustainability and how it is being powered by Blockchain in the United Kingdom. It will be your opportunity ask questions and gain answers on the foundations of the new Green Revolution with some insights on how you can get involved. We will also be working in small with the Filecoin blockchain and sending decentralized letters to tomorrow which have some exciting features. If you're early you might get some free crypto. If not fear not we have more SWAG to give away through the course of the evening, so do join us.</p>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Details</h1>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>When?</h1>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>May 24th 2023</h1>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>What time?</h1>
                        </div>
                        <div className={classes.second}>
                            <h1>German Time</h1>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Location</h1>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>Munich, Germany</h1>
                        </div>
                     </span>
                </section>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Schedule</h1>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>16:45 - 17:45</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Venue Open</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                            <h1 className={classes.h1}>Free Pizza and Drinks</h1>
                        </div>}
                        </div>
                        {width > 770 &&<div className={classes.first2}>
                            <h1 className={classes.h1}>Free Pizza and Drinks</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>17:45 - 17:59</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Ice Breakers</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Swag giveaway and icebreaker competitions</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Swag giveaway and icebreaker competitions</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            {/* <h1 className={classes.h1}>Standort</h1> */}
                            <p className={classes.para}>18:00 - 18:10</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Mini-Workshop</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Get your first oETH & $10,000 USDC on Optimism Kovan Testnet</h1>
                        <h1 className={classes.h1} style={{ marginTop: '20px'}}>In this session we will help you get on chain with the Optimism Kovan Testnet.</h1>
                    </div>}
                        </div>
                        {width > 770 &&<div className={classes.first2}>
                            <h1 className={classes.h1}>Get your first oETH & $10,000 USDC on Optimism Kovan Testnet</h1>
                            <h1 className={classes.h1} style={{ marginTop: '20px'}}>In this session we will help you get on chain with the Optimism Kovan Testnet.</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:10 - 18:40</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Talk</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>TBC</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>TBC</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:40 - 18:45</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Break</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Announcements</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Announcements</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:45 - 19:15</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Talk</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>TBC</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>TBC</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:15 - 19:20</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Break</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Spend your money</h1>
                        <h1 className={classes.h1} style={{ marginTop: '20px'}}>In this session we will put you on to some testnet services that will give you ways to spend your testnet funds</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Spend your money</h1>
                            <h1 className={classes.h1} style={{ marginTop: '20px'}}>In this session we will put you on to some testnet services that will give you ways to spend your testnet funds</h1>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:20 - 19:50</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Talk</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>TBC</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>TBC</h1>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:20 - 19:50</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Panel</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>TBC</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>TBC</h1>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>20:15 - 20:20</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Mini-Workshop</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Upcoming Web3 Roles on JobCrypt</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Upcoming Web3 Roles on JobCrypt</h1>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>20:20 - 20:25</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Wrap-up</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Thanks and Applause</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                           <h1 className={classes.h1}>Thanks and Applause</h1>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>20:25 - 21:00</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Networking</h1>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Meet the Speakers</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Meet the Speakers</h1>
                        </div>}
                     </span>
                </section>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Tickets</h1>
                        </div>
                        <div className={classes.second}>
                            <button className={classes.redBlueButton}>Klicken Sie Hier</button>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Join our discord</h1>
                        </div>
                        <div className={classes.second}>
                        <button className={classes.redBlueButton}>
                            <img src={discord} alt='' />
                            Klicken Sie Hier</button>
                        </div>
                     </span>
                </section>
            </article>
        <ReadyToStart />
        </section>
    )
}

export default May_8_Monday;