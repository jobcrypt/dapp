import { isNull } from '../utils/Util';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import iJCJobCryptAbi from '../abi/i_jc_jobcrypt_abi';
import ierc20MetadataAbi from '../abi/i_erc20_metadata_abi';
import { iJCFactoryFacadeAbi } from '../abi/i_jc_factory_facade_core_abi';
import { iOpenProductCoreAbi } from '../abi/i_open_product_core_abi';
import iOpenProductAbi from '../abi/i_open_product_abi';
import { iJCJobPostingEditorAbi } from '../abi/i_jc_job_posting_editor_abi';
import { getContractFromRegistry } from './InitializeContracts';
import { getContractInstance, getSigner } from './init';
import { ethers } from 'ethers';

const ZERO_ADDRESS ='0x0000000000000000000000000000000000000000';


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
     RESULT.push({ optionTxt, address });
    }catch(err){

    }
  }

  return RESULT;
}

const formatPrice = (price)=> {
  return price / 1e6;
}


export const createPosting = async(address) =>{
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



const filter = ["this", "is", "an", "role", "that", "will", "see", "you", "and", "highly", "active", "in", ",", "the", "a", "how", "when", "where", "who", "why", "then", "into", "insert", "as", "for", "to", "too", "two", "\n", "new", "out"];



export const saveToEVM =async(jobJSON, jobDescriptionHash, companySummaryHash)=> {
  jobJSON = JSON.parse(jobJSON);
  const featureNames = ["JOB_TITLE", "JOB_LOCATION_TYPE", "JOB_LOCATION_SUPPORT", "JOB_WORK_LOCATION", "COMPANY_NAME", "COMPANY_LINK", "COMPANY_SUMMARY", "JOB_WORK_TYPE", "JOB_PAYMENT_TYPE", "JOB_DESCRIPTION", "USER_SEARCH_TERMS", "APPLY_LINK"];
  const selectedPostingAddress = sessionStorage.getItem('posting_address');
  // console.log('posting address: ', selectedPostingAddress);

  // console.log({jobDescriptionHash, companySummaryHash});
  const featureValues = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "", jobJSON.companyLink, companySummaryHash + "", jobJSON.workType + "", jobJSON.paymentType + "", jobDescriptionHash + "", jobJSON.userSearchTerms + "", jobJSON.applicationLink + ""];
  // console.log(featureNames);
  // console.log(featureValues);

const terms = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "", jobJSON.workType + "", jobJSON.paymentType + ""];

  const c = decomposeText(jobJSON.companySummary);
  const u = decomposeText(jobJSON.userSearchTerms);
  const n = decomposeDescription(jobJSON.description);
  console.log(c);
  console.log(u);
  console.log(n);
  const searchTerms = unique(terms.concat(c).concat(u).concat(n));
  // console.log(searchTerms);
  // console.log('i reached here',jobJSON.searchCategories)
  // console.log('i reached here',jobJSON.skillsRequired);
  
  console.log('posting address: ', selectedPostingAddress);;
  console.log('featured names: ',featureNames);
  console.log('featured values: ', featureValues);
  console.log('search categories: ',jobJSON.searchCategories);
  console.log('skills: ', jobJSON.skillsRequired);
  console.log('search terms: ', searchTerms);
  const contractInstance = getContractInstance(selectedPostingAddress, iJCJobPostingEditorAbi, 'signer');
   const result = await contractInstance.populate(featureNames, featureValues, jobJSON.searchCategories, jobJSON.skillsRequired, searchTerms);
   console.log('Result after populating: ',result);
  //  setSaveMsg("Saved @> EVM :: " + response.blockHash + " :: IPFS COMPANY SUMMARY HASH :: " +companySummaryHash+"IPFS JOB DESCRIPTION :: " + jobDescriptionHash);
}

function unique(array) {
  console.log('is uniq array: ', typeof array);
    var q = new Set();
    for (var x = 0; x < array.length; x++) {
        q.add(array[x]);
    }
    return Array.from(q.values());
  }

  function decomposeText(text) {
    console.log(filter.length);
    console.log(text);
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
        console.log("value: " + val + " filter " + filter.includes(val));

        if (!filter.includes(val)) {
            q.add(val);
        }
    }
    return Array.from(q.values());
}


function decomposeDescription(desc) {
  const ops = desc.ops;
  console.log('ops: ', ops);
  const duppedTerms = [];
  for (var x = 0; x < ops.length; x++) {
      var insert = ops[x].insert;
      console.log('insert: ',insert);
      duppedTerms.concat(decomposeText(insert));
  }

  console.log('----Dupped: ', duppedTerms)
  return unique(duppedTerms);
}
