import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Moment from 'react-moment';


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
import moreIcon from '../assets/more.png';
import backIcon from '../assets/back2.png';
import StakePopup from '../popups/StakePopup';
import ApplyForJobPopup from '../popups/ApplyForJobPopup';
import { isNull } from '../utils/Util';
import { getProvider } from '../contracts/init';
import useWindowSize from '../hooks/useWindowSize';
import { approveStake, getDecimal, getIsStaked, getMinStakeAmount, getStakeErc20Address, getStakedAmount, getSymbol, stake } from '../contracts/ContractManager';
import { getFeaturedJobs } from '../jobManager/FeaturedJobs';
import { getLatestJobDetails, getLatestJobs } from '../jobManager/LatestJobs';
import Spinner from './Spinner';
import Wrapper from './Wrapper';
import { getPopularJobs } from '../jobManager/PopularJobs';
import { AccountContext } from '../App';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';



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

let isDone = false;
const BrowseJobs = () =>{
    const [ dispatch, setDispatch ] = useReducer(reducerFunc, initialState);
    const [ openStakePopup, setOpenStakePopup] = useState(false);
    const [ apply, setApply ] = useState(false);
    const width = useWindowSize();
    const [ showJobDesc, setShowJobDesc ] = useState(false);
    const offset = useRef(0);
    const [ jobArray, setJobArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState({ status: false, message: '' });
    const [ jobDetails, setJobDetails ] = useState(null);
    const [ isLoadingJobDesc, setIsLoadingJobDesc ] = useState({ status: false, message: '' });
    const { isStaked, account, isApproved, setIsApproved, setIsStaked } = useContext(AccountContext);
    const navigate = useNavigate();


    const approveHandler = async() =>{
        const approve = await approveStake();
        console.log(approve)
        console.log('hash: ',approve.hash);
        if(!isNull(approve.hash)){
            setIsApproved(true);
        }
    }
    
    const stakeHandler = useCallback(async() =>{
        console.log('is approved: ', isApproved);
        if(!isApproved)return;
        const staked = await stake();
        console.log('Staked: ',staked)
        if(!isNull(staked)){
            setIsStaked(true);
        }
        
        // setOpenStakePopup(true);

    },[]);


    useEffect(()=>{
        document.getElementById('previous_application').scrollIntoView({ behavior: "smooth" });
    },[]);


    const fetchFeaturedJobs = useCallback(async() =>{
        isDone = false;
        setIsLoading({ status: true, message: 'Loading Featured Jobs, please wait...'})
       const jobs = await getFeaturedJobs(offset.current);
       isDone = true;
       if(!isNull(jobs)){
        ++offset.current;
        setJobArray(jobs);
       }

       setIsLoading({ status: false, message: ''});
       console.log('Featured Jobs Addresses: ', jobs);

    },[]);

    const fetchLatestJobs = useCallback(async() =>{
        isDone = false;
        setIsLoading({ status: true, message: 'Loading Latest Jobs, please wait...'})
        const jobs = await getLatestJobs(offset.current);
        isDone = true;
        if(!isNull(jobs)){
            ++offset.current;
            setJobArray(jobs);
        }


        setIsLoading({ status: false, message: ''})
        console.log('Latest Jobs Addresses: ', jobs);
    
        },[]);

    const fetchPopularJobs = useCallback(async() =>{
        isDone = false;
        setIsLoading({ status: true, message: 'Loading Popular Jobs, please wait...'})
        const jobs = await getPopularJobs(offset.current);
        isDone = true;
        if(!isNull(jobs)){
            ++offset.current;
            setJobArray(jobs);
        }

        setIsLoading({ status: false, message: ''})
        console.log('popular Jobs Addresses: ', jobs);
    
    },[]);

    useEffect(()=>{
       (async()=>{
        const isStaked = await getIsStaked();
        setIsStaked(isStaked)
       })();
        if(!account.isConnected){
            setJobArray([]);
            setJobDetails(null);
            return;
        }

        setDispatch({ TYPE: FEATURED });
        fetchFeaturedJobs();
    },[fetchFeaturedJobs, account.isConnected]);


    const selectedJobHandler = (type)=>{
        console.log('isDone: ', isDone)
    
        if(isDone){
        if(type === 'featured' && !dispatch.featured && account.isConnected){
            setDispatch({ TYPE: FEATURED });
            offset.current = 0;
            setJobArray([]);
            fetchFeaturedJobs();
            setJobDetails();
        }
        if(type === 'latest' && !dispatch.latest && account.isConnected){
            setDispatch({ TYPE: LATEST });
            offset.current = 0;
            setJobArray([]);
            fetchLatestJobs();
            setJobDetails();
        }
        if(type === 'popular' && !dispatch.popular && account.isConnected){
            setDispatch({ TYPE: POPULAR  });
            offset.current = 0;
            setJobArray([]);
            fetchPopularJobs();
            setJobDetails();
        }
    }
    }

    const fetchJobDetailsHandler = async(address) =>{
        setJobDetails(null);
        setShowJobDesc(true);//only for mobile
        setIsLoadingJobDesc({ status: true, message: 'Loading job details...' });
        console.log('user staked: ', isStaked);
        const result_ = await getLatestJobDetails(address, isStaked);
        if(!isNull(result_[0])){
            const result = result_[0];
        setJobDetails({
            jobTitle: result.jobTitle,
            companyName: result.companyName,
            companyLink: result.companyLink,
            workType: result.workType,
            locationType: result.locationType,
            postingDateFeatures: result.postingDateFeatures,
            companySummary: result.companySummary,
            jobPaymentType: result.jobPaymentType,
            jobLocationSupport: result.jobLocationSupport,
            categoryFeature: result.categoryFeature,
            skillsFeature: result.skillsFeature,
            jobDesc: result.jobDesc,
        });
        console.log('job details: ', result);
    }

    setIsLoadingJobDesc({ status: false, message: 'Sorry, couldn\'t load this job detail.' });
}

const openCompanyUrl =() =>{
    let url = jobDetails.applyLink || jobDetails.companyLink;
    if(!isStaked)return;
    if(!isNull(url)){
      if(!url.startsWith('http') || !url.startsWith('https')) url = `https://${url}`
         window.open(url);
    } 
}

function getJobTitle(title){
    return (isNull(title)? '' : (title.length > 17)? title.slice(0,17)+'...' : title)
}

 function header(){
    let element;
    if(isNull(jobDetails)){
        element = (
            <header className={classes.jobTitleColored}>
            <div className={classes.jobTitleColoredDivLeft}>
                <h1>--</h1>
                <div className={classes.jobTitleNameContainer}>
                    <span></span>
                    <p>--</p>
                </div>
            </div>
            <div className={classes.jobTitleColoredDivRight}>
            <p></p>
            </div>
        </header>
        )
    }else{
     element = (
        <header className={classes.jobTitleColored}>
            <div className={classes.jobTitleColoredDivLeft}>
                <h1>{jobDetails.jobTitle}</h1>
                <div className={classes.jobTitleNameContainer}>
                    <span>{jobDetails.companyName.slice(0,1)}</span>
                    <p>{jobDetails.companyName}</p>
                </div>
            </div>
            <div className={classes.jobTitleColoredDivRight}>
                {!isStaked &&<p onClick={stakeHandler}>Please stake to apply</p>}
                {isStaked &&<button onClick={()=>setApply(true)} className={classes.applyNowBtn}>Apply Now</button>}
            </div>
        </header>
    )
    }

     return element;
 }

 function headerMobile(){
    let element;
    if(isNull(jobDetails)){
        element = (
            <header className={classes.jobTitleColored}>
            <div className={classes.backwardIconContainer}>
                <img src={backIcon} alt='' className={classes.backIcon} onClick={()=>setShowJobDesc(false)} />
            </div>
                <div className={classes.jobTitleColoredDivLeft}>
                    <h1>--</h1>
                    <div className={classes.jobTitleNameContainer}>
                        <span></span>
                        <p>--</p>
                    </div>
                </div>
                <div className={classes.jobTitleColoredDivRight}>
                    {/* <p></p> */}
                </div>
            </header>
        )
    }else{
       element=(
        <header className={classes.jobTitleColored}>
        <div className={classes.backwardIconContainer}>
            <img src={backIcon} alt='' className={classes.backIcon} onClick={()=>setShowJobDesc(false)} />
        </div>
            <div className={classes.jobTitleColoredDivLeft}>
                <h1>{jobDetails.jobTitle}</h1>
                <div className={classes.jobTitleNameContainer}>
                    <span>{jobDetails.companyName.slice(0,1)}</span>
                    <p>{jobDetails.companyName}</p>
                </div>
            </div>
            <div className={classes.jobTitleColoredDivRight}>
                {!isStaked &&<p onClick={stakeHandler}>Please stake to apply</p>}
                {isStaked &&<button onClick={()=>setApply(true)} className={classes.applyNowBtn}>Apply Now</button>}
            </div>
        </header>
       )
    }

    return element;
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
            {(isNull(jobArray) && !isLoading.status) && <Wrapper>
                <p className={classes.statusTxt}>Nothing to show!</p>
            </Wrapper>}
            {isLoading.status &&<Wrapper>
                <Spinner />
                <p className={classes.statusTxt}>{isLoading.message}</p>
                {(isNull(jobArray) && !isLoading.status) &&<button className={classes.reloadBtn}>Reload</button>}
            </Wrapper>}
            <ul className={classes.unorderedList}>
                {(!isNull(jobArray)) && jobArray.map((item, idx)=>(
                    <li key={item.address} onClick={()=>fetchJobDetailsHandler(item.address)}>
                    <div className={classes.profileBox}>
                        <span className={classes.circle}>
                        {item.companyName.slice(0,1)}
                        </span>
                    </div>
                    <div className={classes.detailContainer}>
                        <h2 className={classes.jobTitle}>{getJobTitle(item.jobTitle)}</h2>
                        <p className={classes.name}>{item.companyName}</p>
                        <p className={classes.locationTxt}>{`${item.locationType} | ${item.workType}`}</p>
                        <p className={classes.locationTxt}><Moment fromNow>{item.postingDateFeatures}</Moment></p>
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
                    {/* {header()} */}
                    {(!isNull(jobDetails)) && <header className={classes.jobTitleColored}>
                    <div className={classes.jobTitleColoredDivLeft}>
                        <h1>{jobDetails.jobTitle}</h1>
                        <div className={classes.jobTitleNameContainer}>
                            <span>{jobDetails.companyName.slice(0,1)}</span>
                            <p>{jobDetails.companyName}</p>
                        </div>
                    </div>
                    <div className={classes.jobTitleColoredDivRight}>
                        {(!isApproved && !isStaked) &&<p onClick={approveHandler}>Approve 1 JCT/USDT to stake</p>}
                        {(!isStaked && isApproved) &&<p onClick={stakeHandler}>Please stake to apply</p>}
                        {isStaked &&<button onClick={openCompanyUrl} className={classes.applyNowBtn}>Apply Now</button>}
                    </div>
                </header>}
                    {(isNull(jobDetails) && !isLoadingJobDesc.status) && 
                    
                    <Wrapper>
                         <p className={classes.statusTxt}>Click on a job to view</p>
                    </Wrapper>}
                    {isLoadingJobDesc.status &&<Wrapper>
                        <Spinner />
                        <p className={classes.statusTxt}>{isLoadingJobDesc.message}</p>
                        {(isNull(jobDetails) && !isLoadingJobDesc.status) &&<button className={classes.reloadBtn}>Reload</button>}
                    </Wrapper>}
                    {!isNull(jobDetails) && <section className={classes.fullDetailContainer}>
                    <main className={classes.shortDescriptionSection}>
                    <span>
                        <img src={location2} alt='' />
                        <p>{`${jobDetails.jobLocationSupport} | ${jobDetails.locationType}`}</p>
                    </span>
                    <span>
                        <img src={designIcon} alt='' />
                        <p>{jobDetails.categoryFeature.join(',')}</p>
                    </span>
                    <span>
                        <img src={briefcase} alt='' />
                        <p>{jobDetails.workType}</p>
                    </span>
                    <span>
                        <img src={skillIcon} alt='' />
                    <div className={classes.skillContainer}>
                        {jobDetails.skillsFeature.map((item, idx)=>(
                            <p key={item}>{item}</p>
                        ))}
                    </div>
                    </span>
                    </main>
                    <main className={classes.aboutJobDescriptionContainer}>
                        <h1>About</h1>
                        <p>{jobDetails.companySummary}</p>
                    <h1>Job Description</h1>
                    <p className={classes.jobDescription}>{jobDetails.jobDesc}</p>
                    </main>
                    {isStaked &&<div className={classes.applyNowBtnContainer}>
                        <button onClick={openCompanyUrl}>Apply Now</button>
                    </div>}
                </section>}
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
            {(isNull(jobArray) && !isLoading.status) && <Wrapper>
                <p className={classes.statusTxt}>Nothing to show!</p>
            </Wrapper>}
            {isLoading.status &&<Wrapper>
                <Spinner />
                <p className={classes.statusTxt}>{isLoading.message}</p>
                {(isNull(jobArray) && !isLoading.status) &&<button className={classes.reloadBtn}>Reload</button>}
            </Wrapper>}
            <ul className={classes.unorderedList}>
                {(!isNull(jobArray)) && jobArray.map((item, idx)=>(
                   <li key={item.address} onClick={()=>fetchJobDetailsHandler(item.address)}>
                   <div className={classes.profileBox}>
                       <span className={classes.circle}>
                           
                       </span>
                   </div>
                   <div className={classes.detailContainer}>
                        <h2 className={classes.jobTitle}>{getJobTitle(item.jobTitle)}</h2>
                        <p className={classes.name}>{item.companyName}</p>
                        <p className={classes.locationTxt}>{`${item.locationType} | ${item.workType}`}</p>
                        <p className={classes.locationTxt}><Moment fromNow>{item.postingDateFeatures}</Moment></p>
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
                    {/* {headerMobile()} */}
                    {(!isNull(jobDetails)) &&<header className={classes.jobTitleColored}>
                    <div className={classes.backwardIconContainer}>
                        <img src={backIcon} alt='' className={classes.backIcon} onClick={()=>setShowJobDesc(false)} />
                    </div>
                        <div className={classes.jobTitleColoredDivLeft}>
                            <h1>{jobDetails.jobTitle}</h1>
                            <div className={classes.jobTitleNameContainer}>
                                <span>{jobDetails.companyName.slice(0,1)}</span>
                                <p>{jobDetails.companyName}</p>
                            </div>
                        </div>
                        <div className={classes.jobTitleColoredDivRight}>
                        {(!isApproved && !isStaked) &&<p onClick={approveHandler}>Approve 1 JCT/USDT to stake</p>}
                        {(!isStaked && isApproved) &&<p onClick={stakeHandler}>Please stake to apply</p>}
                        {isStaked &&<button onClick={openCompanyUrl} className={classes.applyNowBtn}>Apply Now</button>}
                        </div>
                    </header>}
                    {(isNull(jobDetails) && !isLoadingJobDesc.status) && <Wrapper>
                         <p className={classes.statusTxt}>Click on a job to view</p>
                    </Wrapper>}
                    {isLoadingJobDesc.status &&<Wrapper>
                        <Spinner />
                        <p className={classes.statusTxt}>{isLoadingJobDesc.message}</p>
                        {(isNull(jobDetails) && !isLoadingJobDesc.status) &&<button className={classes.reloadBtn}>Reload</button>}
                    </Wrapper>}
                    {!isNull(jobDetails) && <section className={classes.fullDetailContainer}>
                    <main className={classes.shortDescriptionSection}>
                    <span>
                        <img src={location2} alt='' />
                        <p>{`${jobDetails.jobLocationSupport} | ${jobDetails.locationType}`}</p>
                    </span>
                    <span>
                        <img src={designIcon} alt='' />
                        <p>{jobDetails.categoryFeature.join(',')}</p>
                    </span>
                    <span>
                        <img src={briefcase} alt='' />
                        <p>{jobDetails.workType}</p>
                    </span>
                    <span>
                        <img src={skillIcon} alt='' />
                    <div className={classes.skillContainer}>
                        {jobDetails.skillsFeature.map((item, idx)=>(
                            <p key={item}>{item}</p>
                        ))}
                    </div>
                    </span>
                    </main>
                    <main className={classes.aboutJobDescriptionContainer}>
                        <h1>About</h1>
                        <p>{jobDetails.companySummary}</p>
                        <h1>Job Description</h1>
                        <p className={classes.jobDescription}>{jobDetails.jobDesc}</p>
                    </main>
                    {isStaked &&<div className={classes.applyNowBtnContainer}>
                        <button onClick={openCompanyUrl}>Apply Now</button>
                    </div>}
                    </section>}
                    {/* </div> */}
                    
                </main>}
        </>
    )
    return(
        <main className={classes.parent} id='previous_application'>
            {openStakePopup && <StakePopup setOpenStakePopup={setOpenStakePopup} />}
            {apply && <ApplyForJobPopup setApply={setApply} />}
            <header className={classes.header}>
                <h1>Browse Jobs</h1>
                <button onClick={()=>navigate('/jobseeker_dashboard')}>Previous Applications</button>
            </header>
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
                {width <= 770 &&<span className={classes.searchSpan}>
                    <img src={searchIcon} alt='' />
                </span>}
                {/* <button className={classes.searchBtn}>Search Jobs</button> */}
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