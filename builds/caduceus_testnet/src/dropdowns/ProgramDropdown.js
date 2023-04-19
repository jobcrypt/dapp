import { useNavigate } from 'react-router-dom';

import classes from '../styles/dropdowns/EventsDropdown.module.css';

const ProgramDropdown = (props) =>{
    const { setShowHamburger } = props;
    const navigate = useNavigate();
   
   
       const navigateToPage = (path) =>{
        navigate(path);
        setShowHamburger(false);
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

export default ProgramDropdown;