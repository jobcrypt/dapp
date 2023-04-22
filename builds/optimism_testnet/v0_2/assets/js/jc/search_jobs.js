const mainSearchSpan = ge("main_search_span");
const mainSearchTitle = ge("main_search_title_span");
const hotSearchTitle = ge("hot_search_title");

const headerSearchSpan = ge("header_search_span");

async function getHotSearchTerms(root) {
    hotSearchTitle.innerHTML = "<small><b>Hot search</b></small>";
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
    hotSearchTable.innerHTML = "";
    var row = hotSearchTable.insertRow();

    for (var x = 0; x < hotSearchTerms.length; x++) {
        var cell = row.insertCell();

        var searchTerm = hotSearchTerms[x];
        var link = root + "job_search_results.html?searchTerm=" + searchTerm; // change dependent on location 

        var b = document.createElement("b");
        var termText = document.createTextNode(searchTerm + " ○ " );
        var s = ce("div");
        s.setAttribute("class", "section-title");
        s.append(termText);
        b.appendChild(s);
        var searchLink = createLink(link, "");
        searchLink.appendChild(b);

        cell.appendChild(searchLink);
    }
}

function getHeaderSearch() {
    headerSearchSpan.innerHTML = "";
    headerSearchSpan.append(getForm());
}

function getMainSearch() {
    mainSearchSpan.innerHTML = "";
    var c = ce("center");
    var card = ce("div");
    c.append(card);
    card.setAttribute("class", "col-md-4");
    var titleCentre = ce("center");
    var h2 = ce("h3");
    titleCentre.append(h2);
    h2.append(text("Search for Your Dream Decentralized Job"));
    card.append(titleCentre);
    var body = ce("div");
    body.setAttribute("class", "col-md-8");
    var center = ce("center");
    center.append(body);
    card.append(center);


    var form = getForm();
    
    
    body.append(form);
    mainSearchSpan.append(c);
}

function getForm() {
    var form = ce("form");
    form.setAttribute("action", "#");
    form.setAttribute("class", "ui-component-form ui-layout-grid ui-layout-column-4");
    var input = ce("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "job_search");
    input.setAttribute("placeholder", "type search e.g. Solidity, blockcahain");
    input.setAttribute("class", "form-control");
    form.append(input);
    var a = ce("a");
    a.setAttribute("type", "text");
    a.setAttribute("id", "job_search_button");
    a.setAttribute("class", "btn btn-outline-primary");
    a.append(text("Search"));
    a.addEventListener('click', searchJobs);
    var center = ce("center");
    center.append(a);
    form.append(center);
    return form;
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