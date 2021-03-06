

const hotSearchTitle = document.getElementById("hot_search_title");
const popularJobsTitle = document.getElementById("popular_jobs_title");
const featuredJobsTitle = document.getElementById("featured_jobs_title"); 
const latestJobsTitle = document.getElementById("latest_jobs_title");
const popularJobsDiv = document.getElementById("popular_jobs_div");

const pageRoot = "pages/app/";

async function configureCoreContracts() { 
	console.log("configuring contracts");
	var requiredContracts = ["JOBCRYPT_CORE", "STAKE_MANAGER", "OPEN_RANKING"];
	console.log(requiredContracts);
	configureContracts(requiredContracts);
}

async function loadPageData() {
	console.log("loading page data");
	getLatestJobs(); 
	getPopularJobs();
	getFeaturedJobs();
	getHotSearchTerms();
	getStakeStatus(); 
	
	popularJobsDiv.setAttribute("class","ui-component-card ui-layout-column-2");
	hotSearchTitle.innerHTML           = "<small><b>Hot search</b></small>";   
	latestJobsTitle.innerHTML          = "Latest Jobs"; 
	popularJobsTitle.innerHTML         = "<h6>Popular Jobs</h6>";
	featuredJobsTitle.innerHTML        = "<h6 align='center'>Featured Jobs</h6>";
}
               
    