
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
                <main className={classes.main2}>
                    <h1 className={classes.title}>JobCrypt Events Calendar</h1>
                    <span className={classes.cloudContainer}>
                        <p><strong>View Past Events</strong></p>
                    </span>
            </main>
            </span>
            <CalendarEvent2 />
        </section>
    )
}

export default EventCalendarRoute;