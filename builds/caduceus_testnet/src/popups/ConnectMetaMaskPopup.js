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

const ConnectMetaMaskPopup = (props) =>{
    const { setOpenMetaPopup, setDispatch } = props;
    const navigate = useNavigate();
    const { account, setAccount } = useContext(AccountContext);
 

    const connectToMetamask = async() =>{
        if(window.ethereum){
        try{
            //switch network to sepolia
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chain.chainId }],
            });
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            if(!isNull(accounts)){
                setAccount({ address: accounts[0], isConnected: true });
                sessionStorage.setItem('address', accounts[0]);
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
    }

    const navigateAndClose = (path) =>{
        navigate(path);
        setOpenMetaPopup(false);
        if(!isNull(setDispatch)){
            setDispatch({ TYPE: 'DASHBOARD', status: false })
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
             <button className={classes.metaBtn} onClick={connectToMetamask}>
                 <img src={metamaskIcon} alt='' />
                 Connect MetaMask
             </button>
         </div>
        </div>
       </section> 
    )

    const connectSuccess = (
        <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
        <div className={classes.box} onClick={(e)=>e.stopPropagation()}>

        <header className={classes.header}>
            <span className={classes.cancelContainer} onClick={()=>setOpenMetaPopup(false)}>
                <img src={cancelIcon} alt='' />
            </span>
        </header>
        <div className={classes.successContainer}>
            <img src={successIcon} alt='' />
            <h1>Success!!!</h1>
            <p>{`You have successfully connected wallet: ${(!isNull(account.address))? account.address.slice(0, 10)+'...'+account.address.slice(-10) : ''}`}</p>
        </div>
        <div className={classes.jobsBtnContainer}>
            <button className={classes.browseBtn} onClick={()=>navigateAndClose('/browse-job')}>Browse Jobs</button>
            <button className={classes.postBtn} onClick={()=>navigateAndClose('/post_job')}>Post Jobs</button>
        </div>
         </div>
       </section> 
    )


    const element = (
        <section className={classes.parent} onClick={()=>setOpenMetaPopup(false)}>
        {/* <div className={classes.box} onClick={(e)=>e.stopPropagation()}> */}
            
            {account.isConnected? connectSuccess : notConnected}
        {/* </div> */}
       </section> 
    )
    // return ReactDOM.createPortal(account.isConnected? connectSuccess : notConnected, document.getElementById('layout'));
    return element;
}

export default ConnectMetaMaskPopup;