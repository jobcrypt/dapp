import classes from '../styles/popups/StakePopup.module.css';
import thumbsIcon from '../assets/thumbs_up.png';


const StakePopup = (props) =>{
    const { setOpenStakePopup } = props;

    const stakeHandler = () =>{
        // navigate('/browse-job'); 
        // setOpenStakePopup(false);
        // dispatch(stake());
    }


    return(
        <section className={classes.parent} onClick={()=>setOpenStakePopup(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={thumbsIcon} alt='' className={classes.thumbsIcon} />
                <h1>Transaction Approved</h1>
                <p>Your metamask funded, you can now apply for jobs</p>
                <button onClick={stakeHandler}>Apply Now</button>
            </div>
        </section>
    )
}

export default StakePopup;