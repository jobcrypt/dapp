const WEEK = 7*24*60*60*1000

const ADDRESS_ROOT = chain.blockExplorerUrls[0]+"/address/"; 

const credentialVerificationMessageDisplay  = ge("credential_verification_msg_display_1");

const paymentTicketTable                    = ge("payment_ticket_table");

const paymentCurrencySelect                        = ge("payment_currency_select");
paymentCurrencySelect.addEventListener("click", populateViews);

const verificationServiceSelect             = ge("verification_service_select");
verificationServiceSelect.addEventListener("click", populateViews);

const serviceTypeView                       = ge("service_type_view"); 
const processingTimeView                    = ge("service_processing_time_view");
const processingFeeView                     = ge("service_processing_fee_view");
const paymentCurrencyView                   = ge("payment_currency_view");
const paymentCurrencyErc20AddressView       = ge("payment_currency_erc20_address_view");

const approvePaymentCurrencyButton = ge("approve_payment_currency_button");
approvePaymentCurrencyButton.addEventListener('click', approveCurrency);

const buyVerificationServiceButton = ge("buy_verification_service_button");
buyVerificationServiceButton.addEventListener('click', buyVerificationService);

const verificationSignUpLinkSpan = ge("verification_sign_up_link");

var selectedServiceTypeProductAddress; 
var selectedERC20Address;
var selectedServiceTypeFee;
                                            /* DAI */                                   /* USDT */                                  /* USDC */ 
const supportedCurrencies = ['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1','0x94b008aa00579c1307b0ef2c499ad98a8ce58e58','0x7f5c764cbc14f9669b88837ca1490cca17c31607']; //Live Optimism

                                            /* USDT */                                  /* USDC */
// const supportedCurrencies = ['0x522515b649B1A9552781a1942930cd050B465604','0x3f05F5c029457405267159e1B26f42636690FBAB'];

var currencyDecimals = new Map();

async function configureCoreContracts() {
    var requiredContracts = ["VS_PAYMENT_MANAGER", "OPEN_PRODUCT"];
    configureContracts(requiredContracts);
}

function loadPageData() {
    loadTickets(); 
    populatePaymentCurrrencySelect();
    loadProducts();    
}

async function loadTickets() {    
    console.log(paymentTicketTable.tBodies);
    var tBody = paymentTicketTable.tBodies[0]; 
    console.log(tBody);
    tBody.innerHTML = ""; 
    jcVSPaymentManagerContract.methods.getPayerPayments().call({from : account})
    .then(function(resp){
        console.log(resp);
        var payments = resp; 
        if(payments.length > 0) {
            displayPayments(tBody, payments);
            verificationSignUpLinkSpan.innerHTML = ""; 
            var a = ce("a");
            a.setAttribute("href", "http://bit.ly/3lv3PRd");
            a.setAttribute("class","ui-component-button ui-component-button-medium ui-component-button-primary");
            a.append(text("Complete Verification Sign-up"));
            verificationSignUpLinkSpan.append(a);

        }
        else { 
            var row = tBody.insertRow();
            var dispCell = row.insertCell(); 
            dispCell.setAttribute("colspan","6");
            var c = ce("center");
            c.append(text("no payments yet"))
            dispCell.append(c);
        }

    })
    .catch(function(err) {
        console.log(err);
    })
}

function displayPayments(tBody, payments) {

    for(var x = 0; x < payments.length; x++) {
        var payment = payments[x];
        var row = tBody.insertRow();
        processPaymentRow(row, payment);
    }
}

function processPaymentRow(row, payment) {
    var payRefCell          = row.insertCell(); 
    payRefCell.append(text(payment.ref));
    var productCell         = row.insertCell(); 
    setProductCell(productCell, payment.product);

    var feeCell = row.insertCell();
    setFeeCell(feeCell, payment.fee, payment.erc20);
    
    var paymentErc20Cell    = row.insertCell();
    setPaymentCurrencyCell(paymentErc20Cell, payment.erc20);

    var paymentDateCell     = row.insertCell(); 
    paymentDateCell.append(text(formatDate(payment.date*1000)));

    var bankingRefCell      = row.insertCell();
    bankingRefCell.append(text(payment.bankingRef));
}

function formatDate(date) { 
    return new Date(date).toISOString();
}

