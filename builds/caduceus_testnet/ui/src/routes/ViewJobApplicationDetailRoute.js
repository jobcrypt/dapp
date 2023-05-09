import { useNavigate, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';

import classes from '../styles/routes/ViewJobApplicationDetailRoute.module.css';
import locationIcon from '../assets/pin.png';
import briefcase from '../assets/briefcase.png';
import locationSupportIcon from '../assets/support.png';
import paymentIcon from '../assets/crypto.png';
import copyIcon from '../assets/copy.png';
import backIcon from '../assets/back.png';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getJobDetailUsingPostingddress } from '../contracts/ContractManager';
import { isNull } from '../utils/Util';
import Moment from 'react-moment';


const ViewJobApplicationDetailRoute = (props) =>{
    // const { postingAddress } = props;
    const navigate = useNavigate();
    const [ data, setData ] = useState({ jobTitle: '', locationType: '--', locationSupport: '--', workLocation: '--', companyName: '', companyLink: '', companySummary: '', paymentType: '', workType: '', jobDesc: '', searchTerms: '', applyLink: '', skills: [], searchCategory: [], postedDate: null });
    const location = useLocation();
    const [ isCopied, setIsCopied ] = useState(false);
    const copyRef = useRef();

    

    const getDetail = useCallback(async() =>{
        if(isNull(location.state.selectedPostingAddress))return;
        const result = await getJobDetailUsingPostingddress(location.state.selectedPostingAddress);
        console.log(result);
        // jobDesc.ops[0].insert
        setData({
            jobTitle: result.jobTitle, locationType: result.locationType, locationSupport: result.locationSupport, workLocation: result.workLocation, companyName: result.companyName, companyLink: result.companyLink, companySummary: result.companySummary, paymentType: result.paymentType, workType: result.workType, jobDesc: result.jobDesc.ops[0].insert, searchTerms: result.searchTerms, applyLink: result.applyLink, skills: result.skills, searchCategory: result.searchCategory,postedDate: result.postedDate
        });
    },[]);


    useEffect(()=>{
        getDetail();
    },[getDetail]);

    
    const trim = (value, length) =>{
        if(!isNull(value)){
            return (value.length > length)? value.slice(0, length)+'...' : value;
        }

        return '';
    }

    const copyHandler = (value) =>{
        if(!isNull(value)){
            navigator.clipboard.writeText(value).then(()=>{
                setIsCopied(true);
                const timeout = setTimeout(()=>{
                    setIsCopied(false);
                    clearTimeout(timeout);
                },2000);
            })
        }
    }

    return(
        <section className={classes.parent}>
            <main className={classes.rightSide}>
                <header className={classes.jobTitleColored}>
                <div className={classes.backwardIconContainer}>
                        <img src={backIcon} alt='' className={classes.backIcon} onClick={()=>navigate('/jobseeker_dashboard')} />
                    </div>
                    <div className={classes.jobTitleColoredDivLeft}>
                        <h1>{data.jobTitle}</h1>
                        <div className={classes.jobTitleNameContainer}>
                            <span>{trim(data.companyName, 1)}</span>
                            <p>{trim(data.companyName, 20)}</p>
                        </div>
                    </div>
                </header>
                <section className={classes.detailContainer}>
                    <div className={classes.detail}>
                        <span className={classes.iconContainer}>
                            <img src={locationIcon} alt='' />
                            <p>Location: <strong>{data.locationType}</strong></p>
                        </span>
                        <span className={classes.iconContainer}>
                            <img src={locationSupportIcon} alt='' />
                            <p>Location Support: <strong>{data.locationSupport}</strong></p>
                        </span>
                    </div>
                    <div className={classes.detail}>
                        <span className={classes.iconContainer}>
                            <img src={briefcase} alt='' />
                            <p>WorkType: <strong>{data.workType}</strong></p>
                        </span>
                        <span className={classes.iconContainer}>
                            <img src={paymentIcon} alt='' />
                            <p>Payment: <strong>{data.paymentType}</strong></p>
                        </span>
                    </div>
                </section>
                <section className={classes.roleContainer}>
                    <h1>About the Role</h1>
                    <ul className={classes.ul}>
                        {(!isNull(data.jobDesc)) &&<li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.jobDesc)}}></li>}
                       {/* {new Array(6).fill().map((item, idx)=>(
                         <li key={idx}>Produce awesome UI designs, assets and user experience improvements to a consistently high quality.</li>
                       ))}
                    </ul>
                    <h1>Requirement</h1>
                    <ul className={classes.ul}>
                       {new Array(6).fill().map((item, idx)=>(
                         <li key={idx}>Produce awesome UI designs, assets and user experience improvements to a consistently high quality.</li>
                       ))} */}
                    </ul>
                </section>
                <footer className={classes.footer}>
                    <div className={classes.footerDiv}>
                        <h1>Skills</h1>
                        <span className={classes.list}>
                            {(!isNull(data.skills) && data.skills.map((skill)=>(
                                <p key={skill}>{skill}</p>
                            )))}
                            {/* <p>React</p>
                            <p>Solidity</p> */}
                        </span>
                    </div>
                    <div className={classes.footerDiv}>
                        <h1>Job Categories</h1>
                        <span className={classes.list}>
                            {(!isNull(data.searchCategory)) && data.searchCategory.map(category=>(
                                <p key={category}>{category}</p>
                            ))}
                            {/* <p>Dev</p>
                            <p>Tech</p>
                            <p>Blockchain</p> */}
                        </span>
                    </div>
                    <div className={classes.footerDiv}>
                        <h1>Apply Details: </h1>
                        <span className={classes.list}>
                            <h1 className={classes.emailTxt}>{trim(data.applyLink, 30)}</h1>
                            {!isNull(data.applyLink) &&<img src={copyIcon} alt='' className={classes.copyIcon} onClick={(e)=>copyHandler(e, data.applyLink)} />}
                            {/* {<span ref={copyRef} className={classes.copySpan}>Copied!</span>} */}
                        </span>
                    </div>
                    <div className={classes.footerDiv}>
                        <h1>First Posted: </h1>
                        {(!isNull(data.postedDate)) &&<span className={classes.list}>
                            <h1 className={classes.emailTxt} style={{ color: '#000'}}><Moment format="MMM Do YYYY, h:mm:ss a">{data.postedDate}</Moment> </h1>
                        </span>}
                    </div>
                </footer>
            </main>
        </section>
    )
}

export default ViewJobApplicationDetailRoute;