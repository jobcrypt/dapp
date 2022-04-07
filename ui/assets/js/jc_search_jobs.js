const jobSearchButton = ge("job_search_button");
const jobSearchField = ge("job_search");

console.log("prepping search" + jobSearchButton);

jobSearchButton.addEventListener('click', searchJobs);

console.log("button" + jobSearchButton);

async function getHotSearchTerms() {
    jcJobCryptContract.methods.getHotSearchTerms().call({ from: account })
        .then(function(response) {
            console.log(response);
            var hotSearchTerms = response;
            buildHotSearch(hotSearchTerms);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function buildHotSearch(hotSearchTerms) {
    const hotSearchTable = document.getElementById("hot_search_table");
    var row = hotSearchTable.insertRow();

    for (var x = 0; x < hotSearchTerms.length; x++) {
        var cell = row.insertCell();

        var searchTerm = hotSearchTerms[x];
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


function searchJobs() {
    console.log("searching jobs ");
    var link = "/pages/app/job_search_results.html?searchTerm=" + jobSearchField.value;
    window.open(link, "_self");
}

function ge(element) {
    return document.getElementById(element);
}