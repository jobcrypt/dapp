
import classes from '../styles/routes/EventCalendarRoute.module.css';
import backArrow from '../assets/back.png';
import CalendarEvent2 from '../components/CalendarEvent2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const EventCalendarRoute = () =>{
    const navigate = useNavigate();


    useEffect(()=>{
        document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' })
    },[]);


    return(
        <section className={classes.parent} id='calendar'>
            <span className={classes.header}>
                <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                {/* <h1>2023 Events Calendar</h1> */}
            </span>
            <CalendarEvent2 />
        </section>
    )
}

export default EventCalendarRoute;