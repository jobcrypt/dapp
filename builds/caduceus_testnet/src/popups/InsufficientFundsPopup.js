import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from '../styles/popups/InsufficientFundsPopup.module.css';
import { stake } from '../store/MetaMaskSlice';
import thumbsIcon from '../assets/thumbs_up.png';
import youtube from '../assets/youtube.png';


const InsufficientFundsPopup = (props) =>{
    const { setOpenStakePopup } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch(state=>state.meta.isStaked);

    const stakeHandler = () =>{
        navigate('/browse-job'); 
        setOpenStakePopup(false);
        dispatch(stake());
    }


    return(
        <section className={classes.parent} onClick={()=>setOpenStakePopup(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={thumbsIcon} alt='' className={classes.thumbsIcon} />
                <h1>Insufficient Funds</h1>
                <p>Fund your metamask wallet to approve 1 CMP</p>
                <button onClick={stakeHandler}>Stake To Apply</button>
                <footer className={classes.footer}>
                    <img src={youtube} alt='' />
                    <p>How to add caduceus to metamask</p>
                </footer>
            </div>
        </section>
    )
}

export default InsufficientFundsPopup;