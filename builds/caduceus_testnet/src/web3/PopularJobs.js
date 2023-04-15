

// const popularJobsView = document.getElementById("popular_jobs_view");

// async function getPopularJobs() { 
// 	openRankingCoreContract.methods.getRanking("POPULAR_JOBS_RANKING_LIST",20).call({ from: account })
// 	.then(function(response) {
// 		console.log(response);
// 		var jcSortableAddresses = response;		
// 		getPostingAddresses(jcSortableAddresses);				
// 	})
// 	.catch(function(err){
// 		console.log(err);
// 	});
// }

// function getPostingAddresses(jcSortableAddresses) { 
//     popularJobsView.innerHTML = "";
//     for (var x = 0; x < jcSortableAddresses.length; x++) {
//         buildPopularJobs(jcSortableAddresses[x]);
//     }
// }

// function buildPopularJobs(sortableAddress) {
//     console.log(sortableAddress);
//     console.log("sortable : " + sortableAddress)
//     var iJCSortableContract = new web3.eth.Contract(iJCSortableAbi, sortableAddress)
//     console.log(iJCSortableContract);
//     iJCSortableContract.methods.getJobPostingAddress().call({from : account})
//     .then(function(response){
//         console.log(response);
//         var postingAddress = response; 
    
//         iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
//         buildPopularEntry(iJobPostingContract);
//     })
// 	.catch(function(err){
// 		console.log(err);
// 	});
// }

// function buildPopularEntry(iJobPostingContract){
//     iJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({
//         from: account
//     })
//     .then(function(response) {
//         console.log(response);
//         var title = response; 
      
//         var holder = ce("div");
//         popularJobsView.append(holder);
//         holder.setAttribute("class", "col-lg-4 col-md-6");
//         holder.setAttribute("data-aos", "zoom-in");
//         holder.setAttribute("data-aos-delay", "100");

//         var box = ce("div");
//         box.setAttribute("class", "icon-box");
//         holder.append(box);
        
        
//         var h4  = ce("h4");
//         h4.setAttribute("style","word-wrap: break-word;");

//         box.append(h4);
//         var a = ahref(); 
//         a.setAttribute("href", pageRoot+"job_search_results.html?search=POSTING_TITLE_SEARCH_FIELD&value=" + title);
//         a.append(text(title));
//         h4.append(a);
//     })
//     .catch(function(err) {
//         console.log(err);
//     }) 
// }
