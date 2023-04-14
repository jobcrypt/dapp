import { useRef } from 'react';
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
import EventsDropdown from '../dropdowns/EventsDropdown';
import { useReducer } from 'react';
import ProgramDropdown from '../dropdowns/ProgramDropdown';
import AboutDropdown from '../dropdowns/AboutDropdown';
import DashBoardDropdown from '../dropdowns/DashboardDropdown';


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

const Header = () =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const eventRef = useRef();
    const programRef = useRef();
    const dashboardRef = useRef();
    const aboutRef = useRef();
    const navigate = useNavigate();


    return(
        <header className={classes.header}>
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
                         tabIndex={1} 
                         onFocus={()=>setDispatch({ TYPE: EVENTS, status: true })}
                         onBlur={()=>setDispatch({ TYPE: EVENTS, status: false })}
                         ref={eventRef}
                    >
                        <p>Events</p>
                        <img src={dropdownIcon} alt='' />
                       {dispatch.events && <EventsDropdown 
                       setDispatch={setDispatch} 
                       ref={eventRef}
                       />}
                     </span>
                     <span 
                         className={classes.dropdown}
                         tabIndex={1} 
                         onFocus={()=>setDispatch({ TYPE: PROGRAMS, status: true })}
                         onBlur={()=>setDispatch({ TYPE: PROGRAMS, status: false })}
                         ref={programRef}
                    >
                        <p>Programmes</p>
                        <img src={dropdownIcon} alt='' />
                        {dispatch.programs &&<ProgramDropdown 
                        setDispatch={setDispatch} 
                        ref={programRef}
                        />}
                     </span>
                     <span 
                         className={classes.dropdown}
                         tabIndex={1} 
                         onFocus={()=>setDispatch({ TYPE: DASHBOARD, status: true })}
                         onBlur={()=>setDispatch({ TYPE: DASHBOARD, status: false })}
                         ref={dashboardRef}
                    >
                        <p>Dashboard</p>
                        <img src={dropdownIcon} alt='' />
                        {dispatch.dashboard && <DashBoardDropdown 
                        setDispatch={setDispatch} 
                        ref={dashboardRef}
                        />}
                     </span>
                     <span 
                         className={classes.dropdown}
                         tabIndex={1} 
                         onFocus={()=>setDispatch({ TYPE: ABOUT, status: true })}
                         onBlur={()=>setDispatch({ TYPE: ABOUT, status: false })}
                         ref={aboutRef}
                    >
                        <p>About</p>
                        <img src={dropdownIcon} alt='' />
                        {dispatch.about && <AboutDropdown 
                        setDispatch={setDispatch} 
                        ref={aboutRef}
                        />}
                     </span>
                 </div>
             </section>
             <section className={classes.bottomHeader}>
                    <div className={classes.bottomLeftContainer}>
                        <img src={youtube} alt='' />
                        <p>How to add caduceus to metamask</p>
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
        </header>
    )
}

export default Header;