// initialise JobCrypt Core
var jcPaymentManagerContract;
var jcJobCryptContract;
var jcFactoryFacadeContract;
var jcStakeManagerContract; 
var openProductCoreContract;
var ierc20MetaDataContract;


var jcPaymentManagerAddress;
var jcJobCryptAddress;
var jcFactoryFacadeAddress; 
var jcStakeManagerAddress; 
var openProductCoreAddress;
var ierc20MetaDataAddress;

//
const openRegisterAddress = "0xc890253F98072ef23f4a5E8EB42a97284887c78A";
const openRegistryContract = new web3.eth.Contract(iOpenRegisterAbi, openRegisterAddress);

async function configureCoreContracts() {
    console.log("registry contract");
    console.log(openRegistryContract);

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_PAYMENT_MANAGER").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcPaymentManagerAddress = response;
            jcPaymentManagerContract = getContract(iJCPaymentManagerAbi, jcPaymentManagerAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcJobCryptAddress = response;
            jcJobCryptContract = getContract(iJCJobCryptAbi, jcJobCryptAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_FACTORY_FACADE_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcFactoryFacadeAddress = response;
            jcPostingFactoryContract = getContract(iJCFactoryFacadeAbi, jcFactoryFacadeAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_STAKE_MANAGER_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcStakeManagerAddress = response;
            jcStakeManagerContract = getContract(iJCStakeManagerAbi, jcStakeManagerAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("RESERVED_OPEN_PRODUCT_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            openProductCoreAddress = response;
            openProductCoreContract = getContract(iOpenProductCoreAbi, openProductCoreAddress);
            console.log(openProductCoreContract);       
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("JOBCRYPT_STAKE_ERC20_CA").call({from : account})
    .then(function(response){
        console.log(response);
        ierc20MetaDataAddress = response; 
        ierc20MetaDataContract = new web3.eth.Contract(ierc20MetadataAbi, ierc20MetaDataAddress);
        initStakeValues();
        loadCount++;
    })
    .catch(function(err){
        console.log(err);
    });

}

const stakeApproveSpan = ge("stake_approve_span");
const stakeButtonSpan = ge("stake_button_span");
const stakeStatusSpan = ge("stake_status_span");  

var stakeCurrencyAddress; 
var stakeCurrencySymbol;
var minStakeAmount; 
var stakeCurrencySymbol;

async function initStakeValues() { 
    getStakeErc20Currency();
    getStakeCurrencySymbol();
    getMinStakeAmount();     
}

async function getStakeStatus() { 
    jcStakeManagerContract.methods.isStaked(account).call({from : account})
    .then(function(response){
        console.log("checking stake");
        console.log(response);
        var staked = response; 
        if(staked === true) {                    
            stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"unstake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Un-stake</a></small></span>";                    
            getStakedAmount(stakeStatusSpan); 
            stakeApproveSpan.innerHTML = "";
        }
        else{
            stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"stake()\" class=\"ui-component-button ui-component-button-small ui-component-button-secondary \">Stake</a></small></span>"; 
            stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-down\"></i> NOT STAKED - To Apply for jobs, please Stake :: "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</b>";
            stakeApproveSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_approve_button\" onclick=\"approveStake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Approve "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</a></small>";
        }
    })
    .catch(function(err){
        console.log(err);

    });
}

async function getStakedAmount(span) {
    jcStakeManagerContract.methods.getStakedAmount().call({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-up\"></i> STAKED ("+formatCurrency(response)+" "+stakeCurrencySymbol+") </b>";
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getMinStakeAmount() { 
    jcStakeManagerContract.methods.getMinimumStakeAmount().call({from : account})
    .then(function(response){
        console.log(response);
        minStakeAmount = response; 
        getStakeStatus();
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeErc20Currency(){
    jcStakeManagerContract.methods.getStakeErc20Address().call({from : account}) 
    .then(function(response) {
        console.log(response);
        stakeCurrencyAddress = response; 
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeCurrencySymbol() {
   
   ierc20MetaDataContract.methods.symbol().call({from : account})
   .then(function(response){
        console.log(response);
        stakeCurrencySymbol = response;                
   })
   .catch(function(err){
        console.log(err);
   });
}

async function approveStake() { 
    
    ierc20MetaDataContract.methods.approve(jcPaymentManagerAddress, minStakeAmount).send({from : account})
    .then(function(response){
         console.log(response);
         var stakeSpanButton = ge("stake_button");
         stakeSpanButton.disabled = false; 
         var approveStakeButton = ge("stake_approve_button");
         approveStakeButton.disabled = true; 
    })
    .catch(function(err){
         console.log(err);
    });

}

async function stake(){
    jcStakeManagerContract.methods.stake(minStakeAmount).send({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<small style=\"color:green\"> STAKED :: "+formatCurrency(response)+"</small>"; 
        getStakeStatus();                
    })
    .catch(function(err){
        console.log(err);
    });
}

async function unstake() { 
    jcStakeManagerContract.methods.unstake().send({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<small style=\"color:orange\"> UNSTAKED :: "+formatCurrency(response)+"</small>";
        getStakeStatus();
    })
    .catch(function(err){
        console.log(err);
    });
}

function ge(element){
    return document.getElementById(element);
}

function formatCurrency(number) {
    return number / 1e18; 
}

function getContract(abi, address) {
    return new web3.eth.Contract(abi, address);
}

function formatDate(date) {
    return date.toLocaleString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' })
}

function encryptJSON(data) {
    // Encrypt
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    return encrypted;
}

function decryptJSON(data) {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
    var decrypted = SON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
}


function getSeparatedList(list) {
    var separatedValues = "";
    var split = list.split(" ");
    for (var x = 0; x < split.length; x++) {
        separatedValues += split[x] + " | ";
    }
    return separatedValues;
}

function getTimeSincePosting(dateSeconds) {
    return "6 hours";
}

function createTextButton(functionDestination, buttonText) {
    var link = document.createElement("a");
    link.setAttribute("onclick", functionDestination);
    link.setAttribute("style", "color: rgb(18, 22, 236);");
    var bt = document.createTextNode(buttonText);
    link.appendChild(bt);
    return link
}

function createLink(linkDestination, linkText) {
    var link = document.createElement("a");
    link.setAttribute("href", linkDestination);
    linkText = document.createTextNode(linkText);
    link.appendChild(linkText);
    return link;
}

function getTextNode(str) {
    return document.createTextNode(str);
}

function clearSelect(select) {
    var len = select.childNodes.length;
    for (var x = 0; x < len; x++) {
        select.remove(0);
    }
}

function clearTableNoHeader(table) {
    var len = table.childNodes.length;
    for (var x = 0; x < len; x++) {
        table.remove(0);
    }

}