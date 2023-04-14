import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';

import classes from '../styles/dropdowns/EventsDropdown.module.css';

const ProgramDropdown = (props, ref) =>{
    const navigate = useNavigate();
   
   
       const navigateToPage = (path) =>{
        ref.current.blur();
        navigate(path);
       }

       
    return(
        <ul className={classes.ul}>
            <li onClick={()=>navigateToPage('/job-seekers')}>Job Seekers</li>
            <li onClick={()=>navigateToPage('/employer')}>Employers</li>
            <li onClick={()=>navigateToPage('/community')}>Community</li>
            <li onClick={()=>navigateToPage('/speakers')}>Speakers</li>
        </ul>
    )
}

export default forwardRef(ProgramDropdown);