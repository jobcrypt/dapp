import { ethers } from 'ethers';


let provider = null, signer = null;
if(window.ethereum){
 provider = new ethers.providers.Web3Provider(window.ethereum);
 signer = provider.getSigner();
}

export const getContractInstance = (address, abi, providerOrSigner) =>{
  let providerOrSigner_;
  if(providerOrSigner === 'provider') providerOrSigner_ = provider;
  else providerOrSigner_ = signer
  return new ethers.Contract(address, abi, providerOrSigner_);
}

export const getProvider = () =>{
  return provider;
}

export const getSigner = () =>{
  return signer;
}
