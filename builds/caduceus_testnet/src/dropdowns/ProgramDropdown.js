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
            <li onClick={()=>navigateToPage('/job-finder-programme')}>Job Finder Programme</li>
            <li onClick={()=>navigateToPage('/managed-service-programme')}>Managed Service Programme</li>
            <li onClick={()=>navigateToPage('/community-programme')}>Community Programme</li>
            <li onClick={()=>navigateToPage('/distinguished-speakers-programme')}>Distinguished Speakers</li>
        </ul>
    )
}

export default ProgramDropdown;