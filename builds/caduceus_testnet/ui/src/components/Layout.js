import { useContext } from 'react';

import classes from '../styles/components/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Header2 from './Header2';
import { useLayoutEffect } from 'react';
import { chain, isNull } from '../utils/Util';
import { AccountContext } from '../App';
import { getIsStaked } from '../contracts/ContractManager';
import useConnectMetaMask from '../hooks/useConnectMetaMask';


const Layout = (props) =>{
    const { children } = props;
    const { account, setAccount, setIsStaked } = useContext(AccountContext);
    const { connect } = useConnectMetaMask('');

    useLayoutEffect(()=>{
        const address = sessionStorage.getItem('address');
        if(!isNull(address)){
            setAccount({ address: address, isConnected: true });
        }else{
            setAccount({ address: '', isConnected: false });
        }

        function chainChanged(chainId){
            window.location.reload();
            console.log('chainId changed to: ', parseInt(chainId))
            if(parseInt(chainId) !== chain.id){
                sessionStorage.removeItem('address');
                setAccount({ wallet: '', isConnected: false });
              }
        }

        function accountChanged(accounts){
            console.log('account changed: ', accounts[0]);
                if(!isNull(accounts[0])){
                    sessionStorage.setItem('address', accounts[0]);
                    setAccount({ address: accounts[0], isConnected: true });
                    getIsStaked().then(isStaked=>{
                        setIsStaked(isStaked)
                    }).catch(err=>{});
                }else{
                    sessionStorage.removeItem('address');
                    setAccount({ address: '', isConnected: false });
                }
        }

        // function handleWindowLoad(){
        //     console.log('page done loading...')
        //     connect();
        // }

        // window.addEventListener('load', handleWindowLoad);

        if(window.ethereum){
            window.ethereum.on('chainChanged', chainChanged);
            window.ethereum.on('accountsChanged', accountChanged);
        }

        return()=>{
            window.ethereum.removeListener('chainChanged', chainChanged);
            window.ethereum.removeListener('accountsChanged', accountChanged);
            // window.removeEventListener('load', handleWindowLoad);
        }
    },[]);


    return(
        <main className={classes.parent}>
            {/* {!account.isConnected? <Header /> : <Header2 />} */}
             <Header2 />
            {children}
            <Footer />
        </main>
    )
}

export default Layout;