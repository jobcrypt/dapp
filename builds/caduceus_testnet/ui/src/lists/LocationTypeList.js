

import classes from '../styles/lists/List.module.css';

const LocationTypeList = (props) =>{
    const { setLocationType } = props;


    const selection = (type) =>{
        setLocationType({ isValid: true, text: type });
    }

    return(
        <ul className={classes.ul}>
            <li onClick={()=>selection('Geo Local')}>Geo Local</li>
            <li onClick={()=>selection('Geo Remote')}>Geo Remote</li>
            <li onClick={()=>selection('Geo Mixed Mode')}>Geo Mixed Mode</li>
        </ul>
    )
}

export default LocationTypeList;