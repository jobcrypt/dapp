import { useNavigate } from 'react-router-dom';


import classes from '../styles/dropdowns/EventsDropdown.module.css';

const EventsDropdown = (props) =>{
    const { setShowHamburger } = props;
 const navigate = useNavigate();


    const navigateToPage = (path) =>{
        navigate(path);
        setShowHamburger(false);
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

export default EventsDropdown;