const latestJobsView = document.getElementById("latest_jobs_view");

async function getLatestJobs() {
    console.log(jcJobCryptContract);
    jcJobCryptContract.methods.getLatestJobs().call({ from: account })
	.then(function(response) {
		console.log(response);
		var jobAddresses = response;
		buildLatestJobs(jobAddresses, latestJobsView);

	})
	.catch(function(err){
		console.log(err);
	});
}	

function buildLatestJobs(postingAddresses, latestJobsView) {

    console.log(postingAddresses);
    console.log("building jobs");

    for (var x = 0; x < postingAddresses.length; x++) {

        console.log(" x is "+ x);
        var postingAddress = postingAddresses[x];

        var jobDetailLinkDestination = "pages/app/job_detail_template.html?postingAddress=" + postingAddress;

        var layoutDiv = document.createElement("div");
        layoutDiv.setAttribute("class", "ui-component-card ui-layout-column-6");
        latestJobsView.appendChild(layoutDiv);

        var detailLink = document.createElement("a");
        layoutDiv.append(detailLink);        
        detailLink.setAttribute("href", jobDetailLinkDestination);


        var jobTitle = document.createElement("h4");
        detailLink.appendChild(jobTitle);              

        var hiringCompany = document.createElement("span");
        layoutDiv.appendChild(hiringCompany);

        jobTitle.setAttribute("class", "ui-component-card--title");
        jobTitle.setAttribute("style", "style=color: rgb(100, 36, 248);");

        var jobSummary = document.createElement("h5");
        layoutDiv.appendChild(jobSummary);

        var span = document.createElement("span");
        jobSummary.appendChild(span);
        
        populateJob(jobTitle, jobSummary, span, hiringCompany);
       

    }

    function populateJob(jobTitle, jobSummary, span, hiringCompany){

         // ======= START CONTRACT WORK =====
         console.log("posting address :- " + postingAddress);
         var postingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
 
         postingContract.methods.getFeature("JOB_TITLE").call({ from: account })
             .then(function(response) {
                 console.log("building title");
                 console.log(response);
                 var title = response;
                 var titleText = document.createTextNode(title);
                 jobTitle.appendChild(titleText);
             })
             .catch(function(err){
                 console.log(err);
             });
 
         postingContract.methods.getFeature('COMPANY_NAME').call({ from: account })
             .then(function(response) {
                 console.log(response);
                 var companyName = response;
                 postingContract.methods.getFeature('COMPANY_LINK').call({ from: account })
                     .then(function(response) {
                         console.log(response);
                         var companyLink = response;
                         var cLink = createLink(companyLink, companyName);
                         cLink.setAttribute("style", "color: cadetblue;");
                         cLink.setAttribute("target", "_blank");
                         hiringCompany.appendChild(cLink);
                     })
             })
             .catch(function(err){
                 console.log(err);
             });
 
 
         postingContract.methods.getFeature('WORK_TYPE').call({ from: account })
             .then(function(response) {
                 var workType = response;
                 postingContract.methods.getFeature('LOCATION_TYPE').call({ from: account })
                     .then(function(response) {
                         console.log(response);
                         var locationType = response;
                         postingContract.methods.getPostingDate().call({ from: account })
                             .then(function(response) {
                                 console.log(response);
                                 var postingDate = response;
                                 var jobSummaryText = " | Location :: " + locationType + " | Work Type :: " + workType + " | Posted ::  " + formatDate(new Date(postingDate*1000)) + " | ";
                                 var jsText = document.createTextNode(jobSummaryText);
                                 
                                 span.appendChild(jsText);
                                
                                 var moreLink = createLink(jobDetailLinkDestination, "more...");
                                 jobSummary.appendChild(moreLink);
                             })
 
                     })
                     .catch(function(err){
                         console.log(err);
                     });
 
             })

    }

}
