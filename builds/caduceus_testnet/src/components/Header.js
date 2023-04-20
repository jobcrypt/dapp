import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/components/Header.module.css';
import discord from '../assets/discord.png';
import linkedin from '../assets/linkedin.png';
import tiktok from '../assets/tiktok.png';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png';
import logo from '../assets/logo.png';
import dropdownIcon from '../assets/dropdown.png';
import tree from '../assets/tree.png';
import hamburger from '../assets/hamburger.png';
import cancelIcon from '../assets/x.png';
import frameImage from '../assets/Frame_image.png';
import EventsDropdown from '../dropdowns/EventsDropdown';
import { useReducer } from 'react';
import ProgramDropdown from '../dropdowns/ProgramDropdown';
import AboutDropdown from '../dropdowns/AboutDropdown';
import DashBoardDropdown from '../dropdowns/DashboardDropdown';
import useWindowSize from '../hooks/useWindowSize';


const EVENTS = 'EVENTS';
const PROGRAMS = 'PROGRAMS';
const DASHBOARD = 'DASHBOARD';
const ABOUT = 'ABOUT';


const initialState = {
    events: false,
    programs: false,
    dashboard: false,
    about: false
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case EVENTS:
            return{
                events: action.status,
                programs: false,
                dashboard: false,
                about: false
            }
        case PROGRAMS:
            return{
                events: false,
                programs: action.status,
                dashboard: false,
                about: false
            }
        case DASHBOARD:
            return{
                events: false,
                programs: false,
                dashboard: action.status,
                about: false
            }
        case ABOUT:
            return{
                events: false,
                programs: false,
                dashboard: false,
                about: action.status
            }
        default:
            return initialState;
    }
}

