import { useState, useCallback, useEffect } from "react"
import { isNull } from "../utils/Util";



const useConnectWallet = () =>{
    //  const [ walletData, setWalletData ] = useState({isConnected: false, wallet: ''});
     const [ wallet, setWallet ] = useState('');
     const [ isConnected, setIsConnected ] = useState(false);

     const update = ()=>{
       const wallet = sessionStorage.getItem('user');
       if(!isNull(wallet)){
            setWallet(wallet);
            setIsConnected(true);
       }
     }

    useEffect(()=>{
        update();
    },[]);


    const updateConnnectedState = (isConnected) =>{
        // setWalletData(prev=>({...prev, isConnected}));
        setIsConnected(isConnected);
    }

    const updateConnectedWallet = (wallet) =>{
        if(!isNull(wallet))sessionStorage.setItem('user', wallet);
        // setWalletData(prev=>({...prev, wallet}));
        setWallet(wallet);
        // setIsConnected(true);
    }

    const updateConnectedWalletAll = (wallet, isConnected) =>{
        // setWalletData({ wallet, isConnected });
        setWallet(wallet);
        setIsConnected(true);
    }

    const wipeWalletData = () =>{
        // setWalletData({ wallet: '', isConnected: false });
        sessionStorage.removeItem('user');
        setWallet('');
        setIsConnected(false);
    }


    return{
        updateConnectedWallet,
        updateConnnectedState,
        updateConnectedWalletAll,
        wipeWalletData,
        wallet: wallet,
        isConnected: isConnected
    }
}

export default useConnectWallet;