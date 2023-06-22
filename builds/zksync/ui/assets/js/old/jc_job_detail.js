const docRoot = "../docs/"; 

var jobPostingContract;
async function configureCoreContracts() {
    var requiredContracts = ["STAKE_MANAGER","JOBCRYPT_CORE","PAYMENT_MANAGER"];
    configureContracts(requiredContracts);
    getStaking(docRoot);
}

function loadPageData() {
    console.log("loading page data");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    postingAddress = urlParams.get("postingAddress");
    jobPostingContract = getContract(iJCJobPostingAbi, postingAddress);
    
    getStakeStatus(); 
    getHeaderSearch();
    buildJobTitle();
    buildCompany();
    buildLocation();
    buildCategories();
    buildKeySkills();
    buildPostedDate();
    clearWarning(); 
    buildJobDescription();
    buildApplyLink();
}

function clearWarning() { 
    var connectWarningSpan = document.getElementById("connect_warning_span");
    connectWarningSpan.innerHTML = ""; 
}

const titleTable = document.getElementById("title_table");

function buildJobTitle() {

    var titleTable = document.getElementById("title_table");
    var titleRow = titleTable.insertRow();
    var titleCell = titleRow.insertCell();
    var h3Format = document.createElement("h3");
    titleCell.appendChild(h3Format);

    jobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var jobTitle = response;
            var titleText = document.createTextNode(jobTitle);
            h3Format.appendChild(titleText);
        })
        .catch(function(err) {
            console.log(err);
        });
}


function buildCompany() {
    var companyRow = titleTable.insertRow();
    var companyCell = companyRow.insertCell();
    var h4Format = document.createElement("h4");
    companyCell.appendChild(h4Format);
    jobPostingContract.methods.getFeatureSTR("COMPANY_NAME").call({ from: account })
        .then(function(response) {
            console.log(response);
            var companyName = response;
            jobPostingContract.methods.getFeatureSTR("COMPANY_LINK").call({ from: account })
                .then(function(response) {
                    console.log(response);
                    var companyLink = response;
                    var link = createLink(companyLink, companyName);
                    link.setAttribute("target", "_blank");
                    h4Format.appendChild(link);
                })
                .catch(function(err) {
                    console.log(err);
                });

        })
        .catch(function(err) {
            console.log(err);
        });

    var companySummaryRow = titleTable.insertRow();
    var companySummaryCell = companySummaryRow.insertCell();
    var smallFormat = document.createElement("small");
    companySummaryCell.appendChild(smallFormat);
    jobPostingContract.methods.getFeatureSTR("COMPANY_SUMMARY").call({ from: account })
        .then(function(response) {
            console.log(response);
            var companySummary = response;
            url = "https://jobcrypt.infura-ipfs.io/ipfs/" + companySummary;
            console.log(" url: " + url);
            fetch(url)
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                console.log(text);
                var c = JSON.parse(text);
                console.log(c);
                var txt = getTextNode(c);
                smallFormat.appendChild(txt);
             })
             .catch(function(err) {
                console.log(err);
            });
        })
        .catch(function(err) {
            console.log(err);
        });

}

async function fetchFromIPFS(cid, messageSpan) {
    url = "https://jobcrypt.infura-ipfs.io/ipfs/" + cid;
    console.log(" url: " + url);
    let response = await fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            var txt = getTextNode(text);
            messageSpan.appendChild(txt);
        });
}

function buildLocation() {

    var locationWorkRow = titleTable.insertRow();
    var locationWorkCell = locationWorkRow.insertCell();
    var h6Format = document.createElement("h6");
    locationWorkCell.appendChild(h6Format);

    var jobLocationSpan = document.createElement("span");
    var workTypeSpan = document.createElement("span");
    var paymentTypeSpan = document.createElement("span");
    var locationTypeSpan = document.createElement("span");
    var locationSupportSpan = document.createElement("span");

    h6Format.appendChild(jobLocationSpan);
    h6Format.appendChild(workTypeSpan);
    h6Format.appendChild(paymentTypeSpan);
    h6Format.appendChild(locationTypeSpan);
    h6Format.appendChild(locationSupportSpan);

    jobPostingContract.methods.getFeatureSTR("JOB_LOCATION_TYPE").call({ from: account })
        .then(function(response) {
            console.log("location");
            console.log(response);
            var jobLocation = response;
            jobLocationSpan.append(getTextNode("Job Location : "));
            jobLocationSpan.appendChild(getSmall(jobLocation));
        })
        .catch(function(err) {
            console.log(err);
        })

    jobPostingContract.methods.getFeatureSTR("JOB_WORK_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var workType = response;
            workTypeSpan.append(getTextNode(" | Work Type : "));
            workTypeSpan.appendChild(getSmall(workType));
        })
        .catch(function(err) {
            console.log(err);
        })

    jobPostingContract.methods.getFeatureSTR("JOB_PAYMENT_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var paymentType = response;
            paymentTypeSpan.append(getTextNode(" | Payment Type : "));
            paymentTypeSpan.appendChild(getSmall(paymentType));
        })
        .catch(function(err) {
            console.log(err);
        })

    jobPostingContract.methods.getFeatureSTR("JOB_LOCATION_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var locationType = response;
            locationTypeSpan.append(getTextNode(" | Location Type : "));
            locationTypeSpan.appendChild(getSmall(locationType));

        })
        .catch(function(err) {
            console.log(err);
        })

    jobPostingContract.methods.getFeatureSTR("JOB_LOCATION_SUPPORT").call({ from: account })
        .then(function(response) {
            console.log(response);
            var locationSupport = response;
            locationSupportSpan.append(getTextNode(" | Location Support : "));
            locationSupportSpan.appendChild(getSmall(locationSupport));
        })
        .catch(function(err) {
            console.log(err);
        })
}

