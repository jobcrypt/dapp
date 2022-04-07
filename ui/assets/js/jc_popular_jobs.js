const popularJobsTable = document.getElementById("popular_jobs_table");
async function getPopularJobs() { 
	jcJobCryptContract.methods.getPopularJobs().call({ from: account })
	.then(function(response) {
		console.log(response);
		var postingAddresses = response;		
		buildPopularJobs(postingAddresses);				
	})
	.catch(function(err){
		console.log(err);
	});
}

function buildPopularJobs(postingAddresses) {

    for (var x = 0; x < postingAddresses.length; x++) {
        postingAddress = postingAddresses[x]
        var row = popularJobsTable.insertRow();
        var cell = row.insertCell();  

        iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);
        buildPopularEntry(iJobPostingContract, cell);

    }
}

function buildPopularEntry(iJobPostingContract, cell){
    iJobPostingContract.methods.getFeature("JOB_TITLE").call({
        from: account
    })
    .then(function(response) {
        console.log(response);
        var title = response; 
        var a = ahref(); 
        a.setAttribute("href", "/pages/app/job_search_results.html?search=JOB_TITLE&value=" + title);
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