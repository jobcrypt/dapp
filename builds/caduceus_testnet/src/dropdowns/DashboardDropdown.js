import { forwardRef } from 'react';


import classes from '../styles/dropdowns/EventsDropdown.module.css';

const DashBoardDropdown = (props, ref) =>{
    return(
        <ul className={classes.ul}>
            <li>Employers</li>
            <li>Job Seekers</li>
        </ul>
    )
}

export default forwardRef(DashBoardDropdown);