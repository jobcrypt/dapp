import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import classes from '../styles/popups/StakePopup.module.css';
import thumbsIcon from '../assets/thumbs_up.png';
import { stake } from '../store/MetaMaskSlice';

const StakePopup = (props) =>{
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
                <h1>Transaction Approved</h1>
                <p>Your metamask funded, you can stake to apply for jobs</p>
                <button onClick={stakeHandler}>Stake To Apply</button>
            </div>
        </section>
    )
}

export default StakePopup;