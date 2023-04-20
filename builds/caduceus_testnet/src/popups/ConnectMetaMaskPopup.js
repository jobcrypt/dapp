import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';


import classes from '../styles/popups/ConnectMetaMaskPopup.module.css';
import cancelIcon from '../assets/x.png';
import metamaskIcon from '../assets/metamask.png';
import connectWalletIcon from '../assets/connectwallet.png';
import successIcon from '../assets/success.png';
import { chain, isNull } from '../utils/Util';
import { connectUser } from '../store/UserWalletSlice';
import { useEffect } from 'react';


const ConnectMetaMaskPopup = (props) =>{
    const { setOpenMetaPopup } = props;
    const navigate = useNavigate();
    const isConnected = useSelector(state=>state.user.isConnected);
    const address = useSelector(state=>state.user.wallet);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        console.log('....', isConnected)
    },[isConnected]);


    const connectToMetamask = async() =>{
        console.log('Trying to open metamask...')
        try{
            //switch network to sepolia
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chain.chainId }],
            });
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            if(!isNull(accounts)){
                sessionStorage.setItem('user', JSON.stringify({ wallet: accounts[0]}));
                dispatch(connectUser({ wallet: accounts[0] }));
            }
           
          }catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask, so add it.
            if (switchError.code === 4902) {
                console.log('chain does not exist')
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [chain],
                });
              } catch (addError) {
                // handle "add" error
              }
            }
        }   
    }

    const navigateAndClose = (path) =>{
        navigate(path);
        setOpenMetaPopup(false);
    }

    const notConnected = (
        <>
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
            <button className={classes.metaBtn} onClick={connectToMetamask}>
                <img src={metamaskIcon} alt='' />
                Connect MetaMask
            </button>
        </div>
        </>
    )

    const connectSuccess = (
        <>
        <header className={classes.header}>
            <span className={classes.cancelContainer} onClick={()=>setOpenMetaPopup(false)}>
                <img src={cancelIcon} alt='' />
            </span>
        </header>
        <div className={classes.successContainer}>
            <img src={successIcon} alt='' />
            <h1>Success!!!</h1>
            <p>{`You have successfully connected wallet: ${(!isNull(address))? address.slice(0, 10)+'...'+address.slice(-10) : ''}`}</p>
            {/* <p>{`You have successfully connected wallet: 0xA52B24Ea...7a741b717e`}</p> */}
        </div>
        <div className={classes.jobsBtnContainer}>
            <button className={classes.browseBtn} onClick={()=>navigateAndClose('/browse-job')}>Browse Jobs</button>
            <button className={classes.postBtn} onClick={()=>navigateAndClose('/post_job')}>Post Jobs</button>
        </div>
        </>
    )
    // onClick={()=>navigate('/post-job')}


    const element = (
        <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
        <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
            {isConnected? connectSuccess : notConnected}
        </div>
       </section> 
    )
    return ReactDOM.createPortal(element, document.getElementById('layout'));
}

export default ConnectMetaMaskPopup;