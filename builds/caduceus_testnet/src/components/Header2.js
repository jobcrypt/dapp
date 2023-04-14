import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import classes from '../styles/components/Header2.module.css';
import discord from '../assets/discord.png';
import linkedin from '../assets/linkedin.png';
import tiktok from '../assets/tiktok.png';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png';
import logo from '../assets/logo.png';
import dropdownIcon from '../assets/dropdown.png';
import tree from '../assets/tree.png';
import metaIcon from '../assets/metamask.png';
import thumbsUpIcon from '../assets/thumbs_up.png';
import EventsDropdown from '../dropdowns/EventsDropdown';
import { useReducer } from 'react';
import ProgramDropdown from '../dropdowns/ProgramDropdown';
import AboutDropdown from '../dropdowns/AboutDropdown';
import DashBoardDropdown from '../dropdowns/DashboardDropdown';
import { disconnect } from '../store/MetaMaskSlice';


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

const Header2 = () =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const eventRef = useRef();
    const programRef = useRef();
    const dashboardRef = useRef();
    const aboutRef = useRef();
    const dispatchRedux = useDispatch();
    const navigate = useNavigate()

    const disconnectMetamask = () =>{
        dispatchRedux(disconnect());
        navigate('/');
    }

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
                 <div className={classes.connectedSide}>
                     <div className={classes.connecteMetamaskContainer} onClick={disconnectMetamask}>
                        <span className={classes.metaTop}>
                            <div>
                                <img src={metaIcon} alt='' />
                            </div>
                            <p><strong style={{ fontWeight: 'bold'}}>Caduceus</strong> Connected</p>
                        </span>
                        <span className={classes.wallet}>
                            0xatt3764h366447374...
                        </span>
                     </div>
                 </div>
             </section>
             <section className={classes.bottomHeader}>
                    <div className={classes.bottomRightContainer}>
                        <p>Need Crypto?</p>
                        <button className={classes.getSomeBtn}>
                            <img src={youtube} alt='' />
                            How to use JobCrypt</button>
                    </div>
                    <div className={classes.bottomLeftContainer}>
                        <span className={classes.likeContainer}>
                            <img src={thumbsUpIcon} alt='' />
                            <p>Staked: <strong>CMP staked to apply for jobs</strong></p>
                        </span>
                        <span className={classes.cmpPortion}>
                            <p>Unstake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>
                    </div>
                    
             </section>
        </header>
    )
}

export default Header2;