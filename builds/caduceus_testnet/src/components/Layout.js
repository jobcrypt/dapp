import { useSelector, useDispatch } from 'react-redux';


import classes from '../styles/components/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Header2 from './Header2';
import { useLayoutEffect } from 'react';
import { chain, isNull } from '../utils/Util';
import { connectUser, disconnectUser } from '../store/UserWalletSlice';


const Layout = (props) =>{
    const { children } = props;
    const isConnected = useSelector(state=>state.user.isConnected);
    const dispatch = useDispatch();


    useLayoutEffect(()=>{
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if(!isNull(userData)){
            const wallet = userData.wallet;
            dispatch(connectUser({ wallet: wallet }));
        }else{
            dispatch(disconnectUser());
        }

        if(window.ethereum){
            window.ethereum.on('chainChanged', (chainId)=>{
               if(chainId !== chain.id){
                 sessionStorage.removeItem('user');
                 dispatch(disconnectUser());
               }
            });

            window.ethereum.on('accountsChanged', (accounts)=>{
                if(!isNull(accounts)){
                    sessionStorage.setItem('user', JSON.stringify({ wallet: accounts[0] }))
                    dispatch(connectUser({ wallet: accounts[0] }));
                }else{
                    sessionStorage.removeItem('user');
                    dispatch(disconnectUser()); 
                }
            });
        }
    },[]);


    return(
        <main className={classes.parent}>
            {!isConnected? <Header /> : <Header2 />}
            {children}
            <Footer />
        </main>
    )
}

export default Layout;