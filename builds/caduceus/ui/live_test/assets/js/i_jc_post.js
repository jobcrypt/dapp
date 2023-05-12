const NATIVE_CURRENCY = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

const createDraftPostingButton = ge("create_draft_job_posting");
createDraftPostingButton.addEventListener('click', createPosting);

const editDraftPostingButton = ge("edit_draft_posting_button");
editDraftPostingButton.addEventListener('click', editListing);

const saveDraftPostingButton = ge("save_draft_posting_button");
saveDraftPostingButton.addEventListener('click', saveJob);

const resetDraftPostingButton = ge("reset_draft_posting_button");
resetDraftPostingButton.addEventListener('click', editListing);

const approvePaymentCurrencyButton = ge("approve_payment_currency_button");
approvePaymentCurrencyButton.addEventListener('click', approveCurrency);

const buyJobPostingButton = ge("buy_job_posting_button");
buyJobPostingButton.addEventListener('click', buyPosting);

const postJobButton = ge("post_job_button");
postJobButton.addEventListener('click', postJobToJobCrypt);

const jobPostingCreateMsgDisplay1 = ge("job_posting_create_msg_display_1");
const jobPostingCreateMsgDisplay2 = ge("job_posting_create_msg_display_2");

const jobPostingEdittDisplay = ge("job_posting_edit_display");

const jobPostingPaytDisplay = ge("job_posting_pay_display");

const jobPostingSaveMsgDisplay1 = ge("job_posting_save_msg_display_1");
const jobPostingSaveMsgDisplay2 = ge("job_posting_save_msg_display_2");

const jobPostingPostDisplay = ge("job_posting_post_display");

const jobPostingProductSelect = ge("job_posting_product_select");

const jobPostingDraftSelect = ge("edit_draft_job_posting_select");

const jobPostingDuration = ge("job_posting_duration_view");

const jobPostingFee = ge("job_posting_fee_view");

const jobPostingCurrency = ge("job_posting_currency_view");

const jobPostingCurrencyErc20Address = ge("job_posting_currency_erc20_address_view");

const createOnchainEmployerDashboardButtonSpan = ge("create_onchain_employer_dashboard_button_span");

const saveBeforePostCheckBox = ge("save_before_post_checkbox");

var companyLogo = ge("company_logo");
companyLogo.value = ""; 

var logoCid = null; 


var selectedPostingAddress;
var selectedERC20Address;
var selectedPostingFee;

const ipfsRoot = "https://jobcrypt.infura-ipfs.io/ipfs/";

async function configureCoreContracts() {
    var requiredContracts = ["FACTORY_FACADE", "PAYMENT_MANAGER", "STAKE_MANAGER","OPEN_PRODUCT"];
    configureContracts(requiredContracts);
}

function loadPageData() {
    loadProducts();
    updateDraftListings();
    getStakeStatus();   
}

