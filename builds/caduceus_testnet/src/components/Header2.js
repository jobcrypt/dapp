import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { isNull } from '../utils/Util';
import { Stake, getContractInstance } from '../contracts/init';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import { getMinimumStakeAmount, getStakeErc20Address } from '../contracts/ContractManager';
import { disconnectUser } from '../store/UserWalletSlice';

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
    const navigate = useNavigate();
    const isStaked = useSelector(state=>state.contracts.stakeStatus);
    const address = useSelector(state=>state.user.wallet);
    const dispatchRedux = useDispatch();
    const [showHamburger, setShowHamburger ] = useState(false);

    const disconnectMetamask = () =>{
        navigate('/');
        sessionStorage.removeItem('user');
        dispatchRedux(disconnectUser());
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
                    <img src={logo} alt='' onClick={()=>navigate('/')} />
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
                        {dispatch.dashboard && <DashBoardDropdown 
                        shouldShow={dispatch.dashboard}
                        setDispatch={setDispatch} 
                        deviceType='desktop'
                        setShowHamburger={setShowHamburger}
                        />}
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
                 <div className={classes.connectedSide}>
                     <div className={classes.connecteMetamaskContainer} onClick={disconnectMetamask}>
                        <span className={classes.metaTop}>
                            <div>
                                <img src={metaIcon} alt='' />
                            </div>
                            <p><strong style={{ fontWeight: 'bold'}}>Caduceus</strong> Connected</p>
                        </span>
                        <span className={classes.wallet}>
                            {!isNull(address)? address.slice(0,10)+'...'+address.slice(-10) : '--'}
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
                        {isStaked &&<span className={classes.likeContainer}>
                            <img src={thumbsUpIcon} alt='' className={classes.thumbsIcon} />
                            <p>Staked: <strong>CMP staked to apply for jobs</strong></p>
                        </span>}
                        {!isStaked &&<span className={classes.likeContainer}>
                            <img src={thumbsUpIcon} alt='' className={`${classes.thumbsIcon} ${classes.rotate}`} />
                            <p>Not Staked: <strong>Stake CMP to apply for jobs</strong></p>
                        </span>}
                        {isStaked &&<span className={classes.cmpPortion}>
                            <p>Unstake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>}
                        {!isStaked &&<span className={classes.cmpPortion}>
                            <p>Stake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>}
                    </div>
                    
             </section>
        </header>
    )
}

export default Header2;