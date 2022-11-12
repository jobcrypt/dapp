const featuredJobsDiv   = ge("featured_jobs_div");
const featuredJobsTitle = ge("featured_jobs_title");
const featuredJobsSpan  = ge("featured_jobs_span");
var featuredJobsTable   = ce("table");


async function getFeaturedJobs(){
    featuredJobsTitle.innerHTML = "<h6>Featured Jobs</h6>";
	jcJobCryptContract.methods.getFeaturedJobs().call({ from: account })
	.then(function(response) {
		console.log(response);
		var jobAddresses = response;
        console.log("building featured jobs");
		buildFeaturedJobs(jobAddresses);
	})
	.catch(function(err){
		console.log(err);
	});
}


function buildFeaturedJobs(jobAddresses) {
    featuredJobsDiv.setAttribute("class",""); // clear it
    featuredJobsDiv.setAttribute("class","ui-component-card ui-layout-column-4");
    featuredJobsSpan.innerHTML = "";
    var c = ce("center");
    featuredJobsSpan.append(c);
    c.append(featuredJobsTable);

    for( var x = 0; x < jobAddresses.length; x++){
        var postingAddress = jobAddresses[x];
        if(postingAddress != '0x0000000000000000000000000000000000000000'){
            addFeaturedJob(postingAddress);
        }
    }
}

function addFeaturedJob(postingAddress) {
    jcJobPostingContract = getContract(iJCJobPostingAbi, postingAddress);
    console.log("featured job address: " + postingAddress);
    jcJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({from : account})
    .then(function(response){
        console.log(response);
        var jobTitle = response; 
        getCompanyName(jobTitle, postingAddress);
    })
    .catch(function(err){
        console.log(err);
    });        

}

function getCompanyName(jobTitle, postingAddress) {
    console.log("featured posting address " + postingAddress);
    var jobDetailLinkDestination = pageRoot+"job_detail_template.html?postingAddress=" + postingAddress;
  
    var jcJobPostingContract = getContract(iJCJobPostingAbi, postingAddress);
    jcJobPostingContract.methods.getFeatureSTR("COMPANY_NAME").call({from : account})
    .then(function(response){
        console.log(response);
            var companyName = response; 
            getCompanyLink(jobTitle, companyName, jobDetailLinkDestination, jcJobPostingContract)
    })
    .catch(function(err){
        console.log(err);
    });
}

function getCompanyLink(jobTitle, companyName, jobDetailLinkDestination, jcJobPostingContract) {
    jcJobPostingContract.methods.getFeatureSTR("COMPANY_LINK").call({from : account})
    .then(function(response){
        console.log(response);
        var companyWeb = response; 
        buildFeaturedJob(jobTitle, jobDetailLinkDestination, companyName, companyWeb);
    })
    .catch(function(err){
        console.log(err);
    });
}

function buildFeaturedJob(jobTitle, jobDetailLinkDestination, companyName, companyWeb) {
    var row = featuredJobsTable.insertRow();
    var jobCell = row.insertCell();
    var boldFormat = document.createElement("b");
    var jobTitleText = document.createTextNode(jobTitle);
    boldFormat.appendChild(jobTitleText);

    var jobLink = createLink(jobDetailLinkDestination, "");
    jobLink.appendChild(boldFormat);
    
    jobCell.append(jobLink);
    console.log(jobLink);

    var rowCompany = featuredJobsTable.insertRow();
    cell = rowCompany.insertCell();
    cell.setAttribute("style", "text-align: center;");

   // var companyLink = createLink(companyWeb, companyName);
    console.log("FEATURED: " + companyName);
    var companyLink = ce("a");
    companyLink.append(text(companyName));
    companyLink.setAttribute("href", companyWeb);
    companyLink.setAttribute("style", "color: cadetblue;");
    companyLink.setAttribute("target", "_blank");
    var br = ce("br");    
    cell.append(companyLink);
    cell.append(br);
    cell.appendChild(jobLink);

    console.log(featuredJobsTable);
}

