const featuredJobsSpan  = ge("featured_jobs_view");

function getFeaturedJobs(){
    console.log("featuring" );
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

    featuredJobsSpan.innerHTML = "";
  //  jobAddresses = ["0xd131FcEdA33B197513eCa94c2d0c18a42be198B7"];
    console.log("featured job addresses : " + jobAddresses.length );
    if(jobAddresses.length > 0){
        for( var x = 0; x < jobAddresses.length; x++){
            var postingAddress = jobAddresses[x];
            if(postingAddress != '0x0000000000000000000000000000000000000000'){
                addFeaturedJob(postingAddress);
            }
        }
    }
    else {
        var c = ce("center");
        c.append(text("New Features are on the way!"));
        featuredJobsSpan.append(c);
    }
}

function addFeaturedJob(postingAddress) {


    var jobDetailLinkDestination = "pages/app/job_detail_template.html?postingAddress=" + postingAddress;

    console.log(jobDetailLinkDestination);

    var layoutDiv = document.createElement("div");
    layoutDiv.setAttribute("class", "col-lg-12 col-md-6 d-flex align-items-stretch" );
    layoutDiv.setAttribute("data-aos", "zoom-in");
    layoutDiv.setAttribute("data-aos-delay", 100);
    featuredJobsSpan.appendChild(layoutDiv);

    var iconBox = ce("div");
    iconBox.setAttribute("class", "icon-box");
    layoutDiv.append(iconBox);

    var icon = ce("div");
    iconBox.append(icon);
    //icon.setAttribute("class", "icon");

    var hiringCompanyLogoLink = ce("a");
    icon.append( hiringCompanyLogoLink);
    hiringCompanyLogoLink.setAttribute("target", "_blank");

    var hiringCompanyLogo = ce("img");        
    hiringCompanyLogo.setAttribute("class", "icon");
    hiringCompanyLogoLink.append(hiringCompanyLogo);  


    var hiringCompany = document.createElement("h5");
    iconBox.appendChild(hiringCompany);

    var detailLink = document.createElement("a");
    iconBox.append(detailLink);        
    detailLink.setAttribute("href", jobDetailLinkDestination);

    var jobTitle = document.createElement("h4");
    detailLink.appendChild(jobTitle);              


    var paragraph = document.createElement("p");
    iconBox.appendChild(paragraph);
    

    populateFeaturedJob(jobTitle, hiringCompany, hiringCompanyLogo, hiringCompanyLogoLink, jobDetailLinkDestination, postingAddress);       

}

function populateFeaturedJob(jobTitle, hiringCompany, hiringCompanyLogo,  hiringCompanyLogoLink, jobDetailLinkDestination, postingAddress ) {
    jcJobPostingContract = getContract(iJCJobPostingAbi, postingAddress);
    console.log("featured job address: " + postingAddress);
    setFeaturedJobTitle(jobTitle,  jobDetailLinkDestination, jcJobPostingContract);
    setFeaturedCompany(hiringCompany, hiringCompanyLogo, hiringCompanyLogoLink, jcJobPostingContract);
    
}

function setFeaturedJobTitle(jobTitle, jobDetailLinkDestination, jcJobPostingContract) { 
    jcJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({from : account})
    .then(function(response){
        console.log(response);
        var title = response; 
        var link = ce("a");
        link.setAttribute("href", jobDetailLinkDestination);
        link.append(text(title));
        jobTitle.append(link);                
    })
    .catch(function(err){
        console.log(err);
    }); 
}

function setFeaturedCompany(hiringCompany, hiringCompanyLogo, hiringCompanyLogoLink,  jcJobPostingContract) {
    jcJobPostingContract.methods.getFeatureSTR("COMPANY_NAME").call({from : account})
    .then(function(response){
        var companyName = response; 
        var companySearchLink = ce("a");
        companySearchLink.setAttribute("href", "/pages/app/job_search_results.html?searchTerm="+companyName);
        companySearchLink.append(text(companyName));
        hiringCompany.append(companySearchLink);
        hiringCompanyLogo.setAttribute("alt", companyName);
        getFeaturedCompanyLink( hiringCompanyLogo, hiringCompanyLogoLink,   jcJobPostingContract) 
    })
    .catch(function(err){
        console.log(err);
    }); 
}

function getFeaturedCompanyLink(hiringCompanyLogo, hiringCompanyLogoLink,   jcJobPostingContract) {
    jcJobPostingContract.methods.getFeatureSTR("COMPANY_LINK").call({from : account})
    .then(function(response){
        console.log(response);
        var companyLink = response; 
        hiringCompanyLogoLink.setAttribute("href",companyLink);
        getFeaturedCompanyLogo( hiringCompanyLogo, jcJobPostingContract);
    })
    .catch(function(err){
        console.log(err);
    });
}

function getFeaturedCompanyLogo(hiringCompanyLogo, jcJobPostingContract) {
    jcJobPostingContract.methods.getFeatureSTR("COMPANY_LOGO").call({from : account})
    .then(function(response){
        console.log(response);
        var companyLogo = response; 
        hiringCompanyLogo.setAttribute("src", IPFS+companyLogo);
    })
    .catch(function(err){
        console.log(err);
    });
}