function buildCategories() {

    var jobCategoriesSpan = document.getElementById("job_categories");
    jobPostingContract.methods.getFeatureSTRARRAY("CATEGORY_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var jobCategories = response;
            var jobCategoriesText = document.createTextNode(jobCategories);
            jobCategoriesSpan.appendChild(jobCategoriesText);

        })
        .catch(function(err) {
            console.log(err);
        });
}

function buildKeySkills() {

    var keySkillSpan = document.getElementById("key_skills");
    jobPostingContract.methods.getFeatureSTRARRAY("SKILLS_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var keySkills = response;
            var keySkillsText = document.createTextNode(keySkills);
            keySkillSpan.appendChild(keySkillsText);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function buildPostedDate() {

    var postedDateSpan = document.getElementById("posted_date_span");
    var h4Format2 = document.createElement("h4");
    postedDateSpan.appendChild(h4Format2);
    jobPostingContract.methods.getFeatureUINT("POSTING_DATE_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var postedDate = response;
            var postedDateText = document.createTextNode("First posted : " + new Date(postedDate * 1000));
            h4Format2.appendChild(getSmallNode(postedDateText));
        });
}

function buildJobDescription() {
    var jobDescriptionSpan = document.getElementById("job_description_span");
 
    jobPostingContract.methods.getFeatureSTR("JOB_DESCRIPTION").call({ from: account })
        .then(function(response) {
            console.log(response);
            var ipfsHash = response;
            url = "https://jobcrypt.infura-ipfs.io/ipfs/" + ipfsHash;
            console.log(" url: " + url);
            fetch(url)
                .then(function(response) {
                    console.log(response);

                    var readable = response.body;
                    var reader = readable.getReader();
                    console.log(reader);
                    reader.read()
                        .then(function(data) {
                            console.log("processing description data");
                            console.log(data)
                            var description = JSON.parse(new TextDecoder().decode(data.value));
                            console.log(description);
                            var quills = new Quill(jobDescriptionSpan);
                            
                            console.log(quills);
                            console.log(description);
                            quills.setContents(description);
                            quills.enable(false);
                          //  var jobDescriptionTxt = document.createTextNode(description.job_description);    
                           // jobDescriptionSpan.appendChild(jobDescriptionTxt);
                        })
                        .catch(function(err) {
                            console.log(err);
                            var description = new TextDecoder().decode(data.value);
                            var jobDescriptionTxt = document.createTextNode(description);
                            jobDescriptionSpan.appendChild(jobDescriptionTxt);
                        });
                })
                .catch(function(err) {
                    console.log(err)
                });

        })
        .catch(function(err) {
            console.log(err);
        });
}


var applyLinkSpan = document.getElementById("apply_link");

function buildApplyLink() {
    jobPostingContract.methods.getFeatureSTR("APPLY_LINK").call({ from: account })
        .then(function(response) {
            console.log(response);            
            applyLinkSpan.innerHTML = "<small style=\"color:green\">Apply Details: " + response + "</small>";
        })
        .catch(function(err) {
            console.log(err);
            console.log("rebuilding apply");
            applyLink();
        });
}

function applyLink() {
    jcStakeManagerContract.methods.isStaked(account).call({from : account})
    .then(function(response){
        var staked = response; 

        console.log(" staked " + staked);
        if(staked === true) {
            var applyLink = createTextButton("apply()", "Apply HERE");
            applyLinkSpan.appendChild(applyLink);
        }
        else {

            var approveLink = ce("a");
            approveLink.setAttribute("href", "#stake_approve_span");
            approveLink.append(text("Stake FIRST to Apply"));
            approveLink.setAttribute("style", "color : red");
            var aboutStakingLink = ce("a");
            aboutStakingLink.setAttribute("href", "../docs/staking.html");
            aboutStakingLink.setAttribute("target", "_blank");
            var i = ce("i");
            i.setAttribute("class", "fa fa-info-circle");
            aboutStakingLink.append(i);
            applyLinkSpan.append(aboutStakingLink);
            applyLinkSpan.append(approveLink);
        }
    })
    .catch(function(err) {
        console.log(err);
        var a = ce("a");
        a.setAttribute("href", "https://discord.gg/89DWAkEnWb");
        a.append(text("Contact Support"));
        applyLinkSpan.append(a);
    });
}

function apply() {
    jobPostingContract.methods.applyForJob().send({ from: account })
        .then(function(response) {
            console.log(response);
            buildApplyLink();
        })
        .catch(function(err){
            console.log(err);
        });

}

function getSmall(str) {
    var small = document.createElement("small");
    small.appendChild(getTextNode(str));
    small.setAttribute("style", "color:blue")
    return small;
}

function getSmallNode(node) {
    var small = document.createElement("small");
    small.appendChild(node);
    return small;
}