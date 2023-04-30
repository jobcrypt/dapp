import { useNavigate } from 'react-router-dom';

import classes from '../styles/components/SustanabilityWeekEvent.module.css';
import ReactPlayer from 'react-player/youtube';



const SustanabilityWeekEvent = () =>{
     const navigate = useNavigate();


     const openUrl = (url) =>{
        window.open(url);
     }


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
                    <button onClick={()=>openUrl('https://www.jobcrypt.com/blockchainsustainabilitydocuseries2023/index.html')}>Learn More</button>
                </footer>
               </article>
               <article>
                <header className={classes.header}>
                <ReactPlayer url={'https://youtu.be/Z6OD-EoeHYk'} controls width={'100%'} height={'100%'} />
                </header>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                    <p>“Do you live in Europe? Would you like to become part of the fight and save the planet? Then join us for JobCrypt Blockchain Sustainability Week- EU 2023, hosted in Munich Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening new ways for us to achieve a sustainable future</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>openUrl('https://www.eventbrite.com/cc/jobcrypt-blockchain-sustainability-week-uk-2023-2015709?utm_source=LinkedIn&utm_medium=link&utm_campaign=Q2')}>Learn More</button>
                </footer>
               </article>
               <article>
                <header className={classes.header}>
                <ReactPlayer url={'https://youtu.be/JayvCQsVAEo'} controls width={'100%'} height={'100%'} />
                </header>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- EU 2023</h2>
                    <p>JobCrypt Blockchain Sustainability Week - EU 2023 will bring to you an exciting series of talks every evening through the week. We will cover many different themes such as contrbutions to biodiversity conservation, land preservation and impact investing. In each theme during this week we will delve into the work being done and the new skills that are being brought to bear to tackle the tasks!</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>openUrl('https://www.jobcrypt.com/blockchainsustainabilityweekeu2023/index.html')}>Learn More</button>
                </footer>
               </article>
           </main>
    </section>
    )
}

export default SustanabilityWeekEvent;