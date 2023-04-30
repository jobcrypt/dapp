import { isNull } from '../utils/Util';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import { iJCFactoryFacadeAbi } from '../abi/i_jc_factory_facade_core_abi';
import { iOpenProductCoreAbi } from '../abi/i_open_product_core_abi';
import iOpenProductAbi from '../abi/i_open_product_abi';
import { iJCJobPostingEditorAbi } from '../abi/i_jc_job_posting_editor_abi';
import iJCJobPostingAbi from '../abi/i_jc_job_posting_abi';
import { iJCJobSeekerDashboardAbi } from '../abi/i_jc_job_seeker_dashboard_abi';
import { iJCEmployerDashboardAbi } from '../abi/i_jc_employer_dashboard_abi';
import { getContractFromRegistry } from './InitializeContracts';
import { getContractInstance, getContractInstanceWeb3, getProvider, getSigner } from './init';
import { ethers } from 'ethers';
import { sendGetRequest } from '../hooks/useAxios';

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';
const JOBCRYPT_IPFS_URL = "https://jobcrypt.infura-ipfs.io/ipfs/";

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
    let isStaked = false;
    try{
    const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
    if(!isNull(CONTRACTS)){
        const jobCryptAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_CORE')].value;

        const contractInstance = getContractInstance(jobCryptAddress, iJCJobCryptAbi, 'signer');
        isStaked = await contractInstance.isStaked();
    }
  }catch(err){
    console.log(err)
  }

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


export const findEmployerDashboard = async() =>{
  let factoryFacadeAddress = '', result='';
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
      }else{
        factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
      }

      const contractInstance = getContractInstance(factoryFacadeAddress, iJCFactoryFacadeAbi, 'signer');
      result = await contractInstance.findDashboard("EMPLOYER_DASHBOARD_TYPE");
     
}catch(err){
  console.log('err', err)

}
 return result;
}


export const createEmployerDashboard = async() =>{
  let factoryFacadeAddress = '', result='';
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
      }else{
        factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
      }

      const contractInstance = getContractInstance(factoryFacadeAddress, iJCFactoryFacadeAbi, 'signer');
      result = await contractInstance.getDashboard("EMPLOYER_DASHBOARD_TYPE");
     
}catch(err){
  console.log('err', err);

}

 return result;
}

export const loadJobPostings = async() =>{
  let openProductCoreAddress = '', result='';
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        openProductCoreAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_OPEN_PRODUCT_CORE')].value;
      }else{
        openProductCoreAddress = await getContractFromRegistry('RESERVED_OPEN_PRODUCT_CORE');
      }

      const contractInstance = getContractInstance(openProductCoreAddress, iOpenProductCoreAbi, 'provider');
      const productAddresses = await contractInstance.getProducts();
     
      if(!isNull(productAddresses)){
        const addressses = filterOutZeroAddresses(productAddresses);
        result = await getPostingData(addressses);
      }
}catch(err){
  console.log('err', err)

}
 return result;
}

const filterOutZeroAddresses = (addresses) =>{
  return addresses.filter(address=> address !== ZERO_ADDRESS);
}

export const getPostingData = async(addresses) =>{
  let RESULT = [];
  for(let i = 0; i < addresses.length; i++){
    try{
      const address = addresses[i];
      const contractInstance = getContractInstance(address, iOpenProductAbi);
      const name = await contractInstance.getName();
      let price = await contractInstance.getPrice();
      const currency = await contractInstance.getCurrency();
      const decimals = await getDecimal();
      // console.log('Name: ', name,' Price: ', price,' Currency: ', currency);

      price = ethers.utils.formatUnits(price * 0.8, decimals) * (10 ** decimals);

      var optionTxt = name + " - " + formatPrice(price*0.8) + " (ex VAT) [" +formatPrice(price*0.2) + " VAT] You pay: " +  formatPrice(price) +  " (" + currency + ")";
    //  console.log(optionTxt)
    if(!name.toLowerCase().includes('career')){
     RESULT.push({ optionTxt, address });
    }
    }catch(err){

    }
  }

  return RESULT;
}

const formatPrice = (price)=> {
  return price / 1e6;
}


