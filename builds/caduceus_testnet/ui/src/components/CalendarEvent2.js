

import classes from '../styles/components/CalendarEvent2.module.css';
import germanyIcon from '../assets/germany.png';
import ukIcon from '../assets/uk.png';
import locationIcon from '../assets/location.png';
import bubbleIcon from '../assets/bubble.png';
import crown from '../assets/crown.png';
import eventTimeIcon from '../assets/event_time.png';
import eventCalendarIcon from '../assets/event_calendar.png';
import eventLocationIcon from '../assets/event_location.png';
import chargeIcon from '../assets/charge.png';
import jobCrypt from '../assets/circle_jobcrypt.png';
import cloudIcon from '../assets/cloud.png';
import { useNavigate } from 'react-router-dom';


const CalendarEvent2 = () =>{
    const navigate = useNavigate();


    return(
        <section className={classes.parent}>
            <main className={classes.main}>
            <div>
               <h1 className={classes.title}>JobCrypt Events Calendar</h1>
               <span className={classes.cloudContainer}>
                {/* <img src={cloudIcon} alt='' /> */}
                <p><strong>View Past Events</strong></p>
               </span>
            </div>

            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card} onClick={()=>navigate('/events/germany/Germany_24_5_2023')}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Einführung in Blockchain NFTs in Arbeit, Unterhaltung und Sozialem</p>
                            <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 24th May, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card} onClick={()=>navigate('/events/uk/Uk_25_4_2023')}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>UK Powered Sustainability Using Blockchain</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 25th April, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card} onClick={()=>window.open('https://www.jobcrypt.com/blockchainsustainabilityweekeu2023/index.html')}>
                         <span className={classes.countrySpan}>
                             <img src={jobCrypt} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Blockchain Sustainability Week EU 2023</h2>
                            <p className={classes.text1}>Kommen Sie und erfahren Sie, wie Blockchain den Kampf gegen den Klimawandel, die Ziele für nachhaltige Entwicklung und mehr verändert...</p>
                            <p className={classes.text2}>(Come and learn how blockchain is changing the climate battle, Sustainable Development Goals and more...)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Monday 5th to Friday 9th June, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2 Daily</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={chargeIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card} onClick={()=>navigate('/events/uk/april_25_wednesday')}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Coronation NFT Airdrop</h2>
                            <p className={classes.text1}>Join us online on discord as we Celebrate the ascension of King Charles of the United Kingdom. We will be doing an airdrop of not just NFTs!</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Online, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Monday 8th May, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Der Blockchain-Sound</p>
                            <p className={classes.text2}>(The Blockchain Sound)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 19th July, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Introduction to DAOs in Sustainability</h2>
                            <p className={classes.text1}>Join us online for a look at Decentralized Autonomous Organisations that are changing the landscape of Sustainability</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Online, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 11th MAY, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>

            <section className={classes.calendarParent}>
                <span>
                <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Blockchain-Karrieren in der Musik</p>
                            <p className={classes.text2}>(Blockchain Careers in Music)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>Online, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 10th August, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card} onClick={()=>window.open('https://www.jobcrypt.com/blockchainsustainabilityweekuk2023/index.html')}>
                         <span className={classes.countrySpan}>
                             <img src={jobCrypt} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt - Blockchain Sustainability Week - UK 2023 part of Great Big Green Week</h2>
                            <p className={classes.text1}>Join us in Liverpool for an amazing celebration of the efforts being undertaken to save our planet and our future using blockchain.</p>
                            {/* <p className={classes.text2}>(Come and learn how blockchain is changing the climate battle, Sustainable Development Goals and more...)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Monday 12th to Friday 16th June, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1 Daily</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={chargeIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>

            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Grillen im Sommer (Summer BBQ)</h2>
                            <p className={classes.text1}>Feiern Sie mit uns in München den europäischen Sommer</p>
                            <p className={classes.text2}>(Join us in Munich for a celebration of the European summer)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Saturday 26th August, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                        <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Blockchain in Health</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>Online, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 6th July, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            <section className={classes.calendarParent}>
                <span>
                <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Fahren mit Blockchain – wie Blockchain die Automobilindustrie verändert</p>
                            <p className={classes.text2}>(Driving with Blockchain - how blockchain is changing the automotive industry)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 20th September, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Summer BBQ</h2>
                            <p className={classes.text1}>Join us in Liverpool for an exciting celebration of the Summer!</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Saturday 5th August, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>

            <section className={classes.calendarParent}>
                <span>
                <div className={classes.card}>
                    <span className={classes.countrySpan}>
                        <img src={germanyIcon} alt='' />
                    </span>
                    <section className={classes.countrySection}>
                    <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                    <p className={classes.text1}>Blockchain am Tisch – Auswirkungen der Blockchain auf die Lebensmittelindustrie</p>
                    <p className={classes.text2}>(Blockchain at the table - blockchain's impact on the food industry)</p>
                    <section className={classes.bottomSection}>
                        <div className={classes.descContainer}>
                            <div>
                                <img src={eventLocationIcon} alt=''  />
                                <p>Online, Germany</p>
                            </div>
                            <div>
                                <img src={eventCalendarIcon} alt='' />
                                <p>Thursday 5th October, 2023</p>
                            </div>
                            <div>
                                <img src={eventTimeIcon} alt='' />
                                <p>17:45 - 21:00 GMT +2</p>
                            </div>
                        </div>
                        <span className={classes.crownIconContainer}>
                            <img src={crown} alt='' className={classes.crownImage} />
                        </span>
                    </section>
                    </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Blockchain in Gaming</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 23rd August, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>

            <section className={classes.calendarParent}>
                <span>
                <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Community OktoberFest</h2>
                            <p className={classes.text1}>Begleiten Sie uns auf einen aufregenden Nachmittag mit Bier, Freunden, Spaß und ein bisschen Blockchain, nur ein bisschen.</p>
                            <p className={classes.text2}>(Join us for an exciting afternoon of beer, friends, fun and a bit of blockchain, just a bit.)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Saturday 7th October, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +2</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Briniging blockchain into the home - a look at blockchain and IoT</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Online, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 7th September, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>

            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Blockchain Educated - Blockchain verändert die Art und Weise, wie wir lernen</p>
                            <p className={classes.text2}>(Blockchain Educated - Blockchain Changing the Way We Learn)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Wednesday 22nd November, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Blockchain at Sea - how blockchain is changing sailing and shipping</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p> Wednesday 25th October, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            <section className={classes.calendarParent}>
                <span>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={germanyIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Community Weihnachtsfeier (Christmas Party)</h2>
                            <p className={classes.text1}>Schließen Sie sich uns an, wenn wir uns von 2023 verabschieden und Blockchain-Highlights und neue Freunde feiern</p>
                            <p className={classes.text2}>(Join us as we bid goodbye to 2023, celebrating blockchain highlights and new friends)</p>
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt=''  />
                                        <p>München, Germany</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 14th December, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT +1</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={crown} alt='' className={classes.crownImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>JobCrypt Guy Fawkes Vigil</h2>
                            <p className={classes.text1}>Guy Fawkes Vigil - discussions on democracy and blockchain</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Saturday 4th November, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>18:45 - 01:00 GMT</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            <section className={classes.calendarParent}>
                <span>
                <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain & Web3 Talk</h2>
                            <p className={classes.text1}>Making the transition - changing career from Digital to Web3</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Online, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 9th November, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                    <div className={classes.card}>
                         <span className={classes.countrySpan}>
                             <img src={ukIcon} alt='' />
                         </span>
                         <section className={classes.countrySection}>
                            <h2 className={classes.blockTalk}>Blockchain Community Christmas Party</h2>
                            <p className={classes.text1}>Join us in closing out 2023 with highlights from the year and festive Cheer!</p>
                            {/* <p className={classes.text2}>(Introduction to Blockchain NFTs in Work, Entertainment and Social)</p> */}
                            <section className={classes.bottomSection}>
                                <div className={classes.descContainer}>
                                    <div>
                                        <img src={eventLocationIcon} alt='' />
                                        <p>Liverpool, United Kingdom</p>
                                    </div>
                                    <div>
                                        <img src={eventCalendarIcon} alt='' />
                                        <p>Thursday 7th December, 2023</p>
                                    </div>
                                    <div>
                                        <img src={eventTimeIcon} alt='' />
                                        <p>17:45 - 21:00 GMT</p>
                                    </div>
                                </div>
                                <span className={classes.crownIconContainer}>
                                    <img src={bubbleIcon} alt='' className={classes.bubbleImage} />
                                </span>
                            </section>
                         </section>
                    </div>
                </span>
            </section>
            {/* <footer className={classes.footer}>
                View More
            </footer> */}
            </main>
        </section>
    )
}

export default CalendarEvent2;