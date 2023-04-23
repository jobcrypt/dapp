const popularJobsTitle = ge("popular_jobs_title");
const latestJobsTitle = ge("latest_jobs_title");
const popularJobsDiv = ge("popular_jobs_div");

const pageRoot = "pages/app/";
const docRoot = "pages/docs/";

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

  popularJobsDiv.setAttribute("class", "ui-component-card ui-layout-column-2");
  latestJobsTitle.innerHTML = "Latest Jobs";
  popularJobsTitle.innerHTML = "<h6>Popular Jobs</h6>";
}

function ge(element) {
  return document.getElementById(element);
}

window.onload = function () {
  if (typeof window.ethereum !== "undefined") {
    document.getElementById("metamaskButton").innerHTML = "Connect Metamask";
  } else {
    document.getElementById(
      "metamaskButton"
    ).innerHTML = `<a href="https://metamask.io/">Install Metamask to view jobs</a>`;
  }
};

const connectButton = document.getElementById("metamaskButton");
const walletID = document.getElementById("connectwallet");

function connect() {
  if (typeof window.ethereum !== "undefined") {
    ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
      const account = accounts[0];

      walletID.innerHTML = `Wallet connected: ${account}`;
    });
  } else {
    window.open("https://metamask.io/download/", "_blank");
  }
}
