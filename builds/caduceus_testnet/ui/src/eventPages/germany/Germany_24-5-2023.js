

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


const Germany_24_5_2023 = () =>{
    const navigate = useNavigate();
    const width = useWindowSize();

    useLayoutEffect(()=>{
        document.getElementById('Germany_24_5_2023').scrollIntoView({ behavior: 'smooth' });
    },[])

    return(
        <section className={classes.parent} id='Germany_24_5_2023'>
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
                            <h1>JobCrypt Münchner Talkreihe - Veranstaltung</h1>
                            <p>(JobCrypt Munich Talk Series - Event)</p>
                        </span>
                        <span>
                            <h1>Einführung in NFTs in Arbeit, Unterhaltung und Sozialem</h1>
                            <p>(Introduction to NFTs in Work, Entertainment and Social)</p>
                        </span>
                    </div>
                </section>
                <p className={classes.content1}>Diese Veranstaltung führt die Teilnehmer in die Grundlagen von Non Fungible Tokens oder kurz NFTs ein. Wir werden einen Blick darauf werfen, wie Anwendungen der NFT-Technologie die Welt der Arbeit, Unterhaltung und sozialen Aktivitäten auf ganzer Linie verändern. Dies wird Ihre Gelegenheit sein, mit Branchenexperten auf diesem Gebiet in Kontakt zu treten und Fragen zu stellen, was auf Lager ist. Wir werden Ihnen im Rahmen unseres auch aufregende dezentrale Apps (dApps) auf Mobilgeräten anbieten Leckere Tüte zum Mitnehmen.</p>

                <p className={classes.content2}>(This event will introduce attendees to the basics of Non Fungible Tokens or NFTs for short. We will take a look at how applications of NFT Technology are changing the world of work, entertainment and social activities across the board. This will be your opportunity to engage with industry professionals in the field and ask questions on what is in store. We will also bring you come exciting decentralized Apps (dApps) on mobile as part of our goody bag of take aways.)</p>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Einzelheiten</h1>
                    <p>(Details)</p>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Wenn?</h1>
                            <p className={classes.para}>(When?)</p>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>24. Mai 2023</h1>
                            <p className={classes.para}>(May 24th 2023)</p>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Wie viel Uhr?</h1>
                            <p className={classes.para}>(What time?)</p>
                        </div>
                        <div className={classes.second}>
                            <h1>17:45 - 21:00 CET Deutsche Zeit</h1>
                            <p className={classes.para}>(German Time)</p>
                        </div>
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first}>
                            <h1 className={classes.h1}>Standort</h1>
                            <p className={classes.para}>(Location?)</p>
                        </div>
                        <div className={classes.second}>
                            <h1 className={classes.h1}>München, Deutschland</h1>
                            <p className={classes.para}>(Munich, Germany)</p>
                        </div>
                     </span>
                </section>
                <span className={classes.EinzelheitenContainer}>
                    <h1>Zeitplan</h1>
                    <p>(Schedule)</p>
                </span>
                <section className={classes.table}>
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            {/* <h1 className={classes.h1}>Wenn?</h1> */}
                            <p className={classes.para}>16:45 - 17:45</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Veranstaltungsort geöffnet</h1>
                            <p className={classes.para}>(Venue Open)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                            <h1 className={classes.h1}>Kostenlose Pizza und Getränke</h1>
                            <p className={classes.para}>(Free Pizza and Drinks)</p>
                        </div>}
                        </div>
                        {width > 770 &&<div className={classes.first2}>
                            <h1 className={classes.h1}>Kostenlose Pizza und Getränke</h1>
                            <p className={classes.para}>(Free Pizza and Drinks)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            {/* <h1 className={classes.h1}>Eisbrecher</h1> */}
                            <p className={classes.para}>17:45 - 17:59</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Eisbrecher</h1>
                            <p className={classes.para}>(Ice Breakers)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Swag-Werbegeschenke und Eisbrecher-Wettbewerbe</h1>
                        <p className={classes.para}>(Swag giveaway and icebreaker competitions)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Swag-Werbegeschenke und Eisbrecher-Wettbewerbe</h1>
                            <p className={classes.para}>(Swag giveaway and icebreaker competitions)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            {/* <h1 className={classes.h1}>Standort</h1> */}
                            <p className={classes.para}>18:00 - 18:10</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Miniwerkstatt</h1>
                            <p className={classes.para}>(Mini-Workshop)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Holen Sie sich Ihre erste oETH & 10.000 USDC im Optimism Kovan Testnet</h1>
                        <p className={classes.para}>(Get your first oETH & $10,000 USDC on Optimism Kovan Testnet)</p>
                        <h1 className={classes.h1} style={{ marginTop: '20px'}}>In dieser Sitzung helfen wir Ihnen, mit dem Optimism Kovan Testnet in die Kette zu kommen.</h1>
                        <p className={classes.para}>(In this session we will help you get on chain with the Optimism Kovan Testnet.)</p>
                    </div>}
                        </div>
                        {width > 770 &&<div className={classes.first2}>
                            <h1 className={classes.h1}>Holen Sie sich Ihre erste oETH & 10.000 USDC im Optimism Kovan Testnet</h1>
                            <p className={classes.para}>(Get your first oETH & $10,000 USDC on Optimism Kovan Testnet)</p>
                            <h1 className={classes.h1} style={{ marginTop: '20px'}}>In dieser Sitzung helfen wir Ihnen, mit dem Optimism Kovan Testnet in die Kette zu kommen.</h1>
                            <p className={classes.para}>(In this session we will help you get on chain with the Optimism Kovan Testnet.)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:10 - 18:40</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Sprechen</h1>
                            <p className={classes.para}>(Talk)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Einführung in Non Fungible Tokens (NFTs) und wie sie funktionieren</h1>
                        <p className={classes.para}>(Introduction to Non Fungible Tokens (NFTs) and how they work)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Einführung in Non Fungible Tokens (NFTs) und wie sie funktionieren</h1>
                            <p className={classes.para}>(Introduction to Non Fungible Tokens (NFTs) and how they work)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />
                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:10 - 18:40</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Die Pause</h1>
                            <p className={classes.para}>(Break)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Ankündigungen</h1>
                        <p className={classes.para}>(Announcements)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Ankündigungen</h1>
                            <p className={classes.para}>(Announcements)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />

                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>18:45 - 19:15</p>
                        </div>
                        <div className={classes.first2}>
                            <h1 className={classes.h1}>Sprechen</h1>
                            <p className={classes.para}>(Talk)</p>
                        {width <= 770 &&<div className={classes.first2} style={{ marginTop: '20px'}}>
                        <h1 className={classes.h1}>Blockchain-Einzigartigkeit am Arbeitsplatz</h1>
                        <p className={classes.para}>(Blockchain uniqueness in the Workplace)</p>
                    </div>}
                        </div>
                        {width > 770 && <div className={classes.first2}>
                            <h1 className={classes.h1}>Blockchain-Einzigartigkeit am Arbeitsplatz</h1>
                            <p className={classes.para}>(Blockchain uniqueness in the Workplace)</p>
                        </div>}
                     </span>
                     <hr className={classes.line} />


                     <span>
                        <div className={classes.first2} style={{ minWidth: '30%'}}>
                            <p className={classes.para}>19:15 - 19:20</p>
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

export default Germany_24_5_2023;