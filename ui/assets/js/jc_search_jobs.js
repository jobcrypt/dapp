const mainSearchSpan  = ge("main_search_span");
const mainSearchTitle = ge("main_search_title_span");
const hotSearchTitle  = ge("hot_search_title");

async function getHotSearchTerms(root) {
    hotSearchTitle.innerHTML           = "<small><b>Hot search</b></small>";   
    jcJobCryptContract.methods.getHotSearchTerms().call({ from: account })
        .then(function(response) {
            console.log(response);
            var hotSearchTerms = response;
            buildHotSearch(root, hotSearchTerms);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function buildHotSearch(root, hotSearchTerms) {
    const hotSearchTable = document.getElementById("hot_search_table");
    var row = hotSearchTable.insertRow();

    for (var x = 0; x < hotSearchTerms.length; x++) {
        var cell = row.insertCell();

        var searchTerm = hotSearchTerms[x];
        var link = root+"job_search_results.html?searchTerm=" + searchTerm; // change dependent on location 

        var b = document.createElement("b");
        var termText = document.createTextNode(searchTerm + "|");
        b.appendChild(termText);
        var searchLink = createLink(link, "");
        searchLink.appendChild(b);
        searchLink.setAttribute("style", "color: rgb(18, 22, 236);");

        cell.appendChild(searchLink);
    }
}

function getMainSearch() {
    var card = ce("div") ;
    card.setAttribute("class", " ui-layout-column-5");
    var titleCentre = ce("center");
    var h2 = ce("h3");
    titleCentre.append(h2);
    h2.append(text("Dream Job Decentralized Search"));
    card.append(titleCentre);
    var body = ce("div");
    body.setAttribute("class", "ui-component-cta ui-layout-flex");
    card.append(body);


	var form = ce("form");
	form.setAttribute("action", "#");
	form.setAttribute("class", "ui-component-form ui-layout-grid ui-layout-column-4");
	var input = ce("input");
	input.setAttribute("type","text");
	input.setAttribute("id", "job_search");
	input.setAttribute("placeholder", "type search e.g. Solidity, blockcahain");
	input.setAttribute("class", "ui-component-input ui-component-input-medium");
	form.append(input);
	var a = ce("a");
	a.setAttribute("type","text");
	a.setAttribute("id", "job_search_button");
	a.setAttribute("class", "ui-component-button ui-component-button-medium ui-component-button-primary");
	a.append(text("Search"));
    a.addEventListener('click', searchJobs);
	form.append(a);	
	body.append(form);
    mainSearchSpan.append(card);
}

function searchJobs() {
    console.log("searching jobs ");
    var jobSearchField = ge("job_search");
    var link = "/pages/app/job_search_results.html?searchTerm=" + jobSearchField.value;
    window.open(link, "_self");
}

function ge(element) {
    return document.getElementById(element);
}

function ce(element) {
	return document.createElement(element);
}

function text(txt) {
	return document.createTextNode(txt);
}