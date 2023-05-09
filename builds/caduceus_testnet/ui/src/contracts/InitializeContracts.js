// import { readContracts } from "wagmi"



import iOpenRegisterAbi from '../abi/i_open_register_abi';
import { REGISTRY_ADDRESS, isNull } from "../utils/Util";
import { getContractInstance } from "./init";


const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

     export const reegistryGetSingleContract = async(type) =>{
        const contract = getContractInstance(REGISTRY_ADDRESS, iOpenRegisterAbi, 'provider');
        return await contract.getAddress(type);
        
     }

     export const registryGetAllContracts = async() =>{
        sessionStorage.removeItem('contracts');
        let CONTRACT_ADDRESSES = [];
        const contract = getContractInstance(REGISTRY_ADDRESS, iOpenRegisterAbi, 'provider');
        const RESERVED_OPEN_PRODUCT_CORE = await contract.getAddress('RESERVED_OPEN_PRODUCT_CORE');
        const RESERVED_OPEN_RANKING_CORE = await contract.getAddress('RESERVED_OPEN_RANKING_CORE');
        const RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE = await contract.getAddress('RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE');
        const RESERVED_JOBCRYPT_CORE = await contract.getAddress('RESERVED_JOBCRYPT_CORE');
        const RESERVED_JOBCRYPT_FACTORY_FACADE_CORE = await contract.getAddress('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
        const RESERVED_JOBCRYPT_STAKE_MANAGER_CORE = await contract.getAddress('RESERVED_JOBCRYPT_STAKE_MANAGER_CORE');
        const RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE = await contract.getAddress('RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE');

        if(!isNull(RESERVED_OPEN_PRODUCT_CORE) && RESERVED_OPEN_PRODUCT_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_OPEN_PRODUCT_CORE',
                value: RESERVED_OPEN_PRODUCT_CORE})
        }
        if(!isNull(RESERVED_OPEN_RANKING_CORE) && RESERVED_OPEN_RANKING_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_OPEN_RANKING_CORE',
                value: RESERVED_OPEN_RANKING_CORE})
        }
        if(!isNull(RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE) && RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE',
                value: RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE})
        }
        if(!isNull(RESERVED_JOBCRYPT_CORE) && RESERVED_JOBCRYPT_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_JOBCRYPT_CORE',
                value: RESERVED_JOBCRYPT_CORE})
        }
        if(!isNull(RESERVED_JOBCRYPT_FACTORY_FACADE_CORE) && RESERVED_JOBCRYPT_FACTORY_FACADE_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE',
                value: RESERVED_JOBCRYPT_FACTORY_FACADE_CORE})
        }
        if(!isNull(RESERVED_JOBCRYPT_STAKE_MANAGER_CORE) && RESERVED_JOBCRYPT_STAKE_MANAGER_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE',
                value: RESERVED_JOBCRYPT_STAKE_MANAGER_CORE})
        }
        if(!isNull(RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE) && RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE !== ZERO_ADDRESS){
            CONTRACT_ADDRESSES.push({
                key: 'RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE',
                value: RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE})
        }

        // console.log(CONTRACT_ADDRESSES);
       
        sessionStorage.setItem('contracts', JSON.stringify(CONTRACT_ADDRESSES));
     }

    export const getContractFromRegistry = async(type) =>{
        const contract = getContractInstance(REGISTRY_ADDRESS, iOpenRegisterAbi, 'provider');
        return await contract.getAddress(type);
     }