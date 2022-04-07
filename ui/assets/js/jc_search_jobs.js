const hotSearch = document.getElementById("hot_search ");
const hotSearchTermsView = document.getElementById("hot_search_terms_view");

async function getHotSearchTerms(){
	jcJobCryptContract.methods.getHotSearchTerms().call({ from: account })
	.then(function(response) {
		console.log(response);
		var hotSearchTerms = response;      
		buildHotSearch(hotSearchTerms, hotSearchTermsView);
	})
	.catch(function(err){
		console.log(err);
	});
}

function buildHotSearch() {
    const hotSearchTable = document.getElementById("hot_search_table");
    var row = hotSearchTable.insertRow();

    for (var x = 0; x < 5; x++) {
        var cell = row.insertCell();

        var searchTerm = "test term " + x;
        var link = "pages/app/job_search_results.html?searchTerm=" + searchTerm; // change dependent on location 

        var b = document.createElement("b");
        var termText = document.createTextNode(searchTerm + "|");
        b.appendChild(termText);
        var searchLink = createLink(link, "");
        searchLink.appendChild(b);
        searchLink.setAttribute("style", "color: rgb(18, 22, 236);");

        cell.appendChild(searchLink);
    }
}
