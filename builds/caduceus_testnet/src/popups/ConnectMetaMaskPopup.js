import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/popups/ConnectMetaMaskPopup.module.css';
import cancelIcon from '../assets/x.png';
import metamaskIcon from '../assets/metamask.png';
import connectWalletIcon from '../assets/connectwallet.png';
import successIcon from '../assets/success.png';
import { connect } from '../store/MetaMaskSlice';
import { isNull, networks } from '../utils/Util';


const ConnectMetaMaskPopup = (props) =>{
    const { setOpenMetaPopup } = props;
    const isConnected = useSelector(state=>state.meta.isConnected);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const connectToMetamask = async() =>{
            try{
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: networks.optimism.chainId }],
                });
    
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts',params: []});
                console.log(accounts)
                // if(isNull(accounts[0])){
                //     setWallet('');
                //     setButtonStatus('Click to connect to metamask.');
                // }else{
                //     setWallet(`Connected Wallet: ${accounts[0]}`);
                //     setButtonStatus('Web3 Connected!');
                // }
    
              }catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {
                    await window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [networks.sepolia],
                    });
                  } catch (addError) {
                    // handle "add" error
                  }
                }
            }
        
            // dispatch(connect());
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
            <p>You have successfully connected wallet: 0xahyd6638h2865729j3...</p>
        </div>
        <div className={classes.jobsBtnContainer}>
            <button className={classes.browseBtn} onClick={()=>navigate('/browse-job')}>Browse Jobs</button>
            <button className={classes.postBtn} onClick={()=>navigate('/post-job')}>Post Jobs</button>
        </div>
        </>
    )


    return(
        <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                {!isConnected && notConnected}
                {isConnected && connectSuccess}
            </div>
        </section>
    )
}

export default ConnectMetaMaskPopup;