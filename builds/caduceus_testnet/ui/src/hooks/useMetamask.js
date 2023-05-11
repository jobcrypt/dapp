import { useContext, useEffect } from "react"
import { isNull, chain } from "../utils/Util";
import { AccountContext } from "../App";
import { useNavigate } from "react-router-dom";



const useMetamask = (path) =>{
    const { setAccount } = useContext(AccountContext);
    const navigate = useNavigate();


    const connect = async() =>{
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
                    if(!isNull(path)){
                      navigate(path);
                    }
                }
               
              }catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask, so add it.
                if (switchError.code === 4902) {
                    console.log('chain does not exist');
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

    return{
        connect
    }
}

export default useMetamask;