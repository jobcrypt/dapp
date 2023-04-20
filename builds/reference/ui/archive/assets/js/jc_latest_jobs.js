    const latestJobsView = document.getElementById("latest_jobs_view");

    async function getLatestJobs() {
        console.log(jcJobCryptContract);
        jcJobCryptContract.methods.getActiveJobPage(0).call({ from: account })
        .then(function(response) {
            console.log(response);
            var jobAddresses = response._activeJobAddresses;

            console.log(jobAddresses);
            latestJobsView.innerHTML = ""; // clear out 
            buildLatestJobs(trimZeroAddresses(jobAddresses));
        })
        .catch(function(err){
            console.log(err);
        });
    }	

    function trimZeroAddresses(list){
        var a = new Array();  
        for(var x = 0; x <list.length; x++) {
            if(list[x] != "0x0000000000000000000000000000000000000000"){
                console.log("pushing " + list[x]);
                a.push(list[x]);
            }
            else {
                console.log("zero address :" + list[x] );

            }
        }
        return a; 
    }

    function buildLatestJobs(postingAddresses) {

        console.log(postingAddresses);
        console.log("building jobs count: " + postingAddresses.length);

        for (var x = postingAddresses.length-1; x >=0 ; x--) {
            console.log(" x is "+ x);

            var postingAddress = postingAddresses[x];
            //if(postingAddress != "0x9E15D0fFd6eBBf750eC96f2BD8a0e335A0Eb5490"){
                processRow(postingAddress);
            //}
        }
    }

    function processRow(postingAddress){
        var jobDetailLinkDestination = "pages/app/job_detail_template.html?postingAddress=" + postingAddress;

        console.log(jobDetailLinkDestination);

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
        
        populateJob(jobTitle, jobSummary, span, hiringCompany,  jobDetailLinkDestination, postingAddress);
    }

    function populateJob(jobTitle, jobSummary, span, hiringCompany, jobDetailLinkDestination, postingAddress){

         // ======= START CONTRACT WORK =====
         console.log("posting address :- " + postingAddress);
         var postingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
 
         postingContract.methods.getFeatureSTR("JOB_TITLE").call({ from: account })
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
 
         postingContract.methods.getFeatureSTR('COMPANY_NAME').call({ from: account })
        .then(function(response) {
            console.log(response);
            var companyName = response;
            postingContract.methods.getFeatureSTR('COMPANY_LINK').call({ from: account })
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
 
 
         postingContract.methods.getFeatureSTR('JOB_WORK_TYPE').call({ from: account })
             .then(function(response) {
                 var workType = response;
                 postingContract.methods.getFeatureSTR('JOB_LOCATION_TYPE').call({ from: account })
                     .then(function(response) {
                         console.log(response);
                         var locationType = response;
                         postingContract.methods.getFeatureUINT("POSTING_DATE_FEATURE").call({ from: account })
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

