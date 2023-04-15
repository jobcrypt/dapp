
import classes from '../styles/components/CalendarEvent.module.css';
import ReadyToStart from './ReadyToStart';
import germanyIcon from '../assets/germany.png';
import ukIcon from '../assets/uk.png';
import groupIcon from '../assets/group.png';
import wifiIcon from '../assets/wifi.png';
import locationIcon from '../assets/location.png';
import frame9 from '../assets/Frame9.png';
import frame10 from '../assets/Frame10.png';
import frame11 from '../assets/Frame11.png';
import frame12 from '../assets/Frame12.png';
import frame13 from '../assets/Frame13.png';

const CalendarEvent = () =>{
    return(
        <section className={classes.calendarParent}>
        <span>2023 Event Calendar</span>
        <article className={classes.calendarArticle}>
           <div>
                <header className={classes.eventHeader}>
                    <img src={germanyIcon} alt='' />
                    <p>Germany</p>
                </header>
                <ul className={classes.calendarList}>
                    {new Array(5).fill().map((item, idx)=>(
                            <li key={idx} style={idx % 2 === 0? { backgroundColor: 'rgb(2, 75, 2)' } : {backgroundColor: 'rgb(122, 4, 4)' }}>
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
                                <header><b>Janurary</b> | Wednesday 25th, 2023</header>
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
        <article className={classes.backedByContainer}>
            <span>Backed By</span>
            <div className={classes.frameContainer}>
                <img src={frame9} alt='' />
                <img src={frame10} alt='' />
                <img src={frame11} alt='' />
                <img src={frame12} alt='' />
                <img src={frame13} alt='' />
            </div>
        </article>
        <ReadyToStart />
    </section>
    )
}

export default CalendarEvent;