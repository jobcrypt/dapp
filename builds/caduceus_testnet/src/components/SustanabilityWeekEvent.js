import { useNavigate } from 'react-router-dom';

import classes from '../styles/components/SustanabilityWeekEvent.module.css';
import ReactPlayer from 'react-player/youtube';



const SustanabilityWeekEvent = () =>{
     const navigate = useNavigate();


    return(
        <section className={classes.parent}>
        <span>Sustainability Week Events</span>
           <main className={classes.main}>
               <article>
                <header className={classes.header}>
                    <ReactPlayer url={'https://youtu.be/7T-NvwciBJM'} style={{ minWidth: '100%'}} controls width={'100%'} height={'100%'} />
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
                <ReactPlayer url={'https://youtu.be/5HO6IeBqACs'} controls width={'100%'} height={'100%'} />
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
                <ReactPlayer url={'https://youtu.be/JayvCQsVAEo'} controls width={'100%'} height={'100%'} />
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
    </section>
    )
}

export default SustanabilityWeekEvent;