const searchResultsSpan = ge("search_results_span");
const pageRoot = "";
const docRoot = "../doc/"; 

async function configureCoreContracts() {
    var requiredContracts = ["JOBCRYPT_CORE", "STAKE_MANAGER", "OPEN_RANKING"];
    configureContracts(requiredContracts);
    getStaking(docRoot);
}

function loadPageData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    console.log("running load data on results");
   
    getPopularJobs();
    getFeaturedJobs();    
    getMainSearch(); 
    getHotSearchTerms("");

    console.log(queryString);

    if (queryString.includes("searchTerm")) {
        console.log("getting search term");
        var term = urlParams.get("searchTerm");
        console.log(term);
        buildResultsOne(term);
        return;
    }

    if (queryString.includes("value") && queryString.includes("search")) {
        console.log("getting search  & value");
        var searchField = urlParams.get("search");
        var searchTerm = urlParams.get("value");
        buildResults(searchField, searchTerm);
        return;
    }
}

function buildResultsOne(term) {
    jcJobCryptContract.methods.findJobs(term).call({ from: account })
    .then(function(response) {
        console.log(response);
        var postingAddresses = response;
        for (var x = postingAddresses.length-1; x >=0 ; x--) {
            var postingAddress = postingAddresses[x];
            processRow(postingAddress);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function buildResults(searchTerm, searchValue) {
    console.log(" field :: " + searchTerm + " value :: " + searchValue);
    jcJobCryptContract.methods.findJobs(searchValue, searchTerm).call({ from: account })
        .then(function(response) {
            console.log(response);
            var postingAddresses = response;
            for (var x = postingAddresses.length-1; x >=0 ; x--) {
                var postingAddress = postingAddresses[x];
                processRow(postingAddress);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}


function processRow(postingAddress) {
    console.log("processing row");
    var iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
    var div = cardDiv();
    searchResultsSpan.append(div);
    var resultTable = table();
    div.append(resultTable);
    var row = resultTable.insertRow();

    var companyCell = row.insertCell();
    var titleCell = row.insertCell();
   
    var row1 = resultTable.insertRow(); 
    var locationCell = row1.insertCell();
    var jobAgeCell = row1.insertCell();
    var row2 = resultTable.insertRow(); 
    row2.insertCell();
    
    var jobLinkCell = row2.insertCell();
    

    getCompany(companyCell, iJobPostingContract);
    getTitle(titleCell, iJobPostingContract, postingAddress);
    getLocation(locationCell, iJobPostingContract);
    getJobAge(jobAgeCell, iJobPostingContract);
    getJobLink(jobLinkCell, postingAddress);

}

function getCompany(cell, iJobPostingContract) {
    iJobPostingContract.methods.getFeatureSTR("COMPANY_NAME").call({ from: account })
        .then(function(response) {
            console.log(response);
            cell.append(text(response));
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getTitle(cell, iJobPostingContract, postingAddress) {
    iJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var title = response;
            var jobDetailLinkDestination = "/pages/app/job_detail_template.html?postingAddress=" + postingAddress;
            cell.appendChild(bold(link(jobDetailLinkDestination, title)));
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getLocation(cell, iJobPostingContract) {
    iJobPostingContract.methods.getFeatureSTR("JOB_WORK_LOCATION").call({ from: account })
        .then(function(response) {
            console.log(response);
            cell.append(text(response));
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getJobAge(cell, iJobPostingContract) {

    iJobPostingContract.methods.getFeatureUINT("POSTING_DATE_FEATURE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var postingTime = response * 1000;
            var duration = Date.now() - postingTime;
            console.log("duration : " + duration + " now " + Date.now() + " posting time " + postingTime);
            if (60000 > duration && duration > 1000) { // second
                cell.append(text("Posted " + (Math.round(duration / 1000)) + " s ago"));
                return;
            }
            if (3600000 > duration && duration > 60000) { // minute
                cell.append(text("Posted " + (Math.round(duration / 60000)) + " mins ago"));
                return;
            }

            if (86400000 > duration && duration > 3600000) { // hour
                cell.append(text("Posted " + (Math.round(duration / 3600000)) + " hours ago"));
                return;
            }

            if (604800000 > duration && duration > 86400000) { // day 
                cell.append(text("Posted " + (Math.round(duration / 86400000)) + " days ago"));
                return;
            }

            if (2419200000 > duration && duration > 604800000) { // week
                cell.append(text("Posted " + (Math.round(duration / 604800000)) + " weeks ago"));
                return;
            }
            if (duration > 2419200000) { // month
                cell.append(text("Posted " + (Math.round(duration / 2419200000)) + " months ago"));
                return;
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getJobLink(cell, postingAddress) {
    var jobDetailLinkDestination = "/pages/app/job_detail_template.html?postingAddress=" + postingAddress;
    cell.appendChild(bold(link(jobDetailLinkDestination, "details...")));
}

function table() {
    return ce("table");
}

function link(destination, txt) {
    var a = ce("a");
    a.setAttribute("href", destination);
    a.append(text(txt));
    return a;
}

function bold(node) {
    var bold = ce("b");
    bold.append(node);
    return bold;
}

function cardDiv() {
    var div = ce("div");
    div.setAttribute("class", "ui-component-card ui-layout-column-6");
    return div;
}

function ge(element) {
    return document.getElementById(element);
}

function ce(element) {
    return document.createElement(element);
}

function text(txt) {
    return document.createTextNode(txt);
}