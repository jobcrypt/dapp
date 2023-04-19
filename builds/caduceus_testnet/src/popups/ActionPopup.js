import { useLayoutEffect, useRef } from "react";


import classes from '../styles/popups/ActionPopup.module.css';
import dropdown from '../assets/dropdown.png';


const ActionPopup = (props) =>{
    const { clientX, clientY, setShowAction } = props;
    const ref = useRef();

    useLayoutEffect(()=>{
        ref.current.style.left = (clientX - 110)+'px';//here is supposed to be 130 based on the css, but to make the arrow point directly under, i removed 20px
        ref.current.style.top = (clientY + 20)+'px';
    },[]);


    return(
        <section className={classes.parent} onClick={()=>setShowAction(false)}>
            <div className={classes.box} ref={ref} onClick={(e)=>e.stopPropagation()}>
                <img src={dropdown} alt='' />
                <p>Edit Job</p>
                <p>Archive Job</p>
            </div>
        </section>
    )
}

export default ActionPopup;