export const createDraftPosting = async(address) =>{
  let factoryFacadeAddress = '', result='';
  console.log('selected address: ', address)
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
      }else{
        factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
      }

      const contractInstance = getContractInstance(factoryFacadeAddress, iJCFactoryFacadeAbi, 'signer');
      result = await contractInstance.createJobPosting(address);
     
}catch(err){
  console.log('err', err)

}

 return result;
}


export const getDraftPosting = async(employerDashAddress)=>{
  let result = [];
    try{
      const contractInstance = getContractInstance(employerDashAddress, iJCEmployerDashboardAbi, 'signer');
      const draftPostingAddresses = await contractInstance.getDraftPostings();
      console.log('------', draftPostingAddresses)
      if(!isNull(draftPostingAddresses)){
         result = await processDraftPosting(draftPostingAddresses);
      }
    }catch(err){
      console.log(err);
    }

    return result;
}

const processDraftPosting = async(draftPostingAddresses) =>{
  let RESULT = [];
  for(let i = 0; i < draftPostingAddresses.length; i++){
    const draftPostingAddress = draftPostingAddresses[i];
  try{
    const contractInstance = getContractInstance(draftPostingAddress, iJCJobPostingAbi, 'signer');
    const status = resolveStatus(await contractInstance.getStatus());
    const productAddress = await contractInstance.getFeatureADDRESS("PRODUCT_FEATURE");
    const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
    const contractInstance2 = getContractInstance(productAddress, iOpenProductAbi, 'signer');
    const name = await contractInstance2.getName();
    if(!name.toLowerCase().includes('career')){
      RESULT.push({
        status, 
        productAddress,
        jobTitle,
        name,
        draftPostingAddress
      })
    }
   

  }catch(err){
    console.log(err)
  }
}

return RESULT;
}

export const editDraftJobInformation = async(draftPostingAddress)=>{
  let INFO = {}, applyLink='';
   try{
    const contractInstance = getContractInstance(draftPostingAddress, iJCJobPostingAbi, 'provider');
    const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
    // console.log('Job title: ', jobTitle);
    const locationType = await contractInstance.getFeatureSTR("JOB_LOCATION_TYPE");
    // console.log('locationType: ', locationType);
    const locationSupport = await contractInstance.getFeatureSTR("JOB_LOCATION_SUPPORT");
    // console.log('locationSupport: ', locationSupport);
    const workLocation = await contractInstance.getFeatureSTR("JOB_WORK_LOCATION");
    // console.log('workLocation: ', workLocation);
    const companyName = await contractInstance.getFeatureSTR("COMPANY_NAME");
    // console.log('Job companyName: ', companyName);
    const companyLink = await contractInstance.getFeatureSTR("COMPANY_LINK");
    // console.log('Job companyLink: ', companyLink);
    let companySummary = await contractInstance.getFeatureSTR("COMPANY_SUMMARY");
    // console.log('Job companySummary: ', companySummary);
    try{
      if(!isNull(companySummary)){
      companySummary = await sendGetRequest(`${JOBCRYPT_IPFS_URL}${companySummary}`);
      }
    }catch(err){
      companySummary = ''
    }
    const workType = await contractInstance.getFeatureSTR("JOB_WORK_TYPE");
    // console.log('Job workType: ', workType);
    const paymentType = await contractInstance.getFeatureSTR("JOB_PAYMENT_TYPE");
    // console.log('Job paymentType: ', paymentType);
    let jobDesc = await contractInstance.getFeatureSTR("JOB_DESCRIPTION");
    // console.log('jobDesc: ', jobDesc);
    try{
      if(!isNull(jobDesc)){
      jobDesc = await sendGetRequest(`${JOBCRYPT_IPFS_URL}${jobDesc}`);
      // console.log('JOB DESCRIPTION: ', jobDesc)
      }
    }catch(err){
      jobDesc = ''
    }
    const searchTerms = await contractInstance.getFeatureSTR("USER_SEARCH_TERMS");
    console.log('Job searchTerms: ', searchTerms);
    try{
     applyLink = await contractInstance.getFeatureSTR("APPLY_LINK");
    // console.log('Job applyLink: ', applyLink);
    }catch(err){
      // console.log('APPLY LINK ERROR: ', err);
    }
    const skills = await contractInstance.getFeatureSTRARRAY("SKILLS_FEATURE");
    // console.log('Job skills: ', skills);
    const searchCategory = await contractInstance.getFeatureSTRARRAY("CATEGORY_FEATURE");
    // console.log('Job searchCategory: ', searchCategory);
    const productAddress = await contractInstance.getFeatureADDRESS("PRODUCT_FEATURE");
    // console.log('Job productAddress: ', productAddress);

    const contractInstance2 = getContractInstance(productAddress, iOpenProductAbi, 'provider');
    let duration = await contractInstance2.getFeatureUINTValue("DURATION");
    // console.log('Job duration: ', duration);
    const price = await contractInstance2.getPrice();
    // console.log('Job price: ', price);
    const erc20 = await contractInstance2.getErc20();
    // console.log('Job erc20: ', erc20);
    const currency = await contractInstance2.getCurrency();
    // console.log('Job currency: ', currency);
    // duration = duration / (7 * 24 * 60 * 60);
    // const week = duration+' Weeks';

    INFO.jobTitle = jobTitle;
    INFO.locationType = locationType;
    INFO.locationSupport = locationSupport;
    INFO.workLocation = workLocation;
    INFO.companyName = companyName;
    INFO.companyLink = companyLink;
    INFO.companySummary = companySummary;
    INFO.paymentType = paymentType;
    INFO.workType = workType;
    INFO.jobDesc = jobDesc;
    INFO.searchTerms = searchTerms;
    INFO.applyLink = applyLink;
    INFO.skills = skills;
    INFO.searchCategory = searchCategory;
    INFO.price = price;
    INFO.erc20 = erc20;
    INFO.currency = currency;
    // INFO.week = week;
    // INFO.duration = duration;
   }catch(err){}

   return INFO;
}



