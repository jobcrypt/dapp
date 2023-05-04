
async function configureCoreContracts() {
    var requiredContracts = ["JOBCRYPT_CORE"];
    configureContracts(requiredContracts);
}

function loadPageData() { 
	getMainSearch();
	loadPromos(); 
}