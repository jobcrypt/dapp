
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import iJCJobPostingAbi from '../abi/i_jc_job_posting_abi';
import { getContractFromRegistry } from '../contracts/InitializeContracts';
import { getContractInstance } from '../contracts/init';
import { isNull } from '../utils/Util';
import { getApplyLink } from '../contracts/ContractManager';
import { ethers } from 'ethers';

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

export const getFeaturedJobs = async() =>{
    let jobCryptAddress = '', data = [];
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
         jobCryptAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_CORE')].value;
    }else{
        jobCryptAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_CORE')
    }
    const contractInstance = getContractInstance(jobCryptAddress,iJCJobCryptAbi, 'provider');
    const result = await contractInstance.getFeaturedJobs();
    if(!isNull(result[0])){
         const filteredAddresses = filterOutZeroAddresses(result[0]);
         data = await fetchDataForContract(filteredAddresses);
    }
}catch(err){}

    // console.log('FILTERED ADDRESS: ', filteredAddresses)
    return data;
}


const filterOutZeroAddresses = (addresses) =>{
    return addresses.filter(address=> address != ZERO_ADDRESS);
}

const fetchDataForContract = async(addresses) =>{
    let JOB_DATA = [];
    for(let i = 0; i < addresses.length; i++){
        try{
            const postingAddress = addresses[i];
            const contractInstance = getContractInstance(postingAddress, iJCJobPostingAbi, 'signer');
            const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
            const companyName = await contractInstance.getFeatureSTR('COMPANY_NAME');
            const companyLink = await contractInstance.getFeatureSTR('COMPANY_LINK');
            const workType = await contractInstance.getFeatureSTR('JOB_WORK_TYPE');
            const locationType = await contractInstance.getFeatureSTR('JOB_LOCATION_TYPE');
            let postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
            // const applyLink = await getApplyLink(postingAddress);
            if(ethers.BigNumber.isBigNumber(postingDateFeatures)){
                postingDateFeatures = ethers.BigNumber.from(postingDateFeatures).toNumber();
            }
      JOB_DATA.push({
        jobTitle,
        companyName,
        companyLink,
        workType,
        locationType,
        postingDateFeatures,
        // applyLink
      });
    }catch(err){}
    }

    return JOB_DATA;
}