function setProductCell(productCell, productAddress){
    var iProductContract  = getContract(iOpenProductAbi, productAddress);
    iProductContract.methods.getName().call({from : account})
    .then(function(resp){
        console.log(resp);
        productCell.append(text(resp));
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setFeeCell(feeCell, fee, erc20){
    iErc20MetadataContract = getContract(ierc20MetadataAbi, erc20); 
    iErc20MetadataContract.methods.decimals().call({from : account})
    .then(function(resp){
        console.log(resp);
        feeCell.append(text("$"+ (fee / Number("1e"+resp))));
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setPaymentCurrencyCell(paymentErc20Cell, erc20) {
    iErc20MetadataContract = getContract(ierc20MetadataAbi, erc20); 
    iErc20MetadataContract.methods.symbol().call({from : account})
    .then(function(resp){
        console.log(resp);
        var symbol = resp; 
        paymentErc20Cell.append(getHashLink(ADDRESS_ROOT+erc20, symbol));
    })
    .catch(function(err) {
        console.log(err);
    })
}


async function loadProducts() {
    clearSelect(verificationServiceSelect);
    console.log(openProductCoreContract);
    openProductCoreContract.methods.getProducts().call({ from: account })
    .then(function(response) {
        console.log(response);
        var productAddresses = response;
        for (var x = 0; x < productAddresses.length; x++) {
            var productAddress = productAddresses[x];
            console.log(productAddress);
            populateProductSelect(productAddress);
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}

function populatePaymentCurrrencySelect() { 
    loadCurrencyDecimals();
    for(var x = 0; x < supportedCurrencies.length; x++) {
        var supportedCurrencyAddress = supportedCurrencies[x];
        addToCurrencySelect(supportedCurrencyAddress);
    }
}

async function addToCurrencySelect(supportedCurrencyAddress) {
    var iErc20MetadataContract = getContract(ierc20MetadataAbi, supportedCurrencyAddress);
    iErc20MetadataContract.methods.symbol().call({from : account})
    .then(function(resp){
        console.log(resp);
        var symbol = resp; 
        var option = ce("option");
        option.append(text(symbol));
        option.setAttribute("value", supportedCurrencyAddress);
        paymentCurrencySelect.append(option);
    })
    .catch(function(err) {
        console.log(err);
    })
}

function populateViews() { 
    if(buying) {
        resetBuyProcess(); 
        credentialVerificationMessageDisplay.innerHTML = "";
    }
    selectedServiceTypeProductAddress = verificationServiceSelect.value; 
    selectedERC20Address = paymentCurrencySelect.value; 

    var iProductContract = getContract(iOpenProductAbi, selectedServiceTypeProductAddress);

    setServiceTypeView(iProductContract);
    setProcessingTimeView(iProductContract);
    setProcessingFeeView(iProductContract);

    setPaymentCurrencyView(selectedERC20Address);

    paymentCurrencyErc20AddressView.innerHTML = ""; 
    paymentCurrencyErc20AddressView.append(getAddressLink(selectedERC20Address));
}

function setServiceTypeView(iProductContract){
    iProductContract.methods.getName().call({from : account})
    .then(function(resp){
        console.log(resp);
        serviceTypeView.innerHTML = ""; 
        serviceTypeView.append(text(resp));
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setProcessingTimeView(iProductContract){
    iProductContract.methods.getFeatureUINTValue("PROCESSING_TIME").call({from : account})
    .then(function(resp){
        console.log(resp);
        var processingTime = resp*1000 / WEEK;
        processingTimeView.innerHTML = ""; 
        processingTimeView.append(text(processingTime + " Weeks"));
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setProcessingFeeView(iProductContract){
    iProductContract.methods.getErc20().call({from : account})
    .then(function(resp){
        console.log(resp);
        var erc20 = resp; 
        getFee(iProductContract, erc20);
    })
    .catch(function(err) {
        console.log(err);
    })

}

function getFee(iProductContract, erc20) {
    iProductContract.methods.getPrice().call({from : account})
    .then(function(resp){
        console.log(resp);
        var fee = resp; 
        setPFView( erc20, fee);
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setPFView( erc20, fee){
    iErc20MetadataContract = getContract(ierc20MetadataAbi, erc20);
    iErc20MetadataContract.methods.decimals().call({from : account})
    .then(function(resp){
        console.log(resp);
        var decimals = resp; 
        var dispFee = fee / Number("1e"+decimals);
        processingFeeView.innerHTML = ""; 
        processingFeeView.append(text("$"+dispFee));
    })
    .catch(function(err) {
        console.log(err);
    })
}

function setPaymentCurrencyView(address) {
    var iErc20MetadataContract = getContract(ierc20MetadataAbi, address);
    iErc20MetadataContract.methods.symbol().call({from : account})
    .then(function(resp){
        console.log(resp);
        var symbol = resp; 

        paymentCurrencyView.innerHTML = ""; 
        
        paymentCurrencyView.append(getHashLink(ADDRESS_ROOT+address, symbol));
    })
    .catch(function(err) {
        console.log(err);
    })
}


async function populateProductSelect(productAddress) {
    console.log(productAddress);
    productContract = getContract(iOpenProductAbi, productAddress);
    console.log(productContract.options.address);
    populateProductSelectName(productContract, productAddress);
}

async function populateProductSelectName(productContract, productAddress) {
    productContract.methods.getName().call({ from: account })
    .then(function(response) {
        console.log(response);
        var name = response;
        
        console.log(productContract.options.address);
        if(name.includes("Career") && !name.includes("Test")){
            populateProductSelectPrice(productContract, name, productAddress);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

async function populateProductSelectPrice(productContract, name, productAddress) {
    var price = 0;
    console.log(productContract.options.address);
    await productContract.methods.getPrice().call({ from: account })
        .then(function(response) {
            console.log(response + " :: " + name);
            price = response;
            populateProductSelectCurrency(productContract, name, price, productAddress);
        })
        .catch(function(err) {
            console.log(err);
        })
}

async function populateProductSelectCurrency(productContract, name, price,  productAddress) {
    productContract.methods.getCurrency().call({ from: account })
        .then(function(response) {
            console.log(response);
            var currency = response;
            var option = document.createElement("option");
            var optionTxt = name + " - " + formatPrice(price*0.8, currency) + " (ex VAT) [" +formatPrice(price*0.2, currency) + " VAT] You pay: " +  formatPrice(price, currency) +  " (" + currency + ")";
            var txt = document.createTextNode(optionTxt);
            option.appendChild(txt);
            option.setAttribute("value", productAddress);
            verificationServiceSelect.appendChild(option);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function loadCurrencyDecimals() { 
    for(var x = 0; x < supportedCurrencies.length; x++){
        var currency = supportedCurrencies[x];
        var iErc20Metadata = getContract(ierc20MetadataAbi, currency);
        setDecimals(iErc20Metadata);
    }
}

function setDecimals(iErc20Metadata) {
    iErc20Metadata.methods.decimals().call({from : account})
    .then(function(resp){
        console.log(resp);
        var decimals = resp; 
        setForCurrencySymbol(iErc20Metadata, decimals);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function setForCurrencySymbol(iErc20Metadata, decimals) {
    iErc20Metadata.methods.symbol().call({from : account})
    .then(function(resp){
        console.log(resp);
        var symbol = resp; 
        var value = Number("1e"+decimals);
        currencyDecimals.set(symbol.trim(), value);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function formatPrice(price, currency) {
    console.log(currencyDecimals);
    console.log(currency);
    var decimals = currencyDecimals.get(currency);
    console.log(decimals);
    if(decimals == 0 || decimals === 'undefined') {
        decimals = 1e6; 
    }
    return price / decimals; 
}

function getErc20(productContract) {
    console.log("product erc20 " + productContract);
    productContract.methods.getErc20().call({ from: account })
        .then(function(response) {
            console.log(response);
            var erc20 = response;
            jobPostingCurrencyErc20Address.innerHTML = erc20;
            selectedERC20Address = erc20;
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getCurrency(productContract) {
    console.log("product currency " + productContract);
    productContract.methods.getCurrency().call({ from: account })
        .then(function(response) {
            console.log(response);
            var currency = response;
            jobPostingCurrency.innerHTML = currency;
        })
        .catch(function(err) {
            console.log(err);
        })
}

async function approveCurrency() {
    productContract.methods.getPrice().call({ from: account })
        .then(function(response) {
            console.log(response);
            var price = response;
            approveOnchain(selectedERC20Address, price);
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function approveOnchain(erc20Address, price) {
    setCredentialMessageDisplay(getSpinner());
    var erc20Contract = getContract(iERC20Abi, erc20Address);
    console.log("Erc20 Address :: " + erc20Address);
    console.log("payment manager approve :: " + jcVSPaymentManagerAddress);
    erc20Contract.methods.approve(jcVSPaymentManagerAddress, price).send({ from: account })
        .then(function(response) {
            console.log(response);
            var s = ce("span");
            s.append(text("Approved :: "));
            s.append(getTransactionHashLink(response.transactionHash));
            setCredentialMessageDisplay(s);            
            activateBuyCapability();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function setCredentialMessageDisplay(msg) {
    credentialVerificationMessageDisplay.innerHTML = ""; 

    credentialVerificationMessageDisplay.append(msg);
}

function getSpinner() {
    var spinner = ce("img");
    spinner.setAttribute("src", "/assets/images/loader/spinner.gif");
    spinner.setAttribute("width", "50");
    spinner.setAttribute("height", "50");
    return spinner; 
}

var buying = false; 

function activateBuyCapability() { 
    buyVerificationServiceButton.disabled = false; 
    buyVerificationServiceButton.setAttribute("class","ui-component-button ui-component-button-medium ui-component-button-primary ");
    
    approvePaymentCurrencyButton.disabled = true; 
    approvePaymentCurrencyButton.setAttribute("class","ui-component-button ui-component-button-medium ui-component-button-secondary");
    buying = true; 
}

function resetBuyProcess() { 
    buyVerificationServiceButton.disabled = true; 
    buyVerificationServiceButton.setAttribute("class","ui-component-button ui-component-button-medium ui-component-button-secondary ");
    
    approvePaymentCurrencyButton.disabled = false; 
    approvePaymentCurrencyButton.setAttribute("class","ui-component-button ui-component-button-medium ui-component-button-primary");
}

async function buyVerificationService() {
    setCredentialMessageDisplay(getSpinner());
    console.log("buying posting: " + selectedServiceTypeProductAddress);

    if (selectedERC20Address == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
        jcVSPaymentManagerContract.methods.payForVerificationService(selectedERC20Address, selectedServiceTypeProductAddress).send({ from: account, value: selectedPostingFee })
            .then(function(response) {
                console.log(response);
                var s = ce("span");
                s.append("Paid :: ");
                s.append(getTransactionHashLink(response.transactionHash));
                setCredentialMessageDisplay(s);                
                resetBuyProcess();
                loadTickets();
            })
            .catch(function(err) {
                console.log(err);
                var s = ce("span");
                s.append(text("Payment Error :: "));
                s.append(text(err.message));
                credentialVerificationMessageDisplay.append(s);
                resetBuyProcess();
                loadTickets();
            })
    } else {
        jcVSPaymentManagerContract.methods.payForVerificationService(selectedERC20Address, selectedServiceTypeProductAddress).send({ from: account })
            .then(function(response) {
                console.log(response);
                var s = ce("span");
                s.append("Paid :: ");
                s.append(getTransactionHashLink(response.transactionHash));
                setCredentialMessageDisplay(s);    
                resetBuyProcess();
                loadTickets();
            })
            .catch(function(err) {
                console.log(err);
                var s = ce("span");
                s.append(text("Payment Error :: "));
                s.append(text(err.message));
                credentialVerificationMessageDisplay.append(s);
                resetBuyProcess();
                loadTickets();
            })
    }
}

function strfy(value) {
    return JSON.stringify(value);
}

function toJSONStringArray(str) {
    var a = str.split(",");
    var b = "";
    for (var x = 0; x < a.length; x++) {
        b += "\"" + a[x] + "\"";
        if (x != a.length - 1) {
            b += ",";
        }
    }
    return b;
}
function getTransactionHashLink(hash) {
    return getHashLink(chain.blockExplorerUrls[0]+"/tx/"+hash, hash);
}

function getAddressLink( address ){
    return getHashLink(ADDRESS_ROOT+address, address);
}

function getHashLink(url, hash) {
    var a = ce("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("style", "color:orange");
    a.append(text(hash));
    return a; 
}
function ce(element) {
    return document.createElement(element);
}

function text(txt) {
    return document.createTextNode(txt);
}

function ge(element) {
    return document.getElementById(element);
}