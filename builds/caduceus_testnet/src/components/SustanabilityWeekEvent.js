import { useNavigate } from 'react-router-dom';

import classes from '../styles/components/SustanabilityWeekEvent.module.css';
import ReadyToStart from './ReadyToStart';
import preview from '../assets/ytube_preview.png';
import youtube from '../assets/youtube.png';
import sustain1 from '../assets/sustain1.png';
import sustain2 from '../assets/sustain2.png';
import sustain3 from '../assets/sustain3.png';

const SustanabilityWeekEvent = () =>{
     const navigate = useNavigate();


    return(
        <section className={classes.parent}>
        <span>Sustainability Week Events</span>
           <main className={classes.main}>
               <article>
                <header className={classes.header}>
                    <img src={sustain1} alt='' className={classes.preview} />
                    {/* <img src={preview} alt='' className={classes.preview} />
                    <img src={youtube} alt='' className={classes.youtube} /> */}
                </header>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                    <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                </footer>
               </article>
               <article>
                <header className={classes.header}>
                    <img src={sustain2} alt='' className={classes.preview} />
                    {/* <img src={preview} alt='' className={classes.preview} />
                    <img src={youtube} alt='' className={classes.youtube} /> */}
                </header>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                    <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                </footer>
               </article>
               <article>
                <header className={classes.header}>
                    <img src={sustain3} alt='' className={classes.preview} />
                    {/* <img src={preview} alt='' className={classes.preview} />
                    <img src={youtube} alt='' className={classes.youtube} /> */}
                </header>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                    <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>navigate('/featured-events')}>Learn More</button>
                </footer>
               </article>
           </main>
        {/* <ReadyToStart /> */}
    </section>
    )
}

export default SustanabilityWeekEvent;