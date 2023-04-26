
import classes from '../styles/lists/List.module.css';


const WorkTypeList = (props) =>{
    const { setWorkType } = props;


    const selection = (type) =>{
        setWorkType({ isValid: true, text: type })
    }

    return(
        <ul className={classes.ul}>
            <li onClick={()=>selection('Contract')}>Contract</li>
            <li onClick={()=>selection('Full-Time')}>Full-Time</li>
            <li onClick={()=>selection('Part-Time')}>Part-Time</li>
            <li onClick={()=>selection('Intern')}>Intern</li>
            <li onClick={()=>selection('Associate')}>Associate</li>
            <li onClick={()=>selection('Volunteer')}>Volunteer</li>
            <li onClick={()=>selection('Alternative')}>Alternative</li>
        </ul>
    )
}

export default WorkTypeList;