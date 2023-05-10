import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/components/Header2.module.css';
import discord from '../assets/discord.png';
import linkedin from '../assets/linkedin.png';
import tiktok from '../assets/tiktok.png';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png';
import logo from '../assets/apple.png';
import dropdownIcon from '../assets/dropdown.png';
import tree from '../assets/tree.png';
import metaIcon from '../assets/metamask.png';
import thumbsUpIcon from '../assets/thumbs_up.png';
import hamburger from '../assets/hamburger.png';
import cancelIcon from '../assets/x.png';
import frameImage from '../assets/Frame_image.png';
import caduceusIcon from '../assets/caduceus.png';

import EventsDropdown from '../dropdowns/EventsDropdown';
import { useReducer } from 'react';
import ProgramDropdown from '../dropdowns/ProgramDropdown';
import AboutDropdown from '../dropdowns/AboutDropdown';
import { isNull } from '../utils/Util';
import useWindowSize from '../hooks/useWindowSize';
import DashboardPopup from '../popups/DashboardPopup';
import { AccountContext } from '../App';
import { approveStake, getIsStaked, getMinStakeAmount, getStakedAmount, getUserStakedAmount, stake, unstake } from '../contracts/ContractManager';
import useMetamask from '../hooks/useMetamask';
import SwitchChainDropdown from '../dropdowns/SwitchChainDropdown';
import { ethers } from 'ethers';
import { getProvider } from '../contracts/init';
import PostJobPopup from '../popups/PostJobPopup';
import JobsDropdown from '../dropdowns/JobsDropdown';
import ReceiptPopup from '../popups/ReceiptPopup';

const EVENTS = 'EVENTS';
const PROGRAMS = 'PROGRAMS';
const DASHBOARD = 'DASHBOARD';
const ABOUT = 'ABOUT';
const NETWORK = 'NETWORK';
const JOBS = 'JOBS';

const initialState = {
    events: false,
    programs: false,
    dashboard: false,
    about: false,
    network: false,
    jobs: false
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case EVENTS:
            return{
                events: action.status,
                programs: false,
                dashboard: false,
                about: false,
                network: false,
                jobs: false
            }
        case PROGRAMS:
            return{
                events: false,
                programs: action.status,
                dashboard: false,
                about: false,
                network: false,
                jobs: false
            }
        case DASHBOARD:
            return{
                events: false,
                programs: false,
                dashboard: action.status,
                about: false,
                network: false,
                jobs: false
            }
        case ABOUT:
            return{
                events: false,
                programs: false,
                dashboard: false,
                about: action.status,
                network: false,
                jobs: false
            }
        case NETWORK:
            return{
                events: false,
                programs: false,
                dashboard: false,
                about: false,
                network: action.status,
                jobs: false
            }
        case JOBS:
            return{
                events: false,
                programs: false,
                dashboard: false,
                about: false,
                network: false,
                jobs: action.status
            }  
        default:
            return state;
    }
}


