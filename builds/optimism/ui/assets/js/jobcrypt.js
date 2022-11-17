// initialise JobCrypt Core
var jcPaymentManagerContract;
var jcJobCryptContract;
var jcFactoryFacadeContract;    
var jcStakeManagerContract; 
var openProductCoreContract;

var jcPaymentManagerAddress;
var jcJobCryptAddress;
var jcFactoryFacadeAddress; 
var jcStakeManagerAddress; 
var openProductCoreAddress;

// const usdcfaucetButtonSpan = ge("usdc_faucet_button_span");
// const wethfaucetButtonSpan = ge("weth_faucet_button_span");
//
// const openRegisterAddress = "0x4d7AC8C6602083F1f9b56fe6B4fb0BCD2C44eC41";

const openRegisterAddress = "0xB5fC104567DC63E6D9cde372c518E6CCadfD3C32";
const openRegistryContract = new web3.eth.Contract(iOpenRegisterAbi, openRegisterAddress);

async function configureContracts(requiredContracts) {
    console.log("registry contract");
    console.log(openRegistryContract);

    console.log(requiredContracts);

    if(requiredContracts.includes("OPEN_PRODUCT")){
        openRegistryContract.methods.getAddress("RESERVED_OPEN_PRODUCT_CORE").call({ from: account })
            .then(function(response) {
                console.log(response);
                openProductCoreAddress = response;
                openProductCoreContract = getContract(iOpenProductCoreAbi, openProductCoreAddress);
                console.log("OPEN_PRODUCT");
                console.log(openProductCoreContract);       
                
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    if(requiredContracts.includes("OPEN_RANKING")){
        openRegistryContract.methods.getAddress("RESERVED_OPEN_RANKING_CORE").call({ from: account })
            .then(function(response) {
                console.log(response);
                openRankingCoreAddress = response;
                openRankingCoreContract = getContract(iOpenRankingCoreAbi, openRankingCoreAddress); 
                console.log("OPEN_RANKING");
                console.log(openRankingCoreContract);                     
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    if(requiredContracts.includes("PAYMENT_MANAGER")){
        openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE").call({ from: account })
            .then(function(response) {
                console.log("PAYMENT MANAGER ADDRESS");
                console.log(response);
                jcPaymentManagerAddress = response;
                jcPaymentManagerContract = getContract(iJCPaymentManagerAbi, jcPaymentManagerAddress);
                console.log("PAYMENT_MANAGER");
                console.log(jcPaymentManagerContract);
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    if(requiredContracts.includes("JOBCRYPT_CORE")){
        openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_CORE").call({ from: account })
            .then(function(response) {
                console.log(response);
                jcJobCryptAddress = response;
                jcJobCryptContract = getContract(iJCJobCryptAbi, jcJobCryptAddress);
                console.log("JOBCRYPT_CORE");
                console.log(jcJobCryptContract);
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    if(requiredContracts.includes("FACTORY_FACADE")){
        openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_FACTORY_FACADE_CORE").call({ from: account })
            .then(function(response) {
                console.log(response);
                jcFactoryFacadeAddress = response;
                console.log(iJCFactoryFacadeAbi);
                jcFactoryFacadeContract = getContract(iJCFactoryFacadeAbi, jcFactoryFacadeAddress);
                console.log("FACTORY_FACADE");
                console.log(jcFactoryFacadeContract);
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    if(requiredContracts.includes("STAKE_MANAGER")){
        openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_STAKE_MANAGER_CORE").call({ from: account })
            .then(function(response) {
                console.log(response);
                jcStakeManagerAddress = response;
                jcStakeManagerContract = getContract(iJCStakeManagerAbi, jcStakeManagerAddress);
                console.log("STAKE_MANAGER");
                console.log(jcStakeManagerContract);
                initStakeValues();
                loadCount++;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
/*    
    if(requiredContracts.includes("STAKE_MANAGER")){
        // REMOVE FOR LIVE
        // console.log("loading faucet");
        // loadFaucet();
    }
*/  
}

 

var stakeCurrencyAddress; 
var stakeCurrencySymbol;
var minStakeAmount; 
var stakeCurrencySymbol;
var stakeErc20CurrencyContract; 

async function initStakeValues() { 
    getStakeErc20Currency();     
}


async function getStakeErc20Currency(){
    console.log(jcStakeManagerContract);
    jcStakeManagerContract.methods.getStakeErc20Address().call({from : account}) 
    .then(function(response) {
        console.log(response);
        stakeCurrencyAddress = response; 
        stakeErc20CurrencyContract = new web3.eth.Contract(ierc20MetadataAbi, stakeCurrencyAddress); 
        getStakeCurrencySymbol();
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeCurrencySymbol() {
   
    stakeErc20CurrencyContract.methods.symbol().call({from : account})
    .then(function(response){
         console.log(response);
         stakeCurrencySymbol = response; 
         getMinStakeAmount();               
    })
    .catch(function(err){
         console.log(err);
    });
}

async function getMinStakeAmount() { 
    console.log(jcStakeManagerContract);
    jcStakeManagerContract.methods.getMinimumStakeAmount().call({from : account})
    .then(function(response){
        console.log(response);
        minStakeAmount = response; 
        console.log("minStakeAmount" + minStakeAmount);  
        getStakeStatus();      
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeStatus() { 
   

    console.log(jcStakeManagerContract);
    jcStakeManagerContract.methods.isStaked(account).call({from : account})
    .then(function(response){
        console.log("checking stake");
        var stakeApproveSpan = ge("stake_approve_span");
        console.log(stakeApproveSpan);
        var stakeButtonSpan = ge("stake_button_span");
        console.log(stakeButtonSpan);
        var stakeStatusSpan = ge("stake_status_span"); 
        console.log(stakeStatusSpan);
        console.log(response);
        var staked = response; 
        if(staked === true) {                    
            stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"unstake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Un-stake</a></small></span>";                                
            getStakedAmount();            
            stakeApproveSpan.innerHTML = "";
        }
        else{
            stakeButtonSpan.innerHTML = "<small>Approve FIRST to Stake</small>"
            stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-down\"></i> NOT STAKED - To Apply for jobs, please Stake :: "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</b>";
            stakeApproveSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_approve_button\" onclick=\"approveStake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Approve "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</a></small>";
        }
    })
    .catch(function(err){
        console.log(err);

    });
}

async function getStakedAmount() {
    console.log(jcStakeManagerContract);
    jcStakeManagerContract.methods.getStakedAmount().call({from : account})
    .then(function(response){
        console.log(response);
        var stakeStatusSpan = ge("stake_status_span"); 
        stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-up\"></i> STAKED ("+formatCurrency(response)+" "+stakeCurrencySymbol+") </b>";
    })
    .catch(function(err){
        console.log(err);
    });
}

async function approveStake() { 
    
    jcStakeManagerContract.methods.getStakeErc20Address().call({from : account}) 
    .then(function(response) {
        console.log("Stake Currency " +response);
        stakeCurrencyAddress = response; 
            var stakeCurrencyContract = new web3.eth.Contract(ierc20MetadataAbi, stakeCurrencyAddress); 
            stakeCurrencyContract.methods.approve(jcStakeManagerAddress, minStakeAmount).send({from : account})
            .then(function(response){
                var stakeApproveSpan = ge("stake_approve_span");
                var stakeButtonSpan = ge("stake_button_span");
                console.log(response);                
                stakeApproveSpan.innerHTML = "<small>Approved NOW Stake</small>"; 
                stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"stake()\" class=\"ui-component-button ui-component-button-small ui-component-button-secondary \">Stake</a></small></span>";                 
            })
            .catch(function(err){
                console.log(err);
            });

    })
    .catch(function(err){
        console.log(err);
    });

}

async function stake(){
    jcStakeManagerContract.methods.stake(minStakeAmount).send({from : account})
    .then(function(response){
        console.log(response);
        var stakeStatusSpan = ge("stake_status_span"); 
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
        var stakeStatusSpan = ge("stake_status_span"); 
        stakeStatusSpan.innerHTML = "<small style=\"color:orange\"> UNSTAKED :: "+formatCurrency(response)+"</small>";
        getStakeStatus();
    })
    .catch(function(err){
        console.log(err);
    });
}

// REMOVE FOR LIVE
/*
const testUSDCAddress = "0x41bDACc871Cbc8f3C9B410a868101dcE1BADcf33";
const testWETHAddress = "0xa17D2895778ff13397DE6D37aBa44B0a34F0BB7E";

var usdcContract;
var wethContract;

async function loadFaucet() {
    usdcContract = new web3.eth.Contract(iErc20USDCAbi, testUSDCAddress);
    wethContract = new web3.eth.Contract(iErc20WETHAbi, testWETHAddress);
    console.log("checking faucet");
    // check the account has enough balance 
    usdcContract.methods.balanceOf(account).call({ from: account })
        .then(function(response) {
            console.log(response);
            if (response < (300 * 1e18)) {
                showUSDCFaucetButton();
            }
        })
        .catch(function(err) {
            console.log(err)
        });

    wethContract.methods.balanceOf(account).call({ from: account })
        .then(function(response) {
            if (response < (0.1 * 1e18)) {
                showWETHFaucetButton();
            }
        })
        .catch(function(err) {
            console.log(err);
        });


}


function showUSDCFaucetButton() {

    var faucetButton = ce("a");
    var icon = ce("i");
    icon.setAttribute("class", "fas fa-faucet");
    faucetButton.appendChild(icon);
    faucetButton.appendChild(text("USDC FAUCET"));
    faucetButton.setAttribute("href", "#");
    faucetButton.setAttribute("class", "btn-secondary");
    faucetButton.addEventListener('click', reloadFaucetFundsUSDC);
    usdcfaucetButtonSpan.appendChild(faucetButton);
}

function showWETHFaucetButton() {

    var faucetButton = ce("a");
    var icon = ce("i");
    icon.setAttribute("class", "fas fa-faucet");
    faucetButton.appendChild(icon);
    faucetButton.appendChild(text("WETH FAUCET"));
    faucetButton.setAttribute("href", "#");
    faucetButton.setAttribute("class", "btn-secondary");
    faucetButton.addEventListener('click', reloadFaucetFundsWETH);
    wethfaucetButtonSpan.appendChild(faucetButton);
}

async function reloadFaucetFundsUSDC() {
    // call mint function 
    usdcContract.methods.mint(account).send({ from: account })
        .then(function(response) {
            console.log(response);
            usdcfaucetButtonSpan.innerHTML = "USDC CREDITED- TOKEN CONTRACT : " + testUSDCAddress;
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function reloadFaucetFundsWETH() {
    // call mint function 
    wethContract.methods.mint(account).send({ from: account })
        .then(function(response) {
            console.log(response);
            wethfaucetButtonSpan.innerHTML = "WETH CREDITED - TOKEN CONTRACT : " + testWETHAddress;
        })
        .catch(function(err) {
            console.log(err);
        });
}

*/
// END REMOVE FOR LIVE




function ce(element) {
    return document.createElement(element);
}

function text(txt) {
    return document.createTextNode(txt);
}

function ge(id){
    return document.getElementById(id);
}

function formatCurrency(number) {
    return number / 1e6; 
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