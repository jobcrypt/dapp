import { isNull } from '../utils/Util';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import { iJCFactoryFacadeAbi } from '../abi/i_jc_factory_facade_core_abi';

import { getContractFromRegistry } from './InitializeContracts';
import { getContractInstance } from './init';


export const getMinStakeAmount = async() =>{
    let minStakeAmount = '';
    try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
      const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

      const contract = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
      minStakeAmount = await contract.getMinimumStakeAmount();
    }
  }catch(err){}
    return minStakeAmount;
}

export const getStakeErc20Address = async() =>{
    let erc20Address = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
        erc20Address = await contractInstance.getStakeErc20Address();
    }
  }catch(err){}

  return erc20Address;
}

export const getStakedAmount = async() =>{
    let stakedAMount = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
        stakedAMount = await contractInstance.getStakedAmount();
    }
  }catch(err){}

  return stakedAMount;
}

export const getIsStaked = async() =>{
    let isStaked = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const jobCryptAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_CORE')].value;

        const contractInstance = getContractInstance(jobCryptAddress,iJCJobCryptAbi, 'provider');
        isStaked = await contractInstance.isStaked();
    }
  }catch(err){}

  return isStaked;;
}

export const getSymbol = async() =>{
    let symbol = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'provider');
        symbol = await contractInstance.symbol();
    }
  }catch(err){}
  return symbol;
}

export const getDecimal = async() =>{
    let decimals = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'provider');
        decimals = await contractInstance.decimals();
    }
  }catch(err){}

  return decimals;
}


export const approveStake = async() =>{
    let approve = '';
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'signer');
        approve = await contractInstance.approve(stakeAddress, await getMinStakeAmount());
    }
  }catch(err){}

  return approve;
}

export const stake = async() =>{
  let decimals = '';
  try{
  const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
  if(!isNull(CONTRACTS)){
      const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

      const contractInstance = getContractInstance(stakeAddress, iJCStakeManagerAbi, 'signer');
      decimals = await contractInstance.stake(await getMinStakeAmount());
  }
}catch(err){}

return decimals;
}

export const unstake = async() =>{
  let decimals = '';
  try{
  const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
  if(!isNull(CONTRACTS)){
      const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

      const contractInstance = getContractInstance(stakeAddress, iJCStakeManagerAbi, 'signer');
      decimals = await contractInstance.unstake();
  }
}catch(err){}

return decimals;
}


//------------------------------Everything about staking end-----------------------//


export const createEmployerDashboard = async() =>{
  console.log('i entered')
  let factoryFacadeAddress = '', result='';
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
      }else{
        factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
      }
      console.log('i entered2')

      const contractInstance = getContractInstance(factoryFacadeAddress,iJCFactoryFacadeAbi, 'signer');
      result = await contractInstance.getDashboard("EMPLOYER_DASHBOARD_TYPE");
     
}catch(err){
  console.log('err', err)

}

 return result;
}
