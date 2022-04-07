const searchResultsSpan = ge("search_results_span");
function loadPageData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var searchField = urlParams.get("search");
    var searchTerm = urlParams.get("value");


    console.log("running load data on results");
    getPopularJobs();
    getFeaturedJobs(); 
    buildResults(searchField, searchTerm)
    
}


function buildResults(searchTerm, searchValue) {
    console.log(" field :: " + searchTerm + " value :: " + searchValue);
    jcJobCryptContract.methods.findJobs( searchValue, searchTerm).call({from : account})
    .then(function(response){
        console.log(response);
        var postingAddresses = response; 
        for(var x = 0; x < postingAddresses.length; x++) {
            var postingAddress = postingAddresses[x];
            processRow(postingAddress);
        }
    })
    .catch(function(err){
        console.log(err);
    });
}


function processRow(postingAddress){
    console.log("processing row");
    var iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
    var div = cardDiv();
    searchResultsSpan.append(div);
    var resultTable = table(); 
    div.append(resultTable);
    var row = resultTable.insertRow();        

    var companyCell = row.insertCell();
    var titleCell = row.insertCell();
    var locationCell = row.insertCell();
    var jobAgeCell = row.insertCell();
    var jobLinkCell = row.insertCell();

    getCompany(companyCell, iJobPostingContract);
    getTitle(titleCell, iJobPostingContract);
    getLocation(locationCell, iJobPostingContract);
    getJobAge(jobAgeCell, iJobPostingContract);
    getJobLink(jobLinkCell, postingAddress);

}

function getCompany(cell, iJobPostingContract) {
    iJobPostingContract.methods.getFeature("COMPANY_NAME").call({from : account})
    .then(function(response){
        console.log(response);
        cell.append(text(response));
    })
    .catch(function(err){
        console.log(err);
    })
}

function getTitle(cell, iJobPostingContract) {
    iJobPostingContract.methods.getFeature("JOB_TITLE").call({from : account})
    .then(function(response){
        console.log(response);
        var title = response; 
        var jobDetailLinkDestination = "/pages/app/job_detail_template.html?postingAddress=" + postingAddress;    
        cell.appendChild(bold(link(jobDetailLinkDestination, title)));
    })
    .catch(function(err){
        console.log(err);
    })
}

function getLocation(cell, iJobPostingContract) {
    iJobPostingContract.methods.getFeature("JOB_WORK_LOCATION").call({from : account})
    .then(function(response){
        console.log(response);
        cell.append(text(response));
    })
    .catch(function(err){
        console.log(err);
    })
}

function getJobAge(cell, iJobPostingContract) {

    iJobPostingContract.methods.getPostingDate().call({from : account})
    .then(function(response){
        console.log(response);
        var postingTime = response * 1000; 
        var duration = Date.now() - postingTime; 
        if( 60000 > duration && duration > 1000){ // second
            cell.append(text("Posted "+(Math.round(duration / 1000)) + " s ago"));
        }
        if( 3600000 > duration && duration > 60000){ // minute
            cell.append(text("Posted "+(Math.round(duration / 60000)) + " mins ago"));
        }

        if(86400000 > duration && duration > 3600000) { // hour
            cell.append(text("Posted "+(Math.round(duration / 3600000)) + " hours ago"));
        }

        if(604800000 > duration && duration > 86400000){ // day 
            cell.append(text("Posted "+(Math.round(duration / 86400000)) + " days ago"));
        }

        if( 2419200000 > duration && duration > 604800000) {// week
            cell.append(text("Posted "+(Math.round(duration / 604800000)) + " weeks ago"));
        }
        if(duration > 2419200000){ // month
            cell.append(text("Posted "+(Math.round(duration / 2419200000)) + " months ago"));
        }        
    })
    .catch(function(err){
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

function bold(node){ 
    var bold = ce("b");
    bold.append(node);
    return bold; 
}

function cardDiv() {
    var div = ce("div");
    div.setAttribute("class", "ui-component-card ui-layout-column-6");
    return div; 
}

function ge(element){
    return document.getElementById(element);
}

function ce(element) {
    return document.createElement(element);
}
function text(txt) {
    return document.createTextNode(txt);
}

