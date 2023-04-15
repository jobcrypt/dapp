import { forwardRef, useEffect, useState } from 'react';


import classes from '../styles/dropdowns/EventsDropdown.module.css';
import ConnectMetaMaskPopup from '../popups/ConnectMetaMaskPopup';

const DashBoardDropdown = (props, ref) =>{
    const [openMetaPopup, setOpenMetaPopup] = useState(false);


    // useEffect(()=>{
    //     return()=>{
    //         ref.current.display = 'flex';
    //         setOpenMetaPopup(false);
    //     }
    // },[]);


    const openPopupHandler = () =>{
        setOpenMetaPopup(true);

        // setTimeout(()=>{
            ref.current.blur();
        // },1000)
       }



    return(
        <>
           {openMetaPopup && <ConnectMetaMaskPopup setOpenMetaPopup={setOpenMetaPopup} />}
        <ul className={classes.ul}>
            <li onClick={openPopupHandler}>Employers</li>
            <li onClick={openPopupHandler}>Job Seekers</li>
        </ul>        
        </>
        
    )
}

export default forwardRef(DashBoardDropdown);