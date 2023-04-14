import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/dropdowns/EventsDropdown.module.css';

const AboutDropdown = (props, ref) =>{
    const navigate = useNavigate();


    const navigateToPage = (path, type) =>{
        ref.current.blur();
        navigate(path, { state: { scroll: type }});
        // document.getElementById('about').scrollIntoView({ behavior: 'smooth'})
    }


    return(
        <ul className={classes.ul}>
            <li onClick={()=>navigateToPage('/about', 'about')}>About Us</li>
            <li onClick={()=>navigateToPage('/about', 'why')}>Why Us</li>
            <li onClick={()=>navigateToPage('/about', 'awards')}>Awards</li>
            <li onClick={()=>navigateToPage('/about', 'contact')}>Contact</li>
        </ul>
    )
}

export default forwardRef(AboutDropdown);