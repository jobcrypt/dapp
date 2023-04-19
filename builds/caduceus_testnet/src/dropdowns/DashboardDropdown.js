import { useState } from 'react';


import classes from '../styles/dropdowns/EventsDropdown.module.css';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';

const DashBoardDropdown = (props) =>{
    const { shouldShow, deviceType } = props;
    const [openMetaPopup, setOpenMetaPopup] = useState(false);


    const openPopupHandler = () =>{
        setOpenMetaPopup(true);
        // setShowHamburger(true);
    }

    let style = {};
     if(deviceType === 'desktop'){
        style = !shouldShow? { display: 'none'} : {}
    }

    return(
        <>
           {openMetaPopup && <ConnectMetaMaskPopup setOpenMetaPopup={setOpenMetaPopup} />}
        <ul className={classes.ul} style={style}>
            <li onClick={openPopupHandler}>Employers</li>
            <li onClick={openPopupHandler}>Job Seekers</li>
        </ul>        
        </>
        
    )
}

export default DashBoardDropdown;