const popularJobsDiv = ge("popular_jobs_div");

const pageRoot = "../../../pages/app/";
const docRoot = "../../../pages/docs/";

async function configureCoreContracts() {
  console.log("configuring contracts");
  var requiredContracts = ["JOBCRYPT_CORE", "STAKE_MANAGER", "OPEN_RANKING"];
  console.log(requiredContracts);
  configureContracts(requiredContracts);
  getStaking(docRoot);
}

async function loadPageData() {
  console.log("loading page data");
  getLatestJobs();
  getPopularJobs();
  getFeaturedJobs();
  getMainSearch();
  getHotSearchTerms(pageRoot);

  getStakeStatus();
  loadPromos();
}

function ge(element) {
  return document.getElementById(element);
}
