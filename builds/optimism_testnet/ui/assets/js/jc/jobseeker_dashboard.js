const dashboardMessageSpan = ge("dashboard_message_span");
const applicantDashboardTable = ge("applicant_dashboard_table");

const createOnchainJobSeekerDashboard = ge(
  "create_jobseeker_onchain_dashboard_button_span"
);
const createOnChainEmployerDashboardTitle = ge(
  "create_jobseeker_onchain_dashboard_title"
);

var iJobSeekerDashboardContract;
const pageRoot = "";

async function configureCoreContracts() {
  var requiredContracts = ["FACTORY_FACADE", "STAKE_MANAGER"];
  configureContracts(requiredContracts);
  console.log(jcFactoryFacadeContract);
}

function loadPageData() {
  findDashboard();
  loadPromos();
}

function findDashboard() {
  console.log(jcFactoryFacadeContract);
  jcFactoryFacadeContract.methods
    .findDashboard("JOBSEEKER_DASHBOARD_TYPE")
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var dashboardAddress = response;
      if (dashboardAddress != 0x0000000000000000000000000000000000000000) {
        loadDashboard(dashboardAddress);
      } else {
        createDashboardButton();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function findAgain() {
  console.log(jcFactoryFacadeContract);
  jcFactoryFacadeContract.methods
    .findDashboard("JOBSEEKER_DASHBOARD_TYPE")
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var dashboardAddress = response;
      if (dashboardAddress != 0x0000000000000000000000000000000000000000) {
        loadDashboard(dashboardAddress);
      } else {
        console.log("Error");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function createDashboardButton() {
  createOnChainEmployerDashboardTitle.innerHTML =
    "An onchain dashboard is needed to view your job application information";
  createOnchainJobSeekerDashboard.innerHTML = "";
  var a = ce("a");
  a.setAttribute("href", "javascript:getDashboard();");
  a.setAttribute(
    "class",
    "bg-jcBlack text-jcBlue px-5 py-2 rounded-full mx-auto"
  );
  a.append(text("Click to create your dashboard onchain"));
  createOnchainJobSeekerDashboard.append(a);
}

function getDashboard() {
  createOnchainJobSeekerDashboard.innerHTML = "";
  dashboardMessageSpan.innerHTML =
    "Creating your Job Search Dashboard please confirm your Wallet Transaction";
  jcFactoryFacadeContract.methods
    .getDashboard("JOBSEEKER_DASHBOARD_TYPE")
    .send({ from: account })
    .then(function (response) {
      console.log(response); // send dashboard created message;

      findAgain();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function loadDashboard(dashboardAddress) {
  iJobSeekerDashboardContract = new web3.eth.Contract(
    iJCJobSeekerDashboardAbi,
    dashboardAddress
  );
  buildApplicantDashboardTable();
}

function buildApplicantDashboardTable() {
  clearTableLeaveHeader(applicantDashboardTable);
  // get all application posts
  iJobSeekerDashboardContract.methods
    .getAppliedJobs()
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      var applications = response;
      if (applications.length > 0) {
        for (var x = 0; x < applications.length; x++) {
          var postingAddress = applications[x];
          addApplicationRow(postingAddress);
        }
      } else {
        dashboardMessageSpan.innerHTML = "You have made no applications";
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addApplicationRow(postingAddress) {
  var applicantRow = applicantDashboardTable.insertRow();
  applicantRow.setAttribute(
    "class",
    "grid grid-cols-5 text-sm mt-5 text-center"
  );
  var applicationDateCell = applicantRow.insertCell();
  var titleCell = applicantRow.insertCell();
  var applicationLink = applicantRow.insertCell();
  var applicantCountCell = applicantRow.insertCell();
  var jobStatusCell = applicantRow.insertCell();

  iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);

  iJobPostingContract.methods
    .getApplicantData(account)
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      var applicantData = response;

      var dateTxt = applicantData.applicationDate;
      applicationDateCell.append(text(formatTime(dateTxt)));

      var applicationLinkTxt = applicantData.link;
      applicationLink.append(text(applicationLinkTxt));
    })
    .catch(function (err) {
      console.log(err);
    });

  iJobPostingContract.methods
    .getFeatureSTR("JOB_TITLE")
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      var title = response;
      var a = ahref();
      a.setAttribute(
        "href",
        "/pages/app/job_detail_template.html?postingAddress=" + postingAddress
      );
      a.append(text(title));

      titleCell.append(bold(a));
    })
    .catch(function (err) {
      console.log(err);
    });

  iJobPostingContract.methods
    .getFeatureUINT("APPLICANT_COUNT_FEATURE")
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      applicantCountCell.append(center(text(response)));
    })
    .catch(function (err) {
      console.log(err);
    });

  iJobPostingContract.methods
    .getStatus()
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      var s = response;
      var st = resolveStatus(s);
      jobStatusCell.append(text(st));
    })
    .catch(function (err) {
      console.log(err);
    });
  //
  /*
        	<tr>
        		<td>2021 /12/06 11:00</td>
        		<td><a href="../app/job_detail_template.html" target="_blank"><b>DeFi Community Manager</b></a></td>
        		<td>
        			<center>65</center>
        		</td>
        		<td>Open</td>
        	</tr>
        */
}

function resolveStatus(x) {
  if (x == 0) {
    return "DRAFT";
  }
  if (x == 1) {
    return "OPEN";
  }
  if (x == 2) {
    return "FILLED";
  }
  if (x == 3) {
    return "CANCELLED";
  }
  if (x == 4 || x == 5 || x == 6 || x == 7 || x == 8) {
    return "EXPIRED";
  }
}

function clearTableLeaveHeader(table) {
  var len = table.rows.length;
  if (len === 1 || len === 0) {
    return;
  }
  for (var x = 1; x < len; x++) {
    table.rows[1].remove();
  }
}

function formatDate(date) {
  return date.toLocaleString("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatTime(seconds) {
  return formatDate(new Date(seconds * 1000));
}

function ge(element) {
  return document.getElementById(element);
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

function center(node) {
  var c = document.createElement("center");
  c.append(node);
  return c;
}
