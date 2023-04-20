import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import {ethers} from 'ethers';


import classes from '../styles/components/BrowseJobs.module.css';
import searchIcon from '../assets/search.png';
import location from '../assets/location.png';
import calendar from '../assets/calendar.png';
import box from '../assets/suitcase.png';
import block from '../assets/cubes.png';
import dropdown from '../assets/dropdown.png';
import briefcase from '../assets/briefcase.png';
import skillIcon from '../assets/skills.png';
import designIcon from '../assets/categories.png';
import location2 from '../assets/pin.png';
import radio from '../assets/radio.png';
import moreIcon from '../assets/more.png';
import backIcon from '../assets/back2.png';
import StakePopup from '../popups/StakePopup';
import ApplyForJobPopup from '../popups/ApplyForJobPopup';
import { REGISTRY_ADDRESS, isNull } from '../utils/Util';
import {registryGetAllContracts} from '../contracts/InitializeContracts';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import { saveStakeData } from '../store/ContractSlice';
import { getContract } from '../contracts/init';
import useWindowSize from '../hooks/useWindowSize';
import { approveStake, getDecimal, getIsStaked, getMinStakeAmount, getStakeErc20Address, getStakedAmount, getSymbol } from '../contracts/ContractManager';



const FEATURED = 'FEATURED';
const LATEST = 'LATEST';
const POPULAR = 'POPULAR';


const initialState = {
    featured: true,
    latest: false,
    popular: false
}

const reducerFunc = (state, action) =>{
    switch(action.TYPE){
        case FEATURED:
            return{
                featured: true,
                latest: false,
                popular: false
            }
        case LATEST:
            return{
                featured: false,
                latest: true,
                popular: false
            }
        case POPULAR:
            return{
                featured: false,
                latest: false,
                popular: true
            }
        default:
            return state;
    }
}

