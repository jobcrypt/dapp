
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import iJCJobPostingAbi from '../abi/i_jc_job_posting_abi';
import { getContractFromRegistry } from '../contracts/InitializeContracts';
import { getContractInstance } from '../contracts/init';
import { isNull } from '../utils/Util';
import { sendGetRequest } from '../hooks/useAxios';
import { getApplyLink } from '../contracts/ContractManager';
// import { JOBCRYPT_IPFS_URL } from '../contracts/IPFS';

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';
const JOBCRYPT_IPFS_URL = "https://jobcrypt.infura-ipfs.io/ipfs/";


export const getLatestJobs = async(offset) =>{
    let jobCryptAddress = '', data = [];
    try{
        const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
        if(!isNull(CONTRACTS)){
            jobCryptAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_CORE')].value;
        }else{
            jobCryptAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_CORE')
        }
        const contractInstance = getContractInstance(jobCryptAddress,iJCJobCryptAbi, 'provider');
        const result = await contractInstance.getActiveJobPage(offset);
        if(!isNull(result[0])){
            const filteredAddresses = filterOutZeroAddresses(result[0]);
            data = await fetchDataForContract(filteredAddresses);
        }

    }catch(err){}
    // console.log('FILTERED ADDRESS: ', filteredAddresses)
    return data;
}

const filterOutZeroAddresses = (addresses) =>{
    return addresses.filter(address=> address !== ZERO_ADDRESS);
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
            const applyLink = await getApplyLink(postingAddress)
            let postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
            postingDateFeatures = new Date(parseInt(postingDateFeatures));

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

export const getLatestJobDetails = async(postingAddress, isStaked) =>{
    let JOB_DATA = [], applyLink='', companySummary='', jobDesc ='';
    try{
        const contractInstance = getContractInstance(postingAddress, iJCJobPostingAbi, 'signer');
        const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
        const companyName = await contractInstance.getFeatureSTR('COMPANY_NAME');
        const companyLink = await contractInstance.getFeatureSTR('COMPANY_LINK');
        const workType = await contractInstance.getFeatureSTR('JOB_WORK_TYPE');
        const locationType = await contractInstance.getFeatureSTR('JOB_LOCATION_TYPE');
        let postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
        try{
            companySummary = await contractInstance.getFeatureSTR('COMPANY_SUMMARY');
            companySummary = await sendGetRequest(`${JOBCRYPT_IPFS_URL}${companySummary}`);
        }catch(err){
            companySummary = 'Company Summary not available at the moment.'
        }
        const jobPaymentType = await contractInstance.getFeatureSTR('JOB_PAYMENT_TYPE');
        const jobLocationSupport = await contractInstance.getFeatureSTR('JOB_LOCATION_SUPPORT');
        const categoryFeature = await contractInstance.getFeatureSTRARRAY("CATEGORY_FEATURE");
        const skillsFeature = await contractInstance.getFeatureSTRARRAY("SKILLS_FEATURE");
        try{
            jobDesc = await contractInstance.getFeatureSTR("JOB_DESCRIPTION");
            const result = await sendGetRequest(`${JOBCRYPT_IPFS_URL}${jobDesc}`);
            if(!isNull(result.ops[0])){
                jobDesc = result.ops[0].insert
            }
            // console.log('job desc: ', jobDesc)
        }catch(err){
            jobDesc = 'Job description not available at the moment.'
        }
        try{
            if(isStaked) applyLink = await contractInstance.getFeatureSTR("APPLY_LINK");
            // console.log('apply link: ', applyLink)
            // console.log('staked: ', isStaked)
        }catch(err){
            // console.log('APPLY LINK is empty')
        }

        postingDateFeatures = new Date(parseInt(postingDateFeatures));
        // console.log(jobLocationSupport);

        // const result = await sendGetRequest(`${JOBCRYPT_IPFS_URL}${jobDesc}`);
        // if(!isNull(result.ops[0])){
        //     jobDesc = result.ops[0].insert
        // }
        JOB_DATA.push({
            jobTitle,
            companyName,
            companyLink,
            workType,
            locationType,
            postingDateFeatures,
            companySummary,
            jobPaymentType,
            jobLocationSupport,
            categoryFeature,
            skillsFeature,
            jobDesc,
            applyLink
        });
    }catch(err){}
      return JOB_DATA;
}
