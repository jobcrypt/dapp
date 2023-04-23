import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../styles/dropdowns/EventsDropdown.module.css';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';
import { closeMetaMask, openMetaMask } from '../store/UserWalletSlice';


const DashBoardDropdown = (props) =>{
    const { shouldShow, deviceType, setDispatch, setShowHamburger } = props;
    // const [openMetaPopup, setOpenMetaPopup] = useState(false);
    const dispatch = useDispatch();
    // const openMetaMaskPopup = useSelector(state=>state.user.openMetaMask);
    const [ openMetaPopup, setOpenMetaPopup ] = useState(false);


   const openPopupHandler = () =>{
        setOpenMetaPopup(true);
        console.log('open up')
        setShowHamburger(true);
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