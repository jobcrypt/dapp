import { useEffect, useRef, useState } from 'react';



import classes from '../styles/components/PromotionPane.module.css';
import vector1 from '../assets/Vector1.png';
import vector2 from '../assets/Vector2.png';
import calendar from '../assets/calendar.png';
import location from '../assets/pin.png';
import ukFlag from '../assets/uk_flag.png';
import germanFlag from '../assets/german_flag.png';
import jobcryptFlag from '../assets/jobcrypt_flag.png';


const PromotionPane = () =>{
    const [promoArray] = useState([ vector1, vector2, vector1, vector2, vector1, vector2, vector1, vector2 ]);

    const containerRef = useRef(null);

    useEffect(() => {
      const container = containerRef.current;
  
      const handleAnimationEnd = () => {
        const firstItem = container.firstChild;
        container.appendChild(firstItem);
      };
  
      container.addEventListener('animationend', handleAnimationEnd);
  
      return () => {
        container.removeEventListener('animationend', handleAnimationEnd);
      };
    }, []);

    return(
       <main className={classes.main}>
        <section className={classes.promotionPane} ref={containerRef}>
         <div className={classes.card1}>
          <span className={classes.span1}>
              <h2>Introduction to DAOs in Sustainability - UK 2023</h2>
              <p>This event will introduce attendees to the basics of DAOs and introduce DAOs working in the Sustainability space.</p>
              <span className={classes.line}></span>
              <div className={classes.bottom}>
                <section className={classes.firstSection}>
                    <span>
                        <img src={calendar} alt='' />
                        <p>Thursday, 11th May 2023 5:45 - 8:00 BST</p>
                    </span>
                    <span>
                        <img src={location} alt='' />
                        <p>Online, UK</p>
                    </span>
                </section>
                <section className={classes.secondSection}>
                    <button onClick={()=>window.open('https://events.jobcrypt.com')}>Learn More</button>
                </section>  
              </div>
          </span>
          <span className={classes.span2}>
             <img src={ukFlag} alt='' />
          </span>
         </div>

         <div className={classes.card2}>
              <span className={classes.span1}>
                  <h2>Einführung in Blockchain NFTs in Arbeit, Unterhaltung und Sozialem</h2>
                  <p>Introduction to Blockchain NFTs in Work, Entertainment and Social</p>
                  <span className={classes.line}></span>
                  <div className={classes.bottom}>
                    <section className={classes.firstSection}>
                        <span>
                            <img src={calendar} alt='' />
                            <p>Wednesday, 24th May 2023 17:45 - 21:00 GMT+2</p>
                        </span>
                        <span>
                            <img src={location} alt='' />
                            <p>München, Germany</p>
                        </span>
                    </section>
                    <section className={classes.secondSection}>
                        <button onClick={()=>window.open('https://events.jobcrypt.com')}>Learn More</button>
                    </section>  
                  </div>
              </span>
              <span className={classes.span2}>
                <img src={germanFlag} alt='' />
              </span>
         </div>

         <div className={classes.card1}>
              <span className={classes.span1}>
                  <h2>UK Coronation NFT Airdrop</h2>
                  <p>Join us online on discord as we Celebrate the ascension of King Charles of the United Kingdom. We will be doing an airdrop of not just NFTs!</p>
                  <span className={classes.line}></span>
                  <div className={classes.bottom}>
                    <section className={classes.firstSection}>
                        <span>
                            <img src={calendar} alt='' />
                            <p>Monday, 8th May 2023 17:45 - 21:00 GMT +1</p>
                        </span>
                        <span>
                            <img src={location} alt='' />
                            <p>Online, Liverpool - UK</p>
                        </span>
                    </section>
                    <section className={classes.secondSection}>
                        <button onClick={()=>window.open('https://events.jobcrypt.com')}>Learn More</button>
                    </section>  
                  </div>
              </span>
              <span className={classes.span2}>
                <img src={ukFlag} alt='' />
              </span>
         </div>

         <div className={classes.card3}>
              <span className={classes.span1}>
                  <h2>JobCrypt Blockchain Nachhaltigkeitswoche EU 2023</h2>
                  <p>Kommen Sie und erfahren Sie, wie Blockchain den Kampf gegen den... Come and learn how blockchain is changing the climate battle...</p>
                  <span className={classes.line}></span>
                  <div className={classes.bottom}>
                    <section className={classes.firstSection}>
                        <span>
                            <img src={calendar} alt='' />
                            <p>Monday 5th - Friday 9th June 2023 17:45 - 21:00 GMT+2 Daily</p>
                        </span>
                        <span>
                            <img src={location} alt='' />
                            <p>Online, Liverpool - UK</p>
                        </span>
                    </section>
                    <section className={classes.secondSection}>
                        <button>Learn More</button>
                    </section>  
                  </div>
              </span>
              <span className={classes.span2}>
                <img src={jobcryptFlag} alt='' />
              </span>
         </div>
       </section>
       </main>
    )
}

export default PromotionPane;