const popularJobsTable = document.getElementById("popular_jobs_table");
async function getPopularJobs() { 
	openRankingCoreContract.methods.getRanking("POPULAR_JOBS_RANKING_LIST",20).call({ from: account })
	.then(function(response) {
		console.log(response);
		var jcSortableAddresses = response;		
		getPostingAddresses(jcSortableAddresses);				
	})
	.catch(function(err){
		console.log(err);
	});
}

function getPostingAddresses(jcSortableAddresses) { 
    for (var x = 0; x < jcSortableAddresses.length; x++) {
        buildPopularJobs(jcSortableAddresses[x]);
    }
}

function buildPopularJobs(sortableAddress) {
    console.log(sortableAddress);
    console.log("sortable : " + sortableAddress)
    var iJCSortableContract = new web3.eth.Contract(iJCSortableAbi, sortableAddress)
    console.log(iJCSortableContract);
    iJCSortableContract.methods.getJobPostingAddress().call({from : account})
    .then(function(response){
        console.log(response);
        var postingAddress = response; 
        var row = popularJobsTable.insertRow();
        var cell = row.insertCell();  
    
        iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
        buildPopularEntry(iJobPostingContract, cell);
    })
	.catch(function(err){
		console.log(err);
	});
}

var pageRoot = "pages/app";

function buildPopularEntry(iJobPostingContract, cell){
    iJobPostingContract.methods.getFeatureSTR("JOB_TITLE").call({
        from: account
    })
    .then(function(response) {
        console.log(response);
        var title = response; 
        var a = ahref(); 
        a.setAttribute("href", pageRoot+"job_search_results.html?search=POSTING_TITLE_SEARCH_FIELD&value=" + title);
        a.append(text(title));
        a.setAttribute("style", "color: rgb(230, 59, 144);");
        cell.append(bold(a));
    })
    .catch(function(err) {
        console.log(err);
    }) 
}

function text(txt) {
	return document.createTextNode(txt);        
}

function ahref() {
	return document.createElement("a");
}

function bold(node) {
	var bold = document.createElement("b");
	bold.append(node);
	return bold;
}