export const findJobSeekerDashboard = async() =>{
  try{
    let factoryFacadeAddress = '', result='';
    try{
        const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
        if(!isNull(CONTRACTS)){
          factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
        }else{
          factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
        }
  
        const contractInstance = getContractInstance(factoryFacadeAddress, iJCFactoryFacadeAbi, 'signer');
        result = await contractInstance.findDashboard("JOBSEEKER_DASHBOARD_TYPE");
       
  }catch(err){
    console.log('err', err)
  
  }
  
   return result;
  }catch(err){}
}


export const createJobSeekerDashboard = async() =>{
  let factoryFacadeAddress = '', result='';
  try{
      const CONTRACTS = JSON.parse(sessionStorage.getItem('contracts'));
      if(!isNull(CONTRACTS)){
        factoryFacadeAddress = CONTRACTS[CONTRACTS.findIndex(item=>item.key === 'RESERVED_JOBCRYPT_FACTORY_FACADE_CORE')].value;
      }else{
        factoryFacadeAddress = await getContractFromRegistry('RESERVED_JOBCRYPT_FACTORY_FACADE_CORE');
      }

      const contractInstance = getContractInstance(factoryFacadeAddress, iJCFactoryFacadeAbi, 'signer');
      result = await contractInstance.getDashboard("JOBSEEKER_DASHBOARD_TYPE");
     
}catch(err){
  console.log('err', err);

}

 return result;
}


//This is for jobseeker
export const getAppliedJobs = async(applicantAddress) =>{
  let result = [];
  try{
    const jobSeekerDashAddress = sessionStorage.getItem('jobseeker_address');

    const contractInstance = getContractInstance(jobSeekerDashAddress, iJCJobSeekerDashboardAbi, 'provider');
    const appliedJobsAddresses = await contractInstance.getAppliedJobs();
    console.log('Applied job addresses: ', appliedJobsAddresses)
    if(!isNull(appliedJobsAddresses)){
     result = await getApplicationData(appliedJobsAddresses, applicantAddress);
    }

  }catch(err){}

  return result;
}

 const getApplicationData = async(appliedJobsAddresses, applicantAddress) =>{
  const APPLICATION_DATA =[];
  for(let i = 0; i < appliedJobsAddresses.length; i++){
    const appliedJobAddress = appliedJobsAddresses[i];
    try{
        const contractInstance = getContractInstance(appliedJobAddress, iJCJobPostingAbi, 'provider');
        const applicantData = await contractInstance.getApplicantData(applicantAddress);
        const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
        const noOfApplicant = await contractInstance. getFeatureUINT("APPLICANT_COUNT_FEATURE");
        const statusCode = await contractInstance.getStatus();
        const status = resolveStatus(statusCode);

        APPLICATION_DATA.push({
           apply_date: applicantData.applicationDate,
           link: applicantData.link,
           jobTitle,
           noOfApplicant,
           status,
           statusCode,
           address: appliedJobAddress
        })
       
    }catch(err){}
  }
    return APPLICATION_DATA;
}


