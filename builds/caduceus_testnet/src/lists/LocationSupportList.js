
import classes from '../styles/lists/List.module.css';


const LocationSupportList = (props) =>{
    const { setLocationSupport } = props;


    const selection = (type) =>{
        setLocationSupport({ isValid: true, text: type });
    }

    return(
        <ul className={classes.ul}>
            <li onClick={()=>selection('Paid Location')}>Paid Location</li>
            <li onClick={()=>selection('Supported Location')}>Supported Location</li>
            <li onClick={()=>selection('Not Provided')}>Not Provided</li>
            <li onClick={()=>selection('N/A')}>N/A</li>
        </ul>
    )
}

export default LocationSupportList;