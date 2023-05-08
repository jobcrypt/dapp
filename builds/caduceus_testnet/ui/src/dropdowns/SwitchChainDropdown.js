import { useNavigate } from 'react-router-dom';

import classes from '../styles/dropdowns/SwitchChainDropdown.module.css';
import optimismIcon from '../assets/optimism.png';
import caduceusIcon from '../assets/caduceus.png';
import checkIcon from '../assets/check.png';



const SwitchChainDropdown = (props) =>{
    const { setShowHamburger, setDispatch, shouldUseDispatch } = props;
    const navigate = useNavigate();


    const navigateToPage = (type) =>{
        if(type === 'optimism'){
            window.open('http://jobcrypt.com');
        }
        if(shouldUseDispatch)setDispatch({ TYPE: 'NETWORK', status: false });
        else setShowHamburger(false);
    }


    return(
        <ul className={classes.ul}>
            <li onClick={()=>navigateToPage('caduceus')}>
                <img src={caduceusIcon} alt='' className={classes.networkIcon} />
                <p className={classes.pTag}>Caduceus</p>
                <img src={checkIcon} alt='' className={classes.checkIcon} />
            </li>
            <li onClick={()=>navigateToPage('optimism')}>
                <img src={optimismIcon} alt='' className={classes.networkIcon} />
                <p className={classes.pTag}>Optimism</p>
                {/* <img src={checkIcon} alt='' className={classes.checkIcon} /> */}
            </li>
        </ul>
    )
}

export default SwitchChainDropdown;