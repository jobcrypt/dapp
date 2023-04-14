import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';


import classes from '../styles/dropdowns/EventsDropdown.module.css';

const EventsDropdown = (props, ref) =>{
 const navigate = useNavigate();


    const navigateToPage = (path) =>{
        ref.current.blur();
        navigate(path);
    }


    return(
        <ul className={classes.ul}>
            <li onClick={()=>navigateToPage('/featured-events')}>Featured Event</li>
            <li>Blockchain Sustainable Week - UK 2023</li>
            <li>Blockchain Sustainable Week - EU 2023</li>
            <li>2023 Event Calendar</li>
        </ul>
    )
}

export default forwardRef(EventsDropdown);