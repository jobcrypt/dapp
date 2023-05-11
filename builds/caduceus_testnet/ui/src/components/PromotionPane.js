import { useEffect, useReducer, useRef } from 'react';
import { CSSTransition } from 'react-transition-group'


import classes from '../styles/components/PromotionPane.module.css';
import calendar from '../assets/calendar.png';
import location from '../assets/pin.png';
import ukFlag from '../assets/uk_flag.png';
import germanFlag from '../assets/german_flag.png';
import jobcryptFlag from '../assets/jobcrypt_flag.png';
import skipIcon from '../assets/right.png';

const ELEMENT1 = 'ELEMENT1';
const ELEMENT2 = 'ELEMENT2';
const ELEMENT3 = 'ELEMENT3';
const ELEMENT4 = 'ELEMENT4';

const initialState = {
   element1: true,
   element2: false,
   element3: false,
   element4: false
}

const reducerFunc = (state, action) =>{
  switch(action.TYPE){
    case ELEMENT1:
          return{
            element1: true,
            element2: false,
            element3: false,
            element4: false
          }
    case ELEMENT2:
          return{
            element1: false,
            element2: true,
            element3: false,
            element4: false
          }  
    case ELEMENT3:
          return{
            element1: false,
            element2: false,
            element3: true,
            element4: false
          }
    case ELEMENT4:
        return{
          element1: false,
          element2: false,
          element3: false,
          element4: true
        }
    default:
      return state;
  }
}

const PromotionPane = () =>{
      const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
      const timeout = useRef();
      const nodeRef = useRef();


    useEffect(() => {
      console.log('element pane run')
      // setDispatch({ TYPE: ELEMENT1 });
        timeout.current = setTimeout(()=>{
          console.log('current: ', dispatch)
          if(dispatch.element1)setDispatch({ TYPE: ELEMENT2 });
          if(dispatch.element2)setDispatch({ TYPE: ELEMENT3 });
          if(dispatch.element3)setDispatch({ TYPE: ELEMENT4 });
          if(dispatch.element4)setDispatch({ TYPE: ELEMENT1 });
        },2000);

        return ()=>{
          clearTimeout(timeout.current);
        }
    }, [dispatch]);

    const handleMouseEnterHandler = () =>{
        clearTimeout(timeout.current)
    }

    const handleMouseLeaveHandler = () =>{
      timeout.current = setTimeout(()=>{
        if(dispatch.element1)setDispatch({ TYPE: ELEMENT2 });
        if(dispatch.element2)setDispatch({ TYPE: ELEMENT3 });
        if(dispatch.element3)setDispatch({ TYPE: ELEMENT4 });
        if(dispatch.element4)setDispatch({ TYPE: ELEMENT1 });
      },1000)
    }

    const switchDisplay = (type) =>{
      if(dispatch.element1)setDispatch({ TYPE: ELEMENT2 });
      if(dispatch.element2)setDispatch({ TYPE: ELEMENT3 });
      if(dispatch.element3)setDispatch({ TYPE: ELEMENT4 });
      if(dispatch.element4)setDispatch({ TYPE: ELEMENT1 });
    }

    const element1 = (
      <div className={classes.card1} ref={nodeRef} onMouseEnter={handleMouseEnterHandler} onMouseLeave={handleMouseLeaveHandler}>
            <img src={skipIcon} alt='' className={classes.backward} onClick={()=>switchDisplay('')} />
            <img src={skipIcon} alt='' className={classes.forward} onClick={()=>switchDisplay('')}/>
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
    )

    const element2=(
      <div className={classes.card2} ref={nodeRef} onMouseEnter={handleMouseEnterHandler} onMouseLeave={handleMouseLeaveHandler}>
        <img src={skipIcon} alt='' className={classes.backward}  onClick={()=>switchDisplay('')}/>
         <img src={skipIcon} alt='' className={classes.forward} onClick={()=>switchDisplay('')}/>
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
    )

    const element3 = (
            <div className={classes.card1} ref={nodeRef} onMouseEnter={handleMouseEnterHandler} onMouseLeave={handleMouseLeaveHandler}>
              <img src={skipIcon} alt='' className={classes.backward} onClick={()=>switchDisplay('')} />
            <img src={skipIcon} alt='' className={classes.forward} onClick={()=>switchDisplay('')} />
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
    )

    const element4 = (
          <div className={classes.card3} ref={nodeRef} onMouseEnter={handleMouseEnterHandler} onMouseLeave={handleMouseLeaveHandler}>
            <img src={skipIcon} alt='' className={classes.backward} onClick={()=>switchDisplay('')} />
            <img src={skipIcon} alt='' className={classes.forward} onClick={()=>switchDisplay('')} />
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
    )

    return(
      //  <main className={classes.main}>
        <section className={classes.promotionPane}>
            {dispatch.element1 && <CSSTransition nodeRef={nodeRef} in={dispatch.element1} timeout={1000} unmountOnExit classNames={classes['my-node']}>
                   {element1}
              </CSSTransition>}
            {dispatch.element2 && element2}
            {dispatch.element3 && element3}
            {dispatch.element4 && element4}
       </section>
      //  </main>
    )
}

export default PromotionPane;