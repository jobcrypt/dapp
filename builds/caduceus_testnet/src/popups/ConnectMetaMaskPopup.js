import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { configureChains, useAccount, useConnect, useEnsName} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { optimism } from 'wagmi/chains';


import classes from '../styles/popups/ConnectMetaMaskPopup.module.css';
import cancelIcon from '../assets/x.png';
import metamaskIcon from '../assets/metamask.png';
import connectWalletIcon from '../assets/connectwallet.png';
import successIcon from '../assets/success.png';
// import { connect } from '../store/MetaMaskSlice';
import { isNull, networks } from '../utils/Util';
import { publicProvider } from 'wagmi/providers/public';


const ConnectMetaMaskPopup = (props) =>{
    const { setOpenMetaPopup } = props;
    const navigate = useNavigate();
    const { chains } = configureChains([optimism],[publicProvider()]);
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { connect } = useConnect({
        connector: new InjectedConnector({ chains })
    });
        
    const connectToMetamask = async() =>{
        try{
            //switch network to optimism
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: networks.optimism.chainId }],
            });
            connect(); 

          }catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask, so add it.
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [networks.optimism],
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
            <p>{`You have successfully connected wallet: ${(!isNull(address) && networks.optimism.id === 10)? address.slice(0, 10)+'...'+address.slice(-10) : ''}`}</p>
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