const Header = (props) =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const navigate = useNavigate();
    const [showHamburger, setShowHamburger ] = useState(false);
    const width = useWindowSize();
    

    return(
        <>
        {width > 770 &&<header className={classes.header}>
             <section className={classes.topHeader}>
                <div className={classes.topCenter}>Jobcrypt Blockchain Sustainable Week - UK 2023&nbsp;<strong style={{ textDecoration: 'underline'}}>Learn More</strong></div>
                <div className={classes.topIconImage}>
                    <img src={linkedin} alt='lkln' />
                    <img src={youtube} alt='lkln' />
                    <img src={tiktok} alt='lkln' />
                    <img src={twitter} alt='lkln' />
                    <img src={discord} alt='lkln' />
                </div>
             </section>
             <section className={classes.centerHeader}>
                 <div className={classes.logoContainer}>
                    <img src={logo} alt='' />
                    <h1>JobCrypt</h1>
                 </div>
                 <div className={classes.eventSideContainer}>
                     <span 
                         className={classes.dropdown} 
                         onClick={()=>setDispatch({ TYPE: EVENTS, status: !dispatch.events })}
                        >
                        <p>Events</p>
                        <img src={dropdownIcon} alt='' />
                       {dispatch.events && <EventsDropdown 
                       setDispatch={setDispatch} 
                       setShowHamburger={setShowHamburger}
                       />}
                     </span>
                     <span 
                         className={classes.dropdown}
                         onClick={()=>setDispatch({ TYPE: PROGRAMS, status: !dispatch.programs })}
                    >
                        <p>Programmes</p>
                        <img src={dropdownIcon} alt='' />
                        {dispatch.programs &&<ProgramDropdown 
                        setDispatch={setDispatch} 
                        setShowHamburger={setShowHamburger}
                        />}
                     </span>
                     <span 
                         className={classes.dropdown}
                         onClick={()=>setDispatch({ TYPE: DASHBOARD, status: !dispatch.dashboard })}
                       >
                        <p>Dashboard</p>
                        <img src={dropdownIcon} alt='' />
                         && <DashBoardDropdown 
                         shouldShow={dispatch.dashboard}
                         setDispatch={setDispatch} 
                         deviceType='desktop'
                         setShowHamburger={setShowHamburger}
                        />
                     </span>
                     <span 
                         className={classes.dropdown}
                         onClick={()=>setDispatch({ TYPE: ABOUT, status: !dispatch.about })}
                        >
                        <p>About</p>
                        <img src={dropdownIcon} alt='' />
                        {dispatch.about && <AboutDropdown 
                        setDispatch={setDispatch} 
                        setShowHamburger={setShowHamburger}
                        />}
                     </span>
                 </div>
             </section>
             <section className={classes.bottomHeader}>
                    <div className={classes.bottomLeftContainer}>
                        <span className={classes.howToAdd}>
                            <img src={youtube} alt='' />
                            <p>How to add caduceus to metamask</p>
                        </span>
                        <span className={classes.cmpPortion}>
                            <p>Add CMP to metamask to view jobs</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>
                    </div>
                    <div className={classes.bottomRightContainer}>
                        <p>Need Crypto?</p>
                        <button className={classes.getSomeBtn}>Get Some Here</button>
                    </div>
             </section>
        </header>}
        {width <= 770 &&<header className={classes.header__}>
            <header className={classes.topHeader__}>
                <div className={classes.logoPart__}>
                    <img src={logo} alt='' />
                    <h1>JobCrypt</h1>
                </div>
                <div className={classes.hamburger__}>
                    {!showHamburger &&<img 
                     src={hamburger} 
                     alt='' 
                     className={classes.hamburgerIcon} 
                     onClick={()=>setShowHamburger(true)} 
                    />}
                    {showHamburger &&<img 
                     src={cancelIcon} 
                     alt='' 
                     className={classes.cancelIcon} 
                     onClick={()=>setShowHamburger(false)} 
                    />}
                </div>
            </header>
            {showHamburger &&<>
            <div className={classes.bottomLeftContainer}>
                <span className={classes.howToAdd}>
                    <img src={youtube} alt='' />
                    <p>How to add caduceus to metamask</p>
                </span>
                <span className={classes.cmpPortion}>
                    <p>Add CMP to metamask to view jobs</p>
                    <span className={classes.circle}>
                        <img src={tree} alt='' />
                    </span>
                </span>
            </div>
            <div className={classes.bottomRightContainer}>
                <p>Need Crypto?</p>
                <button className={classes.getSomeBtn}>Get Some Here</button>
            </div>
            <div className={classes.eventSideContainer}>
                <img src={frameImage} alt='' className={classes.frameImage} />
                     <span className={classes.dropdown}>
                        <div className={classes.eventsTitle} onClick={()=>setDispatch({ TYPE: EVENTS, status: !dispatch.events })}>
                            <p>Events</p>
                            <img src={dropdownIcon} alt='' />
                        </div>
                        {dispatch.events &&<EventsDropdown setShowHamburger={setShowHamburger} />}
                     </span>
                     <span className={classes.dropdown}>
                       <div className={classes.eventsTitle} onClick={()=>setDispatch({ TYPE: PROGRAMS, status: !dispatch.programs })}>
                            <p>Programmes</p>
                            <img src={dropdownIcon} alt='' />
                        </div>
                       {dispatch.programs &&<ProgramDropdown setShowHamburger={setShowHamburger}/>}
                     </span>
                     <span className={classes.dropdown}>
                       <div className={classes.eventsTitle} onClick={()=>setDispatch({ TYPE: DASHBOARD, status: !dispatch.dashboard })}>
                            <p>Dashboard</p>
                            <img src={dropdownIcon} alt='' />
                        </div>
                       {dispatch.dashboard &&<DashBoardDropdown deviceType='mobile'
                       setShowHamburger={setShowHamburger}
                       />}
                     </span>
                     <span className={classes.dropdown}>
                       <div className={classes.eventsTitle} onClick={()=>setDispatch({ TYPE: ABOUT, status: !dispatch.about })}>
                            <p>About</p>
                            <img src={dropdownIcon} alt='' />
                        </div>
                       {dispatch.about &&<AboutDropdown setShowHamburger={setShowHamburger} />}
                     </span>
                 </div>
                 <footer className={classes.footer}>
                 <p className={classes.bottomTxt}>Jobcrypt Blockchain Sustainable Week - UK 2023&nbsp;<strong style={{ textDecoration: 'underline', margin: '0'}}>Learn More</strong></p>
                 <div className={classes.topIconImage}>
                    <img src={linkedin} alt='lkln' />
                    <img src={youtube} alt='lkln' />
                    <img src={tiktok} alt='lkln' />
                    <img src={twitter} alt='lkln' />
                    <img src={discord} alt='lkln' />
                </div>
                 </footer>
                 </>}
        </header>}
        </>
    )
}

export default Header;