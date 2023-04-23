
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import iJCJobPostingAbi from '../abi/i_jc_job_posting_abi';
import { getContractFromRegistry } from '../contracts/InitializeContracts';
import { getContractInstance } from '../contracts/init';
import { isNull } from '../utils/Util';
import { sendGetRequest } from '../hooks/useAxios';

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';
const IPFS_URL = "https://jobcrypt.infura-ipfs.io/ipfs/";

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
            const address = addresses[i];
            const contractInstance = getContractInstance(address, iJCJobPostingAbi, 'provider');
            const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
            const companyName = await contractInstance.getFeatureSTR('COMPANY_NAME');
            const companyLink = await contractInstance.getFeatureSTR('COMPANY_LINK');
            const workType = await contractInstance.getFeatureSTR('JOB_WORK_TYPE');
            const locationType = await contractInstance.getFeatureSTR('JOB_LOCATION_TYPE');
            let postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
            postingDateFeatures = new Date(parseInt(postingDateFeatures));

      JOB_DATA.push({
        jobTitle,
        companyName,
        companyLink,
        workType,
        locationType,
        postingDateFeatures,
        address
      })
    }catch(err){}
    }

    return JOB_DATA;
}

export const getLatestJobDetails = async(postingAddress, isStaked) =>{
    console.log('posting address: ', postingAddress)
    let JOB_DATA = [], applyLink='';
    try{
        const contractInstance = getContractInstance(postingAddress, iJCJobPostingAbi, 'provider');
        const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
        const companyName = await contractInstance.getFeatureSTR('COMPANY_NAME');
        const companyLink = await contractInstance.getFeatureSTR('COMPANY_LINK');
        const workType = await contractInstance.getFeatureSTR('JOB_WORK_TYPE');
        const locationType = await contractInstance.getFeatureSTR('JOB_LOCATION_TYPE');
        let postingDateFeatures = await contractInstance.getFeatureUINT('POSTING_DATE_FEATURE');
        let companySummary = await contractInstance.getFeatureSTR('COMPANY_SUMMARY');
        const jobPaymentType = await contractInstance.getFeatureSTR('JOB_PAYMENT_TYPE');
        const jobLocationSupport = await contractInstance.getFeatureSTR('JOB_LOCATION_SUPPORT');
        const categoryFeature = await contractInstance.getFeatureSTRARRAY("CATEGORY_FEATURE");
        const skillsFeature = await contractInstance.getFeatureSTRARRAY("SKILLS_FEATURE");
        let jobDesc = await contractInstance.getFeatureSTR("JOB_DESCRIPTION");
        if(isStaked) applyLink = await contractInstance.getFeatureSTR('APPLY_LINK');
        postingDateFeatures = new Date(parseInt(postingDateFeatures));
        console.log(jobLocationSupport)

        const result = await sendGetRequest(`${IPFS_URL}${jobDesc}`);
        if(!isNull(result.ops[0])){
            jobDesc = result.ops[0].insert
        }

        companySummary = await sendGetRequest(`${IPFS_URL}${companySummary}`);

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