async function loadProducts() {
    clearSelect(jobPostingProductSelect);
    console.log(openProductCoreContract);
    openProductCoreContract.methods.getProducts().call({ from: account })
        .then(function(response) {
            console.log(response);
            var productAddresses = response;
            for (var x = 0; x < productAddresses.length; x++) {
                var productAddress = productAddresses[x];
                console.log(productAddress);
                populateProductSelect(productAddress, jobPostingProductSelect);
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

async function populateProductSelect(productAddress, jobPostingProductSelect) {
    console.log(productAddress);
    productContract = getContract(iOpenProductAbi, productAddress);
    console.log(productContract.options.address);
    populateProductSelectName(productContract, jobPostingProductSelect, productAddress);
}

async function populateProductSelectName(productContract, jobPostingProductSelect, productAddress) {
    productContract.methods.getName().call({ from: account })
        .then(function(response) {
            console.log(response);
            var name = response;
            
            console.log(productContract.options.address);
          //  if(!name.includes("Community") || !name.includes("Community")){ // live filter
                populateProductSelectPrice(productContract, name, jobPostingProductSelect, productAddress);
          //  }
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function populateProductSelectPrice(productContract, nme, jobPostingProductSelect, productAddress) {
   
    console.log(productContract.options.address);
    await productContract.methods.getPrice().call({ from: account })
        .then(function(response) {
            console.log(response + " :: " + nme);
            var price = response;
            getPriceErc20Address(productContract, nme, price,jobPostingProductSelect, productAddress);
                        
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getPriceErc20Address(productContract, nme, price,jobPostingProductSelect, productAddress){
    productContract.methods.getErc20().call({from : account})
    .then(function(response){
        console.log(response);
        var priceErc20Address = response; 
        if(priceErc20Address === NATIVE_CURRENCY){
            var priceDecimals = Number("1e"+chain.nativeCurrency.decimals); 
            populateProductSelectCurrency(productContract, nme, price, priceDecimals, jobPostingProductSelect, productAddress);
        }
        else {
            console.log(priceErc20Address);
            getPriceDecimals(productContract, priceErc20Address, nme, price, jobPostingProductSelect, productAddress);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}


function getPriceDecimals(productContract, priceErc20Address, nme, price, jobPostingProductSelect, productAddress){
    var erc20 = getContract(ierc20MetadataAbi, priceErc20Address); 
    erc20.methods.decimals().call({from : account})
    .then(function(resp){
        console.log(resp);
        var priceDecimals = Number("1e"+resp); 
        populateProductSelectCurrency(productContract, nme, price, priceDecimals, jobPostingProductSelect, productAddress);
    
    })
    .catch(function(err) {
        console.log(err);
    });
}

async function populateProductSelectCurrency(productContract, nme, price, priceDecimals, jobPostingProductSelect, productAddress) {
    productContract.methods.getCurrency().call({ from: account })
    .then(function(response) {
        console.log(response);
        var currency = response;
        var option = document.createElement("option");
        var optionTxt = nme + " - " + formatPrice(price*0.8,priceDecimals) + " (ex VAT) [" +formatPrice(price*0.2,priceDecimals) + " VAT] You pay: " +  formatPrice(price,priceDecimals) +  " (" + currency + ")";
        var txt = document.createTextNode(optionTxt);
        option.appendChild(txt);
        option.setAttribute("value", productAddress);
        jobPostingProductSelect.appendChild(option);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function formatPrice(price, priceCurrencyDecimals) {
    return price / priceCurrencyDecimals;
}

async function createPosting() {
    var productAddress = jobPostingProductSelect.value;
    console.log("product address :: " + productAddress);

    // update from factory
    jcFactoryFacadeContract.methods.createJobPosting(productAddress).send({ from: account })
        .then(function(response) {
            console.log(response);
          setCreateMsg("Draft Posting Created Txn :: " + response.blockHash);
            updateDraftListings();
        })
        .catch(function(err) {
            console.log(err);
        });
}

var t = new String("POSTED").valueOf();
var n = new String("CLOSED").valueOf();

async function updateDraftListings() {
    clearSelect(jobPostingDraftSelect);
    // update from factory
    jcFactoryFacadeContract.methods.findDashboard("EMPLOYER_DASHBOARD_TYPE").call({ from : account})
    .then(function(response){
        console.log(response);
        if(response === '0x0000000000000000000000000000000000000000') {
            createDashboardButton();
        }
        else { 
            loadFromEmployerDashboard(response);
        }
    })
    .catch(function(err){
        console.log(err);
    });


}

function createEmployerDashboard() {
    createOnchainEmployerDashboardButtonSpan.innerHTML = ""; 
    jcFactoryFacadeContract.methods.getDashboard("EMPLOYER_DASHBOARD_TYPE").send({from : account})
    .then(function(response){
        console.log(response);
        enableAll(); 
        loadFromEmployerDashboard(response);
    })
    .catch(function(err){
        console.log(err);
    });
}

function createDashboardButton() { 
    disableAll(); 
    createOnchainEmployerDashboardButtonSpan.innerHTML = ""; 
    var a = ce("a");
    a.setAttribute("href","javascript:createEmployerDashboard();");
    a.setAttribute("class", "ui-component-button ui-component-button-small ui-component-button-primary");
    a.append(text("click to create your employer dashboard onchain"));
    createOnchainEmployerDashboardButtonSpan.append(a);
}
function disableAll() { 
    console.log("disabling all");
    createDraftPostingButton.disabled           = true; 
    editDraftPostingButton.disabled             = true; 
    saveDraftPostingButton.disabled             = true; 
    resetDraftPostingButton.disabled            = true; 
    approvePaymentCurrencyButton.disabled       = true; 
    buyJobPostingButton.disabled                = true; 
    postJobButton.disabled                      = true; 
   
    jobPostingDraftSelect.disabled              = true; 
}

function enableAll() { 
    console.log("enabling all");
    createDraftPostingButton.disabled           = false; 
    editDraftPostingButton.disabled             = false; 
    saveDraftPostingButton.disabled             = false; 
    resetDraftPostingButton.disabled            = false; 
    approvePaymentCurrencyButton.disabled       = false; 
    buyJobPostingButton.disabled                = false; 
    postJobButton.disabled                      = false; 
  
    jobPostingDraftSelect.disabled              = false; 
}

function clearAll() {
    console.log("clearing all");

    var title = ge("job_title");
    title.value = ""; 
    
    var locationType = ge("job_location_type");    
    var locationSupport = ge("job_location_support");
    
    var workLocation = ge("job_work_location");
    workLocation.valueL = "";
    var companyName = ge("company_name");
    companyName.value = "";
    var companyLink = ge("company_link");
    companyLink.value = ""; 
    var companySummary = ge("company_summary");
    companySummary.value = ""; 
    var skillsRequired = ge("job_skills_required");
    skillsRequired.value = ""; 
    var searchCategories = ge("job_search_categories");
    searchCategories.value = ""; 

    var workType = ge("job_work_type");    
    var salaryPaymenttype = ge("job_payment_type");

    var jobDescription = ge("job_description");
    var quills = new Quill(jobDescription);
    quills.setContents("");
    var jobApplicationlink = ge("job_application_link");
    jobApplicationlink.value = ""; 
    var userSearchTerms = ge("user_search_terms");
    userSearchTerms.value = ""; 
}

function loadFromEmployerDashboard(employerDashboardAddress) {
    console.log("employer dashobard address: " + employerDashboardAddress);
    var employerDashboardContract = getContract(iJCEmployerDashboardAbi, employerDashboardAddress);
    
    employerDashboardContract.methods.getDraftPostings().call({ from: account })
        .then(function(response) {
            console.log(response);
            var allPostings = response;
            if (allPostings.length > 0) {
                jobPostingDraftSelect.disabled = false;
                for (var x = 0; x < allPostings.length; x++) {
                    var postingAddress = allPostings[x];
                    processDraftPosting(postingAddress);
                }
            } else {
                appendNoDraftsFound(jobPostingDraftSelect);
            }
        })
        .catch(function(err) {
            console.log(err);
            appendNoDraftsFound(jobPostingDraftSelect);
        })
}


function appendNoDraftsFound(select) {
    var option = document.createElement("option");
    titleTxt = "No Drafts Found";
    var txt = document.createTextNode(titleTxt);
    option.appendChild(txt);
    select.appendChild(option);
    select.disabled = true;
}

function processDraftPosting(postingAddress) {
    console.log(postingAddress);
    var postingContract = getContract(iJCJobPostingAbi, postingAddress);
    postingContract.methods.getStatus().call({ from: account })
        .then(function(response) {
            console.log(response);
            var status = response;
            var v = status.valueOf();
            console.log(postingAddress);

            if (v != t && v != n) {
                addDraftPostingOption(postingContract, postingAddress, status);
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getPostingProduct(postingContract, option, title ){
    postingContract.methods.getFeatureADDRESS("PRODUCT_FEATURE").call({from : account})
    .then(function(response){
            console.log(response);
            var productAddress = response; 
            getProductName(productAddress, option, title);

    })
    .catch(function(err) {
        console.log(err);
    })
}

function getProductName(productAddress, option, title) {

    var productContract = getContract(iOpenProductAbi, productAddress);
    productContract.methods.getName().call({from : account})
    .then(function(response){
        console.log(response);
        var name = response; 
        var txt = document.createTextNode(title + name);
        option.appendChild(txt);
        jobPostingDraftSelect.appendChild(option);

    })
    .catch(function(err) {
        console.log(err);
    })
}

function addDraftPostingOption(postingContract, postingAddress, status) {
    var option = document.createElement("option");
    option.setAttribute("value", postingAddress);
    postingContract.methods.getFeatureSTR("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var titleTxt = response;

            title = "Title :: " + titleTxt + " :: status :: " + status + " :: " + postingAddress + " :: ";
            getPostingProduct(postingContract, option, title )
        })
        .catch(function(err) {
            console.log(err);
        })
}

function editListing() {

    var postingAddress = jobPostingDraftSelect.value;
    clearAll();
    jobPostingEdittDisplay.innerHTML = "Editing Draft :: " + postingAddress;
    selectedPostingAddress = postingAddress;
    var title = ge("job_title");
    var locationType = ge("job_location_type");
    var locationSupport = ge("job_location_support");
    var workLocation = ge("job_work_location");
    var companyName = ge("company_name");
    var companyLink = ge("company_link");
    var companySummary = ge("company_summary");
    var companyLogoDisplay = ge("company_logo_display");
    var skillsRequired = ge("job_skills_required");
    var searchCategories = ge("job_search_categories");
    var workType = ge("job_work_type");
    var salaryPaymenttype = ge("job_payment_type");
    var jobDescription = ge("job_description");
    var jobApplicationlink = ge("job_application_link");
    var userSearchTerms = ge("user_search_terms");

    postingContract = getContract(iJCJobPostingAbi, postingAddress);

    postingContract.methods.getFeatureSTR("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            title.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("JOB_LOCATION_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            locationType.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })


    postingContract.methods.getFeatureSTR("JOB_LOCATION_SUPPORT").call({ from: account })
        .then(function(response) {
            console.log(response);
            locationSupport.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })


    postingContract.methods.getFeatureSTR("JOB_WORK_LOCATION").call({ from: account })
        .then(function(response) {
            console.log(response);
            workLocation.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("COMPANY_NAME").call({ from: account })
        .then(function(response) {
            console.log(response);
            companyName.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

        postingContract.methods.getFeatureSTR("COMPANY_LOGO").call({ from: account })
        .then(function(response) {
            console.log(response);
            companyLogoDisplay.innerHTML = "";
            var cid = response; 
            if(cid != "" && cid != null){ 
                logoCid = cid; 
            }
            var logo = ce("img");
            logo.setAttribute("src", IPFS+cid);
            logo.setAttribute("width", "57");
            logo.setAttribute("height", "57");
            companyLogoDisplay.append(logo);
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("COMPANY_LINK").call({ from: account })
        .then(function(response) {
            console.log(response);
            companyLink.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("COMPANY_SUMMARY").call({ from: account })
        .then(function(response) {
            console.log(response);
            fetchCompanySummaryFromIPFS(response, companySummary);
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("JOB_WORK_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            workType.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("JOB_PAYMENT_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            salaryPaymenttype.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("JOB_DESCRIPTION").call({ from: account })
        .then(function(response) {
            console.log(response);
            fetchDescriptionFromIPFS(response, jobDescription);
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("USER_SEARCH_TERMS").call({ from: account })
        .then(function(response) {
            console.log(response);
            userSearchTerms.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTR("APPLY_LINK").call({ from: account })
        .then(function(response) {
            console.log(response);
            jobApplicationlink.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })


    postingContract.methods.getFeatureSTRARRAY("SKILLS_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            skillsRequired.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeatureSTRARRAY("CATEGORY_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            searchCategories.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })



    postingContract.methods.getFeatureADDRESS("PRODUCT_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var productAddress = response;
            updatePaymentBox(productAddress, postingAddress);
        })
        .catch(function(err) {
            console.log(err);
        })
}

var productContract;

function updatePaymentBox(productAddress, postingAddress) {
    console.log(postingAddress);
    productContract = getContract(iOpenProductAbi, productAddress);
    selectedPostingAddress = postingAddress;
    console.log("product contract");
    console.log(productContract);
    productContract.methods.getFeatureUINTValue("DURATION").call({ from: account })
    .then(function(response) {
        console.log(response);
        var duration = response;
        var weeks = duration / (7 * 24 * 60 * 60);
        console.log(weeks);
        console.log(jobPostingDuration);
        jobPostingDuration.innerHTML = weeks + " Weeks ";
        
        getErc20(productContract);
    })
    .catch(function(err) {
        console.log(err);
    });

  
}

function setPrice(productContract, decimals) {
    productContract.methods.getPrice().call({ from: account })
    .then(function(response) {
        console.log(response);
        var price = response;        
        
        jobPostingFee.innerHTML = price / Number("1e"+decimals);
        selectedPostingFee = price;
    })
    .catch(function(err) {
        console.log(err);
    })
}


function getErc20(productContract) {
    console.log("product erc20 " + productContract);
    productContract.methods.getErc20().call({ from: account })
        .then(function(response) {
            console.log(response);
            var erc20 = response;
            jobPostingCurrencyErc20Address.innerHTML = erc20;
            selectedERC20Address = erc20;
            if(erc20 == NATIVE_CURRENCY){ 
                jobPostingCurrency.innerHTML = chain.nativeCurrency.symbol;
                setPrice(productContract, chain.nativeCurrency.decimals);
                disableApprove();
            }
            else { 
                getCurrency(productContract);
                getDecimalsAndPrice(productContract, erc20);
                enableApprove();
            }            
        })
        .catch(function(err) {
            console.log(err);
        })
}

function disableApprove() {
    approvePaymentCurrencyButton.disabled = true; 
    approvePaymentCurrencyButton.setAttribute("class","btn btn-outline");
}

function enableApprove() {
    approvePaymentCurrencyButton.disabled = false; 
    approvePaymentCurrencyButton.setAttribute("class","btn btn-primary");
}

function getDecimalsAndPrice(productContract, erc20){
    erc20Metadata = getContract(ierc20MetadataAbi, erc20);
    erc20Metadata.methods.decimals().call({from : account})
    .then(function(response){
        console.log(response);
        var decimals = response; 
        setPrice(productContract, decimals);
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
            approve_1(productContract, price);
        })
        .catch(function(err) {
            console.log(err);
        });

}

async function approve_1(productContract, price) {
    productContract.methods.getErc20().call({ from: account })
        .then(function(response) {
            console.log(response);
            var erc20Address = response;
            approve_2(erc20Address, price);
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function approve_2(erc20Address, price) {
    var erc20Contract = getContract(iERC20Abi, erc20Address);
    console.log("Erc20 Address :: " + erc20Address);
    console.log("payment manager approve :: " + jcPaymentManagerAddress);
    erc20Contract.methods.approve(jcPaymentManagerAddress, price).send({ from: account })
        .then(function(response) {
            console.log(response);
            jobPostingPaytDisplay.innerHTML = "Approved : " + response.blockHash;
        })
        .catch(function(err) {
            console.log(err);
        });
}


async function buyPosting() {
    console.log("buying posting: " + selectedPostingAddress);

    if (selectedERC20Address == NATIVE_CURRENCY) {
        jcPaymentManagerContract.methods.payForPosting(selectedPostingAddress).send({ from: account, value: selectedPostingFee })
            .then(function(response) {
                console.log(response);
                jobPostingPaytDisplay.innerHTML = "Paid :: " + response.blockHash;
            })
            .catch(function(err) {
                console.log(err);
                jobPostingPaytDisplay.innerHTML = "Payment Error :: " + err.message;
            })
    } else {
        jcPaymentManagerContract.methods.payForPosting(selectedPostingAddress).send({ from: account })
            .then(function(response) {
                console.log(response);
                jobPostingPaytDisplay.innerHTML = "Paid :: " + response.blockHash;
            })
            .catch(function(err) {
                console.log(err);
                jobPostingPaytDisplay.innerHTML = "Payment Error :: " + err.message;
            })
    }
}

async function saveJob() {
    jobJSON = getJobToPost();
  
    // save job description 
    await ipfs.add(strfy(jobJSON.description))
        .then(function(response) {
            console.log(response);
            jobDescriptionHash = response[0].hash;
            console.log(jobDescriptionHash);
            // save company summary
            ipfs.add(strfy(jobJSON.companySummary))
                .then(function(res) {
                    console.log(res);
                    companySummaryHash = res[0].hash;
                    jobJSON.companySummaryHash = companySummaryHash; 
                    console.log("company hash : " + companySummaryHash);
                    var companyLogo = ge("company_logo");
                    var image = companyLogo.files[0];
                    console.log(image);
                    if(image != null && image != "") {
                        ipfs.add(image)
                        .then(function(res2){
                            companyLogoHash = res2[0].hash;
                            jobJSON.companyLogoHash = companyLogoHash;  
                            saveToEVM(jobJSON, jobDescriptionHash, companySummaryHash);

                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                    }
                    else { 
                        if(logoCid != null && logoCid != "" ){
                            jobJSON.companyLogoHash = logoCid;                            
                        }
                        saveToEVM(jobJSON, jobDescriptionHash, companySummaryHash);
                      
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function saveToEVM(jobJSON, jobDescriptionHash, companySummaryHash) {
    var featureNames = ["JOB_TITLE", "JOB_LOCATION_TYPE", "JOB_LOCATION_SUPPORT", "JOB_WORK_LOCATION", "COMPANY_NAME", "COMPANY_LOGO", "COMPANY_LINK", "COMPANY_SUMMARY",  "JOB_WORK_TYPE", "JOB_PAYMENT_TYPE", "JOB_DESCRIPTION", "USER_SEARCH_TERMS", "APPLY_LINK"];
    var featureValues = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "",jobJSON.companyLogoHash + "", jobJSON.companyLink, companySummaryHash + "", jobJSON.workType + "", jobJSON.paymentType + "", jobDescriptionHash + "", jobJSON.userSearchTerms + "", jobJSON.applicationLink + ""];
    
    console.log(featureNames);
    console.log(featureValues);
    var postingEditorContract = getContract(iJCJobPostingEditorAbi, selectedPostingAddress);

    var terms = [jobJSON.jobTitle + "", jobJSON.locationType + "", jobJSON.locationSupport + "", jobJSON.workLocation + "", jobJSON.companyName + "", jobJSON.workType + "", jobJSON.paymentType + ""]
    var c = decomposeText(jobJSON.companySummary);
    var u = decomposeText(jobJSON.userSearchTerms);
    var n = decomposeDescription(jobJSON.description);
    console.log(c);
    console.log(u);
    console.log(n);
    var searchTerms = unique(terms.concat(c).concat(u).concat(n));
    console.log(searchTerms);

    postingEditorContract.methods.populate(featureNames, featureValues, jobJSON.searchCategories, jobJSON.skillsRequired, searchTerms).send({ from: account })
        .then(function(response) {
            console.log(response);
            var s = ce("span");
            s.append(text("Saved @> EVM :: "));
            s.append(getTransactionHashLink(response.blockHash));
            s.append(text(" :: "));
            s.append(text(" IPFS Company Summary Hash :: "));
            s.append(getIPFSLink(companySummaryHash));
            s.append(text(" IPFS Job Description :: "));
            s.append(getIPFSLink(jobDescriptionHash));  
            s.append(text(" IPFS Company Logo Hash :: "));
            s.append(getIPFSLink(jobJSON.companyLogoHash));          
            setSaveMsg(s);
        })
        .catch(function(err) {
            console.log(err);

        });

}

function setCreateMsg(msg) {
    jobPostingCreateMsgDisplay1.innerHTML = msg;
    jobPostingCreateMsgDisplay2.innerHTML = msg;
}

function setSaveMsg(msg) {
    jobPostingSaveMsgDisplay1.innerHTML = msg;
    jobPostingSaveMsgDisplay2.innerHTML = msg;
}


function getJobToPost() {
    var jobTitle = ge("job_title");
    console.log("jt: " + jobTitle);
    var locationType = ge("job_location_type");
    var locationSupport = ge("job_location_support");
    var workLocation = ge("job_work_location");
    var companyName = ge("company_name");
    var companyLink = ge("company_link");
    var companySummary = ge("company_summary");
    var skillsRequired = ge("job_skills_required");
    var searchCategories = ge("job_search_categories");
    var workType = ge("job_work_type");
    var paymentType = ge("job_payment_type");
    var description = ge("job_description");
    var quills = new Quill(description);
    var userSearchTerms = ge("user_search_terms");
    console.log(" jd : " + description);
    var applicationLink = ge("job_application_link");

    var jString = "{" + strfy("jobTitle") + ":" + strfy(jobTitle.value) + "," +
        strfy("locationType") + " : " + strfy(locationType.value) + "," +
        strfy("locationSupport") + " : " + strfy(locationSupport.value) + "," +
        strfy("workLocation") + " : " + strfy(workLocation.value) + "," +
        strfy("companyName") + " : " + strfy(companyName.value) + "," +
        strfy("companyLogoHash") + " : " + strfy("") +","+
        strfy("companyLink") + " : " + strfy(companyLink.value) + "," +
        strfy("companySummary") + " : " + strfy(companySummary.value) + "," +
        strfy("skillsRequired") + " : [" + toJSONStringArray(skillsRequired.value) + "]," +
        strfy("searchCategories") + " : [" + toJSONStringArray(searchCategories.value) + "]," +
        strfy("workType") + " : " + strfy(workType.value) + "," +
        strfy("paymentType") + " : " + strfy(paymentType.value) + "," +
        strfy("description") + " : " + strfy(quills.getContents()) + "," +
        strfy("applicationLink") + " : " + strfy(applicationLink.value) + "," +
        strfy("userSearchTerms") + " : " + strfy(userSearchTerms.value) + "}";
    console.log(jString);
    var jobJSON = JSON.parse(jString);
    return jobJSON;
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

function postJobToJobCrypt() {
    console.log("posting job");
    if(saveBeforePostCheckBox.value === 'checked'){
        saveJob();
    }    
    console.log("posting");
    console.log(jcJobCryptContract);
    console.log(selectedPostingAddress);
    var postingEditorContract = getContract(iJCJobPostingEditorAbi, selectedPostingAddress);
    postingEditorContract.methods.post().send({ from: account })
        .then(function(response) {
            console.log(response);
            jobPostingPostDisplay.innerHTML = " Job : " + selectedPostingAddress + " :: POSTED :: " + response.blockHash;
            clearAll();
        })
        .catch(function(err) {
            console.log(err);
        });
}


async function fetchDescriptionFromIPFS(cid, quillDescription) {
    if(cid != ""){
        url = ipfsRoot + cid;
        console.log(" url: " + url);
        let response = await fetch(url)
            .then(function(response) {
                console.log("ipfs");
                console.log(response);
                return response.text();
            })
            .then(function(text) {
                console.log(text);
                var quills = new Quill(quillDescription);
                quills.setContents(JSON.parse(text));
            })
            .catch(function(err) {
                console.log(err);
            });
    }

}

async function fetchCompanySummaryFromIPFS(cid, companySummary) {
    if(cid != ""){
        url = ipfsRoot + cid;
        console.log(" url: " + url);
        let response = await fetch(url)
            .then(function(response) {
                console.log("ipfs");
                console.log(response);
                return response.text();
            })
            .then(function(text) {
               companySummary.value = text; 
            })
            .catch(function(err) {
                console.log(err);
            });
    }

}

async function fetchFromIPFS(cid, messageSpan) {
    url = ipfsRoot + cid;
    console.log(" url: " + url);
    let response = await fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            messageSpan.innerHTML = text;
        });
}

function unique(array) {
    var q = new Set();
    for (var x = 0; x < array.length; x++) {
        q.add(array[x]);
    }
    return Array.from(q.values());
}

const filter = ["this", "is", "an", "role", "that", "will", "see", "you", "and", "highly", "active", "in", ",", "the", "a", "how", "when", "where", "who", "why", "then", "into", "insert", "as", "for", "to", "too", "two", "\n", "new", "out"];

function decomposeDescription(desc) {
    var ops = desc.ops;
    var duppedTerms = [];
    for (var x = 0; x < ops.length; x++) {
        var insert = ops[x].insert;
        console.log(insert);
        duppedTerms.concat(decomposeText(insert));
    }
    return unique(duppedTerms);
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

function getIPFSLink(hash) {
    return getHashLink(IPFS+hash, hash);
}

function getTransactionHashLink(hash) {
    return getHashLink(chain.blockExplorerUrls[0]+"/tx/"+hash, hash);
}

function getAddressLink( address ){
    return getHashLink(chain.blockExplorerUrls[0]+"/address/"+address, address);
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