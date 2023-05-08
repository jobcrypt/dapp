import CryptoJS from 'crypto-js';
import { create } from 'ipfs-http-client';

// ipfs connect 
const px 			    = "32gRYwh36BEdK7HufbWmyDsD2Q4P2fT9Q9yCgsmKGpJoghRdyt9mynndPpUQhA5vkfMgXFC6kTQ0zKjBR0czwrwNY341voDv1wah"; 
const INFURA_ID 	    = "U2FsdGVkX1/BRWcf69vfyEuPoyPPv76lxeITlpe+lLRVkUpvlPPGHB9V/gv2F3+g"; 
const INFURA_SECRETKEY  = "U2FsdGVkX1+6ANshPPH82m5ApGpfUwR8c4Xnssfc8VunGy2ocrzHpoEn6t+p7UBy0mFO+W+djcSbR9fJ6pACJw=="; 


const getBase64 = () =>{
    return `Basic ${window.btoa(CryptoJS.AES.decrypt(INFURA_ID, px).toString(CryptoJS.enc.Utf8) +':' + CryptoJS.AES.decrypt(INFURA_SECRETKEY, px).toString(CryptoJS.enc.Utf8))}`;
}

export const getHashFromIpfs = async(value) =>{
    let data='';
    try{
    const ipfs = create({ url: 'https://ipfs.infura.io:5001', headers: { Authorization: getBase64()  }});
    data = await ipfs.add(value);
    console.log(data);
   
    }catch(err){}
    return data.path || '';
}