let isRunning = false;
const Header2 = () =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const navigate = useNavigate();
    const [showHamburger, setShowHamburger ] = useState(false);
    const width = useWindowSize();
    const { account, setAccount, isStaked, setIsStaked, setIsApproved, isApproved } = useContext(AccountContext);
    const [ openPostJob, setOpenPostJob ] = useState(false);
    const { connect } = useMetamask('');
    const [ showReceipt, setShowReceipt ] = useState({ hash: '', type: '', isVisible: false });
    const dialogRef = useRef();
    

    const disconnectMetamask = () =>{
        if(!account.isConnected){
            connect();
        }else{
            setAccount({ address: '', isConnected: false });
            setIsApproved(false);
            setIsStaked(false);
            sessionStorage.removeItem('address');
        }
    }

   
    const unstakeHandler = async() =>{
        if(isRunning)return;
        isRunning = true;
        const txn = await unstake();
        const wait = await getProvider().waitForTransaction(txn.hash)
        if(!isNull(wait.transactionHash) && wait.status === 1){
            setIsStaked(false);
            setIsApproved(false);
        }
        setShowReceipt({ hash: txn.hash, type: 'Gas Fee', isVisible: true }); 
        isRunning = false;
     }


    const approveHandler = async() =>{
        if(isRunning)return;
        isRunning = true;
        console.log('approved clicked')
        if(!isApproved){
        const txn = await approveStake();
        // console.log(txn)
        // console.log('hash: ',txn.hash);
        const wait = await getProvider().waitForTransaction(txn.hash)
        if(!isNull(wait.transactionHash) && wait.status === 1){
            setIsApproved(true);
        }
    }
    isRunning = false;
    }


    const stakeHandler = async() =>{
        if(isRunning)return;
        isRunning = true;
        const txn = await stake();
        // console.log(txn);
        const wait = await getProvider().waitForTransaction(txn.hash)
        if(!isNull(wait.transactionHash) && wait.status === 1){
            setIsStaked(true);
        }
        setShowReceipt({ hash: txn.hash, type: 'Gas Fee', isVisible: true }); 
        isRunning = false;
    }

    const run = async() =>{
        if(isRunning)return;
        isRunning = true;
        let stakedAmount = await getUserStakedAmount();
        let minStakeAmount = await getMinStakeAmount();
        const isStaked = await getIsStaked();
        console.log('is staked: ', isStaked)
        setIsStaked(isStaked);
        stakedAmount = ethers.BigNumber.from(stakedAmount).toString();
        minStakeAmount = ethers.BigNumber.from(minStakeAmount).toString();
        if(stakedAmount < minStakeAmount)setIsApproved(false);
        else setIsApproved(true);
       
        isRunning = false;
    }

    useEffect(()=>{
        run();
    },[]);

    const openUrl = (url) =>{
        window.open(url);
    }
    
    return(
        <>
       {width > 1020 && <header className={classes.header}>
       {openPostJob && <PostJobPopup formToOpen='CREATE_DRAFT' setOpenPostJob={setOpenPostJob} />}
       {showReceipt.isVisible && <ReceiptPopup hash={showReceipt.hash} type={showReceipt.type} setShowReceipt={setShowReceipt} ref={dialogRef} />}
             <section className={classes.topHeader}>
             <p className={classes.versionTxt}>v1.0.15</p>
                <div className={classes.topCenter}>Jobcrypt Blockchain Sustainable Week - UK 2023&nbsp;<strong style={{ textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>openUrl('https://events.jobcrypt.com/blockchainsustainabilityweekuk2023/')}>Learn More</strong></div>
                <div className={classes.topIconImage}>
                <img src={linkedin} alt='lkln' onClick={()=>openUrl('https://www.linkedin.com/company/jobcrypt/')} />
                    <img src={youtube} alt='lkln' onClick={()=>openUrl('https://youtube.com/@jobcrypt6750')} />
                    <img src={tiktok} alt='lkln' onClick={()=>openUrl('https://www.tiktok.com/@jobcrypt?_t=8boKccUSTqv&_r=1')} />
                    <img src={twitter} alt='lkln' onClick={()=>openUrl('https://twitter.com/JobCrypt?t=lKJ39e8sY9Q2FTktDoQw_g&s=09')} />
                    <img src={discord} alt='lkln' onClick={()=>openUrl('https://discord.gg/kDTwvf59')} />
                </div>
             </section>
             <section className={classes.centerHeader}>
                 <div className={classes.logoContainer}>
                    <img src={logo} alt='' onClick={()=>navigate('/')} />
                    <h1>JobCrypt</h1>
                 </div>
                 <div className={classes.eventSideContainer}>
                    <span className={classes.dropdown} onClick={()=>navigate('/')}>
                        <p>Home</p>
                    </span>
                    <span 
                         className={classes.dropdown} 
                         onClick={()=>setDispatch({ TYPE: JOBS, status: !dispatch.jobs })}
                    >
                        <p>Jobs</p>
                        <img src={dropdownIcon} alt='' />
                       {dispatch.jobs && <JobsDropdown 
                          setDispatch={setDispatch} 
                          setShowHamburger={setShowHamburger}
                       />}
                     </span>
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
                        {/* {dispatch.dashboard && <DashBoardDropdown 
                        shouldShow={dispatch.dashboard}
                        setDispatch={setDispatch} 
                        deviceType='desktop'
                        setShowHamburger={setShowHamburger}
                        />} */}
                        {dispatch.dashboard && <DashboardPopup setShowHamburger={setShowHamburger} setDispatch={setDispatch} shouldUseDispatch={true} />}
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
                     <button className={classes.postJobBtn} onClick={()=>setOpenPostJob(true)}>Post A Job</button>
                    
                 </div>
                 <div className={classes.connectedSide}>
                     <div className={classes.connecteMetamaskContainer} onClick={disconnectMetamask}>
                        <span className={classes.metaTop}>
                            <div>
                                <img src={metaIcon} alt='' />
                            </div>
                            <p><strong style={{ fontWeight: 'bold'}}>Caduceus </strong>{`${account.isConnected? 'Connected' : 'Disconected'}`}</p>
                        </span>
                        <span className={classes.wallet}>
                            {!isNull(account.address)? account.address.slice(0,10)+'...'+account.address.slice(-10) : 'Connect wallet'}
                        </span>
                     </div>
                 </div>
             </section>
             <section className={classes.bottomHeader}>
                    <div className={classes.bottomRightContainer}>
                        <div className={classes.needContainer}>
                           <p className={classes.needTxt} onClick={()=>window.open('https://www.moonpay.com/buy')}>Need Crypto?</p>
                        </div>
                        <button className={classes.getSomeBtn} onClick={()=>window.open('https://youtu.be/iW9EAOCsgJc')}>
                            <img src={youtube} alt='' />
                            How to use JobCrypt</button>
                    </div>
                     <div className={classes.bottomLeftContainer}>
                     {account.isConnected &&<>
                        {isStaked &&<span className={classes.likeContainer}>
                            <img src={thumbsUpIcon} alt='' className={classes.thumbsIcon} />
                            <p>Staked: <strong>CMP staked to apply for jobs</strong></p>
                        </span>}
                        {!isStaked &&<span className={classes.likeContainer}>
                            <img src={thumbsUpIcon} alt='' className={`${classes.thumbsIcon} ${classes.rotate}`} />
                            <p>Not Staked: <strong>Stake CMP to apply for jobs</strong></p>
                        </span>}
                        {isStaked &&<span className={classes.cmpPortion} onClick={unstakeHandler}>
                            <p>Unstake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>}
                        {/* {(!isApproved && !isStaked) &&<span className={classes.cmpPortion} onClick={approveHandler}>
                            <p>Approve CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>} */}
                        {/* {(!isStaked && isApproved) &&<span className={classes.cmpPortion} onClick={stakeHandler}>
                            <p>Stake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>} */}
                        {(!isStaked) &&<span className={classes.cmpPortion} onClick={stakeHandler}>
                            <p>Stake CMP</p>
                            <span className={classes.circle}>
                                <img src={tree} alt='' />
                            </span>
                        </span>}
                        </>}
                        <span className={classes.caduceusIconContainer}  onClick={()=>setDispatch({ TYPE: NETWORK, status: !dispatch.network })}>
                            <img src={caduceusIcon} alt='' />
                            <img src={dropdownIcon} alt='' className={classes.dropdownIcon} />
                            {dispatch.network && <SwitchChainDropdown setShowHamburger={setShowHamburger} shouldUseDispatch={true} setDispatch={setDispatch} />}
                        </span>
                    </div>
             </section>
        </header>}
        {width <= 1020 &&<header className={classes.header__}>
            <header className={classes.topHeader__}>
                <div className={classes.logoPart__}>
                    <img src={logo} alt='' onClick={()=>navigate('/')}  />
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
            <div className={classes.bottomLeftContainer2__}>
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
            <div className={classes.bottomRightContainer2__}>
                <span className={classes.needCryptoParent__}>
                    <p className={classes.needCryptoTxt}>Need Crypto?</p>
                    <button className={classes.getSomeBtn} onClick={()=>window.open('https://www.moonpay.com/buy')}>Get Some Here</button>
                </span>
                <div className={classes.connecteMetamaskContainer} onClick={disconnectMetamask}>
                <span className={classes.metaTop}>
                    <div>
                        <img src={metaIcon} alt='' />
                    </div>
                    <p><strong style={{ fontWeight: 'bold'}}>Caduceus </strong>{`${account.isConnected? 'Connected' : 'Disconnected'}`}</p>
                </span>
                <span className={classes.wallet}>
                {!isNull(account.address)? account.address.slice(0,10)+'...'+account.address.slice(-10) : '--'}
                </span>
                </div>
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
                       {/* {dispatch.dashboard &&<DashBoardDropdown deviceType='mobile'
                       setShowHamburger={setShowHamburger}
                       />} */}
                       {dispatch.dashboard && <DashboardPopup setShowHamburger={setShowHamburger}  setDispatch={setDispatch} shouldUseDispatch={true} />}
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
                 <img src={linkedin} alt='lkln' onClick={()=>openUrl('https://www.linkedin.com/company/jobcrypt/')} />
                    <img src={youtube} alt='lkln' onClick={()=>openUrl('https://youtube.com/@jobcrypt6750')} />
                    <img src={tiktok} alt='lkln' onClick={()=>openUrl('https://www.tiktok.com/@jobcrypt?_t=8boKccUSTqv&_r=1')} />
                    <img src={twitter} alt='lkln' onClick={()=>openUrl('https://twitter.com/JobCrypt?t=lKJ39e8sY9Q2FTktDoQw_g&s=09')} />
                    <img src={discord} alt='lkln' onClick={()=>openUrl('https://discord.gg/kDTwvf59')} />
                </div>
                 </footer>
                 </>}
        </header>}
        </>
    )
}

export default Header2;