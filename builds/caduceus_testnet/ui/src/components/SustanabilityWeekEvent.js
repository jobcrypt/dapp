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
                <span className={classes.contentParent}>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- Docuseries 2023</h2>
                    <p>With our focus on sustainabiluty, we will be launching the JobCrypt Blockchain Sustainability Docuseries, a short form media series, that will shed light on the impact of blockchain in sustainability efforts around the globe!</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>openUrl('https://www.jobcrypt.com/blockchainsustainabilitydocuseries2023/index.html')}>Learn More</button>
                </footer>
                </span>
               </article>
               <article>
                <header className={classes.header}>
                <ReactPlayer url={'https://youtu.be/Z6OD-EoeHYk'} controls width={'100%'} height={'100%'} />
                </header>
                <span className={classes.contentParent}>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- UK 2023</h2>
                    <p>With a global focus, we will be hosting the JobCrypt Blockchain Sustainability Week - UK 2023, in Liverpool UK! As part of the green week celebrations we invite you to come and learn about the UK is supporting global efforts in sustainability around the world using Blockchain!</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>openUrl('https://www.eventbrite.com/cc/jobcrypt-blockchain-sustainability-week-uk-2023-2015709?utm_source=LinkedIn&utm_medium=link&utm_campaign=Q2')}>Learn More</button>
                </footer>
                </span>
               </article>
               <article>
                <header className={classes.header}>
                <ReactPlayer url={'https://youtu.be/JayvCQsVAEo'} controls width={'100%'} height={'100%'} />
                </header>
                <span className={classes.contentParent}>
                <div className={classes.content}>
                    <h2>JobCrypt Blockchain Sustainability Week- EU 2023</h2>
                    <p>Do you live in europe? Would you like to become part of the climate fight and save the planet? Then join us for JobCrypt Blockchain sustainability week - EU 2023, hosted in Munich, Germany. Come and learn how blockchain is changing the face of the fight against pollution, opening up new ways for us to achieve a sustainable future!</p>
                </div>
                <footer className={classes.footer}>
                    <button onClick={()=>openUrl('https://www.jobcrypt.com/blockchainsustainabilityweekeu2023/index.html')}>Learn More</button>
                </footer>
                </span>
               </article>
           </main>
    </section>
    )
}

export default SustanabilityWeekEvent;