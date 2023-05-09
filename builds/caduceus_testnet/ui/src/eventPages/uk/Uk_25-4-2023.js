

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


const Uk_25_4_2023 = () =>{
    const navigate = useNavigate();
    const width = useWindowSize();


    useLayoutEffect(()=>{
        document.getElementById('Uk_25_4_2023').scrollIntoView({ behavior: 'smooth' });
    },[])


    return(
        <section className={classes.parent} id='Uk_25_4_2023'>
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
                            <h1>UK sustainability powered by Blockchain</h1>
                            {/* <p>(JobCrypt Munich Talk Series - Event)</p> */}
                        </span>
                        {/* <span>
                            <h1>Einführung in NFTs in Arbeit, Unterhaltung und Sozialem</h1>
                            <p>(Introduction to NFTs in Work, Entertainment and Social)</p>
                        </span> */}
                    </div>
                </section>
                <p className={classes.content1}>This event will introduce attendees to the basics of Sustainability and how it is being powered by Blockchain in the United Kingdom. It will be your opportunity ask questions and gain answers on the foundations of the new Green Revolution with some insights on how you can get involved. We will also be working in small with the Filecoin blockchain and sending decentralized letters to tomorrow which have some exciting features. If you're early you might get some free crypto. If not fear not we have more SWAG to give away through the course of the evening, so do join us.</p>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Date</h1>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>When</h1>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>April 25th 2023</h1>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>What time</h1>
                        </div>
                        <div className={classes.second}>
                            <h1>17:45 - 21:00 GMT +1 (UK Time)</h1>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Location</h1>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>The Quaker Meeting House, 22 School Lane, Liverpool, L1 3BT</h1>
                        </div>
                     </span>
                </section>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Schedule</h1>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            {/* <h1 className={classes.h1}>Wenn?</h1> */}
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
                            {/* <h1 className={classes.h1}>Eisbrecher</h1> */}
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
                        <h1 className={classes.h1}>Introduction to Non Fungible Tokens (NFTs) and how they work</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Introduction to Non Fungible Tokens (NFTs) and how they work</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:10 - 18:40</p>
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
                        <h1 className={classes.h1}>Blockchain uniqueness in the Workplace</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Blockchain uniqueness in the Workplace</h1>
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
                        <h1 className={classes.h1}>Break</h1>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Break</h1>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:20 - 19:50</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Sprechen</h1>
                            <p className={classes.para}>(Talk)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Unterhaltungswelt im Wandel</h1>
                        <p className={classes.para}>(Changing world of entertainment)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Unterhaltungswelt im Wandel</h1>
                            <p className={classes.para}>(Changing world of entertainment)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:50 - 19:55</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Brechen</h1>
                            <p className={classes.para}>(Break)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Die Pause</h1>
                        <p className={classes.para}>(Break)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Die Pause</h1>
                            <p className={classes.para}>(Break)</p>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:55 - 20:25</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Sprechen</h1>
                            <p className={classes.para}>(Talk)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Freunde finden NFTs für Gutes und Soziales</h1>
                        <p className={classes.para}>(Making friends NFTs for doing good and social)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Freunde finden NFTs für Gutes und Soziales</h1>
                            <p className={classes.para}>(Making friends NFTs for doing good and social)</p>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>20:25 - 20:30</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Einpacken</h1>
                            <p className={classes.para}>(Wrap up)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Danke und Applaus</h1>
                        <p className={classes.para}>(Thanks and Applause)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Danke und Applaus</h1>
                            <p className={classes.para}>(Thanks and Applause)</p>
                        </div>}
                     </span>

                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>20:30 - 21:00</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Vernetzung</h1>
                            <p className={classes.para}>(Networking)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Treffen Sie die Sprecher</h1>
                        <p className={classes.para}>(Meet the Speakers)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Treffen Sie die Sprecher</h1>
                            <p className={classes.para}>(Meet the Speakers)</p>
                        </div>}
                     </span>
                </section>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Eintrittskarten</h1>
                            <p className={classes.para}>(Tickets)</p>
                        </div>
                        <div className={classes.second}>
                            <button className={classes.redBlueButton}>Klicken Sie Hier</button>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Tritt unserem Discord bei</h1>
                            <p className={classes.para}>(Join our discord)</p>
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

export default Uk_25_4_2023;