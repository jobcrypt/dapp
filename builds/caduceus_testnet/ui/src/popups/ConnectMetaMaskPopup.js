import { useNavigate } from 'react-router-dom';
// import ReactDOM from 'react-dom';


import classes from '../styles/popups/ConnectMetaMaskPopup.module.css';
import cancelIcon from '../assets/x.png';
import metamaskIcon from '../assets/metamask.png';
import connectWalletIcon from '../assets/connectwallet.png';
import successIcon from '../assets/good.png';
import { chain, isNull } from '../utils/Util';
import { useContext } from 'react';
import { AccountContext } from '../App';
import useMetamask from '../hooks/useMetamask';


const ConnectMetaMaskPopup = (props) =>{
    const { setOpenMetaPopup, setDispatch, shouldUseDispatch, path } = props;
    // const navigate = useNavigate();
    // const { account, setAccount } = useContext(AccountContext);
    const { connect } = useMetamask(path);

   

    const connectNavigateAndClose = () =>{
        connect();
        // navigate(path);
        setOpenMetaPopup(false);
        if(!isNull(setDispatch) && shouldUseDispatch){
            setDispatch({ TYPE: 'DASHBOARD', status: false });
        }
        // dispatch(closeMetaMask());
    }

    

    const notConnected = (
        <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
        <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
         <header className={classes.header}>
             <span className={classes.cancelContainer} onClick={()=>setOpenMetaPopup(false)}>
                 <img src={cancelIcon} alt='' />
             </span>
         </header>
         <div className={classes.body}>
             <img src={connectWalletIcon} alt='' />
             <p>Connect to MetaMask and Stake to Apply or post Web3 Jobs </p>
         </div>
         <div className={classes.btnContainer}>
             <button className={classes.metaBtn} onClick={connectNavigateAndClose}>
                 <img src={metamaskIcon} alt='' />
                 Connect MetaMask
             </button>
         </div>
        </div>
       </section> 
    )

    // const connectSuccess = (
    //     <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
    //     <div className={classes.box} onClick={(e)=>e.stopPropagation()}>

    //     <header className={classes.header}>
    //         <span className={classes.cancelContainer} onClick={()=>setOpenMetaPopup(false)}>
    //             <img src={cancelIcon} alt='' />
    //         </span>
    //     </header>
    //     <div className={classes.successContainer}>
    //         <img src={successIcon} alt='' />
    //         <h1>Success!!!</h1>
    //         <p>{`You have successfully connected wallet: ${(!isNull(account.address))? account.address.slice(0, 10)+'...'+account.address.slice(-10) : ''}`}</p>
    //     </div>
    //     <div className={classes.jobsBtnContainer}>
    //         <button className={classes.browseBtn} onClick={()=>navigateAndClose('/browse-job')}>Browse Jobs</button>
    //         <button className={classes.postBtn} onClick={()=>navigateAndClose('/post_job')}>Post Jobs</button>
    //     </div>
    //      </div>
    //    </section> 
    // )


    // const element = (
    //     <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
    //         {notConnected}
    //    </section>
    // )

    return(
        <>
            {<section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
                {notConnected}
            </section>}
        </>
    )
}

export default ConnectMetaMaskPopup;