const BrowseJobs = () =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const [ openStakePopup, setOpenStakePopup] = useState(false);
    const [ apply, setApply ] = useState(false);
    const [isStaked, setIsStaked ] = useState(false);
    const dispatchRedux = useDispatch();
    const width = useWindowSize();
    const [ showJobDesc, setShowJobDesc ] = useState(false);
    
    
    const stakeHandler = useCallback(async() =>{
        let minStakeAmount = await getMinStakeAmount();
        const erc20Address = await getStakeErc20Address();
        const symbol = await getSymbol();
        const decimals = await getDecimal();
        const isStaked = await getIsStaked();
        minStakeAmount = ethers.utils.formatUnits(minStakeAmount, decimals) * (10 ** decimals);
        console.log('Min staked amount: ',minStakeAmount);
        console.log('ERC20Address: ',erc20Address);
        console.log('Symbol: ',symbol)
        console.log('Decimal: ', decimals);
        console.log('is staked: ', isStaked);

        const approve = await approveStake();
        console.log(approve)
        // setOpenStakePopup(true);

    },[]);


    useEffect(()=>{
        document.getElementById('previous_application').scrollIntoView({ behavior: "smooth" });
    },[]);


    const selectedJobHandler = (type)=>{
        if(type === 'featured')setDispatch({ TYPE: FEATURED });
        if(type === 'latest')setDispatch({ TYPE: LATEST });
        if(type === 'popular')setDispatch({ TYPE: POPULAR });
    }


    const desktop = (
        <>
        <main className={classes.leftSide}>
        <h2 className={classes.jobCount}>390 Design Jobs available in London, UK</h2>
            <header className={classes.top}>
                <nav className={classes.nav}>
                    <button 
                        onClick={()=>selectedJobHandler('featured')} 
                        className={`${classes.jobTypeBtn} ${dispatch.featured&& classes.selected}`}>Featured Jobs</button>
                    <button 
                            onClick={()=>selectedJobHandler('latest')} 
                            className={`${classes.jobTypeBtn} ${dispatch.latest && classes.selected}`}>Latest Jobs</button>
                    <button 
                            onClick={()=>selectedJobHandler('popular')} 
                            className={`${classes.jobTypeBtn} ${dispatch.popular && classes.selected }`}>Popular Jobs</button>
                </nav>
            </header>
            <ul className={classes.unorderedList}>
                {new Array(10).fill().map((item, idx)=>(
                    <li key={idx}>
                    <div className={classes.profileBox}>
                        <span className={classes.circle}>
                            
                        </span>
                    </div>
                    <div className={classes.detailContainer}>
                        <h2 className={classes.jobTitle}>UI/UX Designer</h2>
                        <p className={classes.name}>Ryder</p>
                        <p className={classes.locationTxt}>London, England, United Kingdom | Full-Time</p>
                        <p className={classes.locationTxt}>1 day ago</p>
                    </div>
                    <div className={classes.optionContainer}>
                        <span className={classes.smallCircle}>
                            <img src={moreIcon} alt='' />
                        </span>
                    </div>
                </li>
                ))}
            </ul>
            </main>
                <main className={classes.rightSide}>
                     <h2 className={classes.jobCount}></h2>
                    <header className={classes.jobTitleColored}>
                        <div className={classes.jobTitleColoredDivLeft}>
                            <h1>UI/UX Designer</h1>
                            <div className={classes.jobTitleNameContainer}>
                                <span></span>
                                <p>Ryder</p>
                            </div>
                        </div>
                        <div className={classes.jobTitleColoredDivRight}>
                            {!isStaked &&<p onClick={stakeHandler}>Please stake to apply</p>}
                            {isStaked &&<button onClick={()=>setApply(true)} className={classes.applyNowBtn}>Apply Now</button>}
                        </div>
                    </header>
                    <section className={classes.fullDetailContainer}>
                    <main className={classes.shortDescriptionSection}>
                    <span>
                        <img src={location2} alt='' />
                        <p>London England United Kingdom</p>
                    </span>
                    <span>
                        <img src={designIcon} alt='' />
                        <p>Design</p>
                    </span>
                    <span>
                        <img src={briefcase} alt='' />
                        <p>Full-Time</p>
                    </span>
                    <span>
                        <img src={skillIcon} alt='' />
                    <div className={classes.skillContainer}>
                            <p>Figma</p>
                            <p>Adobe</p>
                            <p>ReactJS</p>
                    </div>
                    </span>
                    </main>
                    <main className={classes.aboutJobDescriptionContainer}>
                        <h1>About</h1>
                        <p>At Ryder, we believe Web3 is a cornerstone of a world where economic freedom is a fundamental right, giving people full control over their digital assets and identities, paving the way for a more prosperous and equitable global society.
                    <br/>
                    Our mission is to make web3 accessible and secure by developing the world’s best hardware and software products that seamlessly remove web3’s complexity, allowing the next billion users to join this new era of the internet.</p>
                    <h1>Job Responsibility</h1>
                    <ul className={classes.radioUnorderedList}>
                    {new Array(6).fill().map((item, idx)=>(
                            <li key={idx}>
                             <span className={classes.radioContainer}>
                                 <img src={radio} alt='' />
                             </span>
                             <div className={classes.radioText}>
                             Produce awesome UI designs, assets and user experiencs improvements to a consistently high quality.
                             </div>
                         </li>
                        ))}
                    </ul>
                    <h1>Requirements</h1>
                    <ul className={classes.radioUnorderedList}>
                    {new Array(5).fill().map((item, idx)=>(
                        <li key={idx}>
                            <span className={classes.radioContainer}>
                                <img src={radio} alt='' />
                            </span>
                            <div className={classes.radioText}>
                            Produce awesome UI designs, assets and user experiencs improvements to a consistently high quality.
                            </div>
                        </li>
                        ))}
                    </ul>
                    </main>
                    </section>
                </main>
        </>
    )

    const mobile = (
        <>
        {!showJobDesc && <main className={classes.leftSide}>
        <h2 className={classes.jobCount}>390 Design Jobs available in London, UK</h2>
            <header className={classes.top}>
                <nav className={classes.nav}>
                    <button 
                        onClick={()=>selectedJobHandler('featured')} 
                        className={`${classes.jobTypeBtn} ${dispatch.featured&& classes.selected}`}>Featured Jobs</button>
                    <button 
                            onClick={()=>selectedJobHandler('latest')} 
                            className={`${classes.jobTypeBtn} ${dispatch.latest && classes.selected}`}>Latest Jobs</button>
                    <button 
                            onClick={()=>selectedJobHandler('popular')} 
                            className={`${classes.jobTypeBtn} ${dispatch.popular && classes.selected }`}>Popular Jobs</button>
                </nav>
            </header>
            <ul className={classes.unorderedList}>
                {new Array(10).fill().map((item, idx)=>(
                    <li key={idx} onClick={()=>setShowJobDesc(true)}>
                    <div className={classes.profileBox}>
                        <span className={classes.circle}>
                            
                        </span>
                    </div>
                    <div className={classes.detailContainer}>
                        <h2 className={classes.jobTitle}>UI/UX Designer</h2>
                        <p className={classes.name}>Ryder</p>
                        <p className={classes.locationTxt}>London, England, United Kingdom | Full-Time</p>
                        <p className={classes.locationTxt}>1 day ago</p>
                    </div>
                    <div className={classes.optionContainer}>
                        <span className={classes.smallCircle}>
                            <img src={moreIcon} alt='' />
                        </span>
                    </div>
                </li>
                ))}
            </ul>
            </main>}
                {showJobDesc && <main className={classes.rightSide}>
                    <header className={classes.jobTitleColored}>
                    <div className={classes.backwardIconContainer}>
                        <img src={backIcon} alt='' className={classes.backIcon} onClick={()=>setShowJobDesc(false)} />
                    </div>
                        <div className={classes.jobTitleColoredDivLeft}>
                            <h1>UI/UX Designer</h1>
                            <div className={classes.jobTitleNameContainer}>
                                <span></span>
                                <p>Ryder</p>
                            </div>
                        </div>
                        <div className={classes.jobTitleColoredDivRight}>
                            {!isStaked &&<p onClick={()=>setOpenStakePopup(true)}>Please stake to apply</p>}
                            {isStaked &&<button onClick={()=>setApply(true)} className={classes.applyNowBtn}>Apply Now</button>}
                        </div>
                    </header>
                    <section className={classes.fullDetailContainer}>
                    <main className={classes.shortDescriptionSection}>
                    <span>
                        <img src={location2} alt='' />
                        <p>London England United Kingdom</p>
                    </span>
                    <span>
                        <img src={designIcon} alt='' />
                        <p>Design</p>
                    </span>
                    <span>
                        <img src={briefcase} alt='' />
                        <p>Full-Time</p>
                    </span>
                    <span>
                        <img src={skillIcon} alt='' />
                    <div className={classes.skillContainer}>
                            <p>Figma</p>
                            <p>Adobe</p>
                            <p>ReactJS</p>
                    </div>
                    </span>
                    </main>
                    <main className={classes.aboutJobDescriptionContainer}>
                        <h1>About</h1>
                        <p>At Ryder, we believe Web3 is a cornerstone of a world where economic freedom is a fundamental right, giving people full control over their digital assets and identities, paving the way for a more prosperous and equitable global society.
                    <br/>
                    Our mission is to make web3 accessible and secure by developing the world’s best hardware and software products that seamlessly remove web3’s complexity, allowing the next billion users to join this new era of the internet.</p>
                    <h1>Job Responsibility</h1>
                    <ul className={classes.radioUnorderedList}>
                        {new Array(6).fill().map((item, idx)=>(
                            <li key={idx}>
                             <span className={classes.radioContainer}>
                                 <img src={radio} alt='' />
                             </span>
                             <div className={classes.radioText}>
                             Produce awesome UI designs, assets and user experiencs improvements to a consistently high quality.
                             </div>
                         </li>
                        ))}
                    </ul>
                    <h1>Requirements</h1>
                    <ul className={classes.radioUnorderedList}>
                        {new Array(5).fill().map((item, idx)=>(
                        <li key={idx}>
                            <span className={classes.radioContainer}>
                                <img src={radio} alt='' />
                            </span>
                            <div className={classes.radioText}>
                            Produce awesome UI designs, assets and user experiencs improvements to a consistently high quality.
                            </div>
                        </li>
                        ))}
                    </ul>
                    </main>
                    </section>
                    {/* </div> */}
                </main>}
        </>
    )
    return(
        <main className={classes.parent} id='previous_application'>
            {openStakePopup && <StakePopup setOpenStakePopup={setOpenStakePopup} />}
            {apply && <ApplyForJobPopup setApply={setApply} />}
             <div className={classes.box}>
                <div className={classes.inputContainer}>
                     <input type='text' placeholder='UI/UX Designer' className={classes.input} />
                     <span className={classes.searchContainer}>
                        <img src={searchIcon} alt='' />
                     </span>
                </div>
                <div className={classes.inputContainer}>
                     <input type='text' placeholder='London, UK' className={classes.input} />
                     <span className={classes.searchContainer}>
                        <img src={location} alt='' />
                     </span>
                </div>
               {width > 770 && <button className={classes.searchBtn}>Search Jobs</button>}
             </div>
             {width > 770 &&<div className={classes.box}>
                <div className={classes.selectorContainer}>
                    <img src={calendar} alt='' className={classes.icon} />
                    <p>Past Week</p>
                    <img src={dropdown} alt='' className={classes.dropdown} />
                </div>
                <div className={classes.selectorContainer2}>
                    <img src={block} alt='' className={classes.icon2} />
                    <p>Featured Jobs</p>
                    <img src={dropdown} alt='' className={classes.dropdown2}  />
                </div>
                <div className={classes.selectorContainer2}>
                    <img src={box} alt='' className={classes.icon2} />
                    <p>Full Time</p>
                    <img src={dropdown} alt='' className={classes.dropdown2} />
                </div>
             </div>}
             {width <= 770 &&<div className={classes.box}>
                <div className={classes.selectorContainer2}>
                    <img src={calendar} alt='' className={classes.icon2} />
                    <p>Past Week</p>
                    <img src={dropdown} alt='' className={classes.dropdown2} />
                </div>
                <div className={classes.selectorContainer2}>
                    <img src={block} alt='' className={classes.icon2} />
                    <p>Featured Jobs</p>
                    <img src={dropdown} alt='' className={classes.dropdown2}  />
                </div>
                <div className={classes.selectorContainer2}>
                    <img src={box} alt='' className={classes.icon2} />
                    <p>Full Time</p>
                    <img src={dropdown} alt='' className={classes.dropdown2} />
                </div>
                <button className={classes.searchBtn}>Search Jobs</button>
             </div>}
             <div className={classes.allJobsParent}>
                <section className={classes.allJobsBlack}>
                   {width > 770 && desktop}
                   {width <= 770 && mobile}
                </section>
             </div>
             
        </main>
    )
}

export default BrowseJobs;