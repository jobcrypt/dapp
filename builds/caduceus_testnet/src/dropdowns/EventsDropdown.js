import { useNavigate } from 'react-router-dom';


import classes from '../styles/dropdowns/EventsDropdown.module.css';

const EventsDropdown = (props) =>{
    const { setShowHamburger } = props;
 const navigate = useNavigate();


    const navigateToPage = (path) =>{
        navigate(path);
        setShowHamburger(false);
    }

    const openUrl = (url) =>{
        window.open(url);
    }

    return(
        <ul className={classes.ul}>
            <li onClick={()=>navigateToPage('/featured-events')}>Featured Event</li>
            <li onClick={()=>openUrl('https://www.eventbrite.com/cc/jobcrypt-blockchain-sustainability-week-uk-2023-2015709?utm_source=LinkedIn&utm_medium=link&utm_campaign=Q2')}>Blockchain Sustainable Week - UK 2023</li>
            <li onClick={()=>openUrl('https://www.eventbrite.com/cc/jobcrypt-blockchain-sustainability-week-eu-2023-2015569?utm_source=Website&utm_medium=link&utm_campaign=Q2')}>Blockchain Sustainable Week - EU 2023</li>
            <li onClick={()=>navigateToPage('/events_calendar')}>2023 Event Calendar</li>
        </ul>
    )
}

export default EventsDropdown;