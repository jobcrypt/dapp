import { isNull } from '../utils/Util';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import { getContractFromRegistry } from './InitializeContracts';
import { getContractInstance } from './init';


export const getMinStakeAmount = async() =>{
    let minStakeAmount = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
    const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

    const contract = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
    minStakeAmount = await contract.getMinimumStakeAmount();

    }

    return minStakeAmount;
}

export const getStakeErc20Address = async() =>{
    let erc20Address = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
        erc20Address = await contractInstance.getStakeErc20Address();
    }

  return erc20Address;
}

export const getStakedAmount = async() =>{
    let stakedAMount = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(stakeAddress,iJCStakeManagerAbi, 'provider');
        stakedAMount = await contractInstance.getStakedAmount();
    }

  return stakedAMount;
}

export const getIsStaked = async() =>{
    let isStaked = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const jobCryptAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_CORE')].value;

        const contractInstance = getContractInstance(jobCryptAddress,iJCJobCryptAbi, 'provider');
        isStaked = await contractInstance.isStaked();
    }

  return isStaked;;
}

export const getSymbol = async() =>{
    let symbol = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'provider');
        symbol = await contractInstance.symbol();
    }
  return symbol;
}

export const getDecimal = async() =>{
    let decimals = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'provider');
        decimals = await contractInstance.decimals();
    }

  return decimals;
}


export const approveStake = async() =>{
    let decimals = '';
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const stakeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_STAKE_MANAGER_CORE')].value;

        const contractInstance = getContractInstance(await getStakeErc20Address(), ierc20MetadataAbi, 'signer');
        decimals = await contractInstance.approve(stakeAddress, await getMinStakeAmount());
    }

  return decimals;
}