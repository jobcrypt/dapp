

import classes from '../styles/components/JobListings.module.css';
import moreIcon from '../assets/more.png';

const JobListings = () =>{


    return(
        <section className={classes.tableParent}>
        <div className={classes.tableHeader}>
            <span>Listed Date</span>
            <span>Expiry Date</span>
            <span>Job Description</span>
            <span>Applicants</span>
            <span>Status</span>
            <span>Action</span>
        </div>
        <ul className={classes.unorderedList}>
            {new Array(15).fill().map((item, idx)=>(
                <li key={idx} className={classes.list}>
                    <span>01 April, 2023 07:22:13</span>
                    <span>01 April, 2023 07:22:13</span>
                    <span>UI/UX Designer</span>
                    <span>50</span>
                    <span>Listed</span>
                    <span>
                        <div className={classes.blackCircle}>
                            <img src={moreIcon} alt='' />
                        </div>
                    </span>
                </li>
            ))}
        </ul>
    </section>
    )
}

export default JobListings;