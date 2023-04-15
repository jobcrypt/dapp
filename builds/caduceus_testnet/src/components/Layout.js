import { useSelector, useDispatch } from 'react-redux';


import classes from '../styles/components/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Header2 from './Header2';
import { connect, stake } from '../store/MetaMaskSlice';
import { isNull } from '../utils/Util';
import { useEffect, useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { iOpenRankingCoreAbi } from '../abi/i_open_ranking_core_abi';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Layout = (props) =>{
    const { children } = props;
    // const isConnected = useSelector(state=>state.meta.isConnected);
    const dispatch = useDispatch();
    const { isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();


    useLayoutEffect(()=>{
        try{
            if(window.ethereum){
                window.ethereum.on('chainChanged', function(chainId){
                    // console.log('Network change detected: ', parseInt(chainId));
                    const id = parseInt(chainId);
                    if(id === 10)connect();
                    else disconnect();
                })
                // window.ethereum.on('accountsChanged', function(account){
                //     console.log('account change detected', account);
                // })
            }
        }catch(err){
            
        }
    },[]);

    useEffect(()=>{
        const session = sessionStorage.getItem('wallet');
        if(!isNull(session)){
            dispatch(connect({ wallet: session }));
            <Navigate to='/browse-job' />
        }
        const staked = JSON.parse(sessionStorage.getItem('staked'));
        if(staked)dispatch(stake());


    },[]);


    return(
        <main className={classes.parent}>
            {!isConnected &&<Header />}
            {isConnected && <Header2 />}
            {children}
            <Footer />
        </main>
    )
}

export default Layout;