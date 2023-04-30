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
            <li onClick={()=>navigateToPage('/job-seekers')}>Job Finder Programme</li>
            <li onClick={()=>navigateToPage('/employer')}>Managed Service Programme</li>
            <li onClick={()=>navigateToPage('/community')}>Community Programme</li>
            <li onClick={()=>navigateToPage('/speakers')}>Distinguished Speakers</li>
        </ul>
    )
}

export default ProgramDropdown;