function resolveStatus(x) {
  if(isNull(x))return'';
  if(x === 0 ) {
      return "DRAFT"; 
  }
  if(x === 1 ) {
      return "OPEN"; 
  }
  if(x === 2 ) {
      return "FILLED"; 
  }
  if(x === 3 ) {
      return "CANCELLED"; 
  }
  if(x == 4 ||x == 5 || x == 6 || x == 7 || x == 8) {
      return "EXPIRED"; 
  }
}


export const getJobPosting = async(employerDashAddress) =>{
  console.log('Employer dash address: ', employerDashAddress)
  let result =[]
  try{
      // const employerDashAddress = sessionStorage.getItem('dash');
      if(!isNull(employerDashAddress)){
        const contractInstance = getContractInstance(employerDashAddress, iJCEmployerDashboardAbi, 'signer');
        const postedJobAddresses = await contractInstance.getPostings();
        result = await getJobPostingDetails(postedJobAddresses);
      }
  }catch(err){}

  return result;
}


const getJobPostingDetails = async(postedJobAddresses) =>{
  const JOB_POSTINGS = []; let option1='', option2=''
    for(let i = 0; i < postedJobAddresses.length; i++){
      try{
      const postedJobAddress = postedJobAddresses[i];
      const contractInstance = getContractInstance(postedJobAddress, iJCJobPostingAbi, 'provider');
      let postedDate = await contractInstance.getFeatureUINT("POSTING_DATE_FEATURE");
      const jobTitle = await contractInstance.getFeatureSTR("JOB_TITLE");
      let applicantCount = await contractInstance.getFeatureUINT("APPLICANT_COUNT_FEATURE");
      let expiryDate = await contractInstance.getFeatureUINT("EXPIRY_DATE_FEATURE");
      const status = resolvePostStatus(await contractInstance.getStatus());
            if (status === "DRAFT") {
                console.log("draft");
                 option1 = 'EDIT';
                 option2 = 'ARCHIVE';
            }

            if (status === "POSTED") {
                console.log("posted option");
                 option1 = 'FILL';
                 option2 = 'CANCEL';
            }

            if (status === "EXPIRED") {
                console.log("expired");
                 option1 = 'EXTEND';
                 option2 = 'ARCHIVE';
            }

            if (status === "FILLED" || status === "CANCELLED" || status === "EXPIRED") {
                 option1 = 'ARCHIVE';
            }

            // console.log('PostedDate: ', postedDate)
            // console.log('Expiry date: ', expiryDate)
            // console.log('Job Title: ', jobTitle)
            // console.log('Satus: ', status)
            // console.log('applicant count: ', applicantCount)
            // console.log('options: ', postedJobAddress)
            postedDate = ethers.BigNumber.from(postedDate).toNumber();
            applicantCount = ethers.BigNumber.from(applicantCount).toNumber();
            expiryDate = ethers.BigNumber.from(expiryDate).toNumber()
            JOB_POSTINGS.push({ postedDate, expiryDate, jobTitle, status, applicantCount, options: [option1, option2],  postedJobAddress })
      }catch(err){}
    }

    return JOB_POSTINGS;
}


function resolvePostStatus(x) {
  if(x == 0 ) {
      return "DRAFT"; 
  }
  if(x == 1 ) {
      return "POSTED"; 
  }
  if(x == 2 ) {
      return "FILLED"; 
  }
  if(x == 3 ) {
      return "CANCELLED"; 
  }
  if(x == 4 ) {
      return "EXPIRED"; 
  }
  if(x == 5 ) {
      return "EXTENDED"; 
  }
  if(x == 6 ) {
      return "DEACTIVATED"; 
  }
  if(x == 7 ) {
      return "BARRED"; 
  }
  if(x == 8 ) {
      return "ARCHIVED"; 
  }  
}


export const executeJobPostingAction = async(code, postedJobAddress) =>{
  let saved = false;
  try{
    const contractInstance = getContractInstance(postedJobAddress, iJCJobPostingEditorAbi, 'signer');
    saved = await contractInstance.executePostingAction(code);
  }catch(err){}

  return saved;
}

const filter = ["this", "is", "an", "role", "that", "will", "see", "you", "and", "highly", "active", "in", ",", "the", "a", "how", "when", "where", "who", "why", "then", "into", "insert", "as", "for", "to", "too", "two", "\n", "new", "out"];



export const saveToEVM = async(jobJSON, jobDescriptionHash, companySummaryHash, employerPostingAddress)=> {
  jobJSON = JSON.parse(jobJSON);
  let selectedPostingAddress = employerPostingAddress
  const featureNames = ["JOB_TITLE", "JOB_LOCATION_TYPE", "JOB_LOCATION_SUPPORT", "JOB_WORK_LOCATION", "COMPANY_NAME", "COMPANY_LINK", "COMPANY_SUMMARY", "JOB_WORK_TYPE", "JOB_PAYMENT_TYPE", "JOB_DESCRIPTION", "USER_SEARCH_TERMS", "APPLY_LINK"];
 
  const featureValues = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "", jobJSON.companyLink, companySummaryHash + "", jobJSON.workType + "", jobJSON.paymentType + "", jobDescriptionHash + "", jobJSON.userSearchTerms + "", jobJSON.applicationLink + ""];
  // console.log(featureNames);
  // console.log(featureValues);

const terms = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "", jobJSON.workType + "", jobJSON.paymentType + ""];

  const c = decomposeText(jobJSON.companySummary);
  const u = decomposeText(jobJSON.userSearchTerms);
  const n = decomposeDescription(jobJSON.description);
  // console.log(c);
  // console.log(u);
  // console.log(n);
  const searchTerms = unique(terms.concat(c).concat(u).concat(n));
  // console.log(searchTerms);
  // console.log('i reached here',jobJSON.searchCategories)
  // console.log('i reached here',jobJSON.skillsRequired);
  
  // console.log('posting address: ', selectedPostingAddress);
  // console.log('featured names: ',featureNames);
  // console.log('featured values: ', featureValues);
  // console.log('search categories: ',jobJSON.searchCategories);
  // console.log('skills: ', jobJSON.skillsRequired);
  // console.log('search terms: ', searchTerms);
  const contractInstance = getContractInstance(selectedPostingAddress, iJCJobPostingEditorAbi, 'signer');
  const result = await contractInstance.populate(featureNames, featureValues, jobJSON.searchCategories, jobJSON.skillsRequired, searchTerms);
  console.log('Result after populating: ',result);
  //  setSaveMsg("Saved @> EVM :: " + response.blockHash + " :: IPFS COMPANY SUMMARY HASH :: " +companySummaryHash+"IPFS JOB DESCRIPTION :: " + jobDescriptionHash);
}


function increaseGasLimit(){
   return { gasPrice: Number(51000).toString(16), gasLimit: Number(1000000000000000).toString(16) };
}


function unique(array) {
  // console.log('is uniq array: ', typeof array);
    var q = new Set();
    for (var x = 0; x < array.length; x++) {
        q.add(array[x]);
    }
    return Array.from(q.values());
  }

  function decomposeText(text) {
    // console.log(filter.length);
    // console.log(text);
    // to lower case 
    var lower = text.toLowerCase();
    // split
    var array = lower.split(" ");
    // de-duplicate 
    var q = new Set();
    for (var x = 0; x < array.length; x++) {
        var val = array[x];

        if (val.includes(",")) {
            val = val.replace(",", "");
        }
        // console.log("value: " + val + " filter " + filter.includes(val));

        if (!filter.includes(val)) {
            q.add(val);
        }
    }
    return Array.from(q.values());
}


function decomposeDescription(desc) {
  const ops = desc.ops;
  // console.log('ops: ', ops);
  const duppedTerms = [];
  for (var x = 0; x < ops.length; x++) {
      var insert = ops[x].insert;
      // console.log('insert: ',insert);
      duppedTerms.concat(decomposeText(insert));
  }

  // console.log('----Dupped: ', duppedTerms)
  return unique(duppedTerms);
}
