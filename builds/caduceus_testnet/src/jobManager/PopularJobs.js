import {iOpenRankingCoreAbi} from '../abi/i_open_ranking_core_abi';
import iJCJobPostingAbi from '../abi/i_jc_job_posting_abi';
import iJCSortableAbi from '../abi/i_jc_sortable_abi';
import { getContractFromRegistry } from '../contracts/InitializeContracts';
import { getContractInstance } from '../contracts/init';
import { isNull } from '../utils/Util';
import { getApplyLink } from '../contracts/ContractManager';


const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';

export const getPopularJobs = async() =>{
    let openRankingAddress = '', data = [];
    try{
        const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
        if(!isNull(CONTRACTS)){
            openRankingAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_OPEN_RANKING_CORE')].value;
        }else{
            openRankingAddress = await getContractFromRegistry('RESERVED_OPEN_RANKING_CORE');
        }
        const contractInstance = getContractInstance(openRankingAddress,iOpenRankingCoreAbi, 'provider');
        const result = await contractInstance.getRanking('POPULAR_JOBS_RANKING_LIST', 10);
        // console.log('Popular jobs', result);

        if(!isNull(result)){
            const filteredAddresses = filterOutZeroAddresses(result);
            data = await getSortableAddresses(filteredAddresses);
        }
}catch(err){}

    return data;
}


const filterOutZeroAddresses = (addresses) =>{
    return addresses.filter(address=> address != ZERO_ADDRESS);
}

const getSortableAddresses = async(addresses) =>{
    let POSTING_ARRAY =[];
    for(let i = 0; i < addresses.length; i++){
        try{
            const address = addresses[i];
            const contractInstance = getContractInstance(address, iJCSortableAbi, 'provider');
            const postingAddresses = await contractInstance.getJobPostingAddress();
            POSTING_ARRAY.push(postingAddresses);
            // console.log(postingAddresses)
        }catch(err){}
    }

   const data = await fetchDataForContract(POSTING_ARRAY);

   return data;
}


const fetchDataForContract = async(addresses) =>{
    let JOB_DATA = [];
    for(let i = 0; i < addresses.length; i++){
        try{
            const postingAddress = addresses[i];
            const contractInstance = getContractInstance(postingAddress, iJCJobPostingAbi, 'provider');
            const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
            const companyName = await contractInstance.getFeatureSTR('COMPANY_NAME');
            const companyLink = await contractInstance.getFeatureSTR('COMPANY_LINK');
            const workType = await contractInstance.getFeatureSTR('JOB_WORK_TYPE');
            const locationType = await contractInstance.getFeatureSTR('JOB_LOCATION_TYPE');
            const postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
            const applyLink = await getApplyLink(postingAddress);
      JOB_DATA.push({
        jobTitle,
        companyName,
        companyLink,
        workType,
        locationType,
        postingDateFeatures,
        postingAddress,
        applyLink
      })
    }catch(err){}
    }

    return JOB_DATA;
}