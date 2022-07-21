const featuredJobsView = document.getElementById("featured_jobs_table");

async function getFeaturedJobs(){
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
    //clearTableNoHeader(featuredJobsView);

    for( var x = 0; x < jobAddresses.length; x++){
        var postingAddress = jobAddresses[x];
        addFeaturedJob(postingAddress);
    }
}

function addFeaturedJob(postingAddress) {
    jcJobPostingContract = getContract(iJCJobPostingAbi, postingAddress);

    jcJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({from : account})
    .then(function(response){
        console.log(response);
        var jobTitle = response; 
        var jobDetailLinkDestination = "/pages/app/job_detail_template.html?postingAddress=" + postingAddress;
        jcJobPostingContract.methods.getFeatureSTR("COMPANY_NAME").call({from : account})
        .then(function(response){
            console.log(response);
                var companyName = response; 
            jcJobPostingContract.methods.getFeatureSTR("COMPANY_LINK").call({from : account})
            .then(function(response){
                console.log(response);
                var companyWeb = response; 
                buildFeaturedJob(jobTitle, jobDetailLinkDestination, companyName, companyWeb);
            })
            .catch(function(err){
                console.log(err);
            });

        })
        .catch(function(err){
            console.log(err);
        });
    })
    .catch(function(err){
        console.log(err);
    });        

}

function buildFeaturedJob(jobTitle, jobDetailLinkDestination, companyName, companyWeb) {
    var row = featuredJobsView.insertRow();
    var jobCell = row.insertCell();
    var boldFormat = document.createElement("b");
    var jobTitleText = document.createTextNode(jobTitle);
    boldFormat.appendChild(jobTitleText);

    var jobLink = createLink(jobDetailLinkDestination, "");
    jobLink.appendChild(boldFormat);
    
    jobCell.append(jobLink);

    var rowCompany = featuredJobsView.insertRow();
    cell = rowCompany.insertCell();
    cell.setAttribute("style", "text-align: center;");

    var companyLink = createLink(companyWeb, companyName);
    companyLink.setAttribute("style", "color: cadetblue;");
    companyLink.setAttribute("target", "_blank");
    var br = document.createElement("br");    
    cell.append(companyLink);
    cell.append(br);
    cell.appendChild(jobLink);
}

