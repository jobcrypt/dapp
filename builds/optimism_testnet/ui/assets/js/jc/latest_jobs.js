const latestJobsContainer = document.getElementById("latest-jobs-container");
const latestJobsView = document.getElementById("latest_jobs_view");
const latestJobsTitle = document.getElementById("latest-jobs-title");
const latestJobsSubtitle = document.getElementById("latest-jobs-subtitle");

async function getLatestJobs() {
  console.log(jcJobCryptContract);
  jcJobCryptContract.methods
    .getActiveJobPage(0)
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var jobAddresses = response._activeJobAddresses;

      console.log(jobAddresses);
      latestJobsView.innerHTML = "";

      // clear out
      buildLatestJobs(trimZeroAddresses(jobAddresses));
    })
    .catch(function (err) {
      console.log(err);
    });
}

function trimZeroAddresses(list) {
  var a = new Array();
  for (var x = 0; x < list.length; x++) {
    if (list[x] != "0x0000000000000000000000000000000000000000") {
      console.log("pushing " + list[x]);
      a.push(list[x]);
    } else {
      console.log("zero address :" + list[x]);
    }
  }
  return a;
}

function buildLatestJobs(postingAddresses) {
  console.log(postingAddresses);
  console.log("building jobs count: " + postingAddresses.length);

  for (var x = postingAddresses.length - 1; x >= 0; x--) {
    console.log(" x is " + x);

    var postingAddress = postingAddresses[x];
    //if(postingAddress != "0x9E15D0fFd6eBBf750eC96f2BD8a0e335A0Eb5490"){
    processRow(postingAddress);
    //}
  }
}

function processRow(postingAddress) {
  var jobDetailLinkDestination =
    "/pages/app/job_detail_template.html?postingAddress=" + postingAddress;

  console.log(jobDetailLinkDestination);

  latestJobsTitle.innerHTML = "Latest Jobs";
  latestJobsTitle.setAttribute(
    "class",
    "text-center text-2xl font-bold text-white"
  );

  latestJobsSubtitle.innerHTML =
    "Check out our latest jobs constantly updated on-chain ";
  latestJobsSubtitle.setAttribute(
    "class",
    "text-center text-lg my-3  text-white"
  );

  var layoutDiv = document.createElement("div");
  layoutDiv.setAttribute(
    "class",
    " text-white border border-white text-center whitespace-normal px-2  py-4 rounded-lg text-xs lg:text-sm "
  );
  layoutDiv.setAttribute("data-aos", "zoom-in");
  layoutDiv.setAttribute("data-aos-delay", 100);
  latestJobsView.appendChild(layoutDiv);

  var iconBox = ce("div");
  iconBox.setAttribute("class", "icon-box");
  layoutDiv.append(iconBox);

  var img = ce("img");
  img.setAttribute("class", "mb-2 mx-auto");
  img.src = "/assets/images/joblogo.svg";
  iconBox.append(img);

  var icon = ce("div");
  iconBox.append(icon);
  //icon.setAttribute("class", "icon");

  var hiringCompanyLogoLink = ce("a");
  icon.append(hiringCompanyLogoLink);

  var hiringCompanyLogo = ce("img");
  hiringCompanyLogo.setAttribute("class", "icon");
  hiringCompanyLogoLink.append(hiringCompanyLogo);
  hiringCompanyLogoLink.setAttribute("href", jobDetailLinkDestination);

  var hiringCompany = document.createElement("h5");
  iconBox.appendChild(hiringCompany);

  var detailLink = document.createElement("a");
  iconBox.append(detailLink);
  detailLink.setAttribute("href", jobDetailLinkDestination);

  var jobTitle = document.createElement("h4");
  detailLink.appendChild(jobTitle);

  var paragraph = document.createElement("p");
  iconBox.appendChild(paragraph);

  populateJob(
    jobTitle,
    // paragraph,
    // hiringCompany,
    // hiringCompanyLogo,
    // jobDetailLinkDestination,
    postingAddress
  );
}

/*
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><a href="https://www.jobcrypt.com"><img src="assets/images/logo/android-icon-48x48.png"></a></div>
              <h5>JobCrypt</h5>
              <h4><a href="">Executive Business Development Manager</a></h4>
              <p>| Location :: Geo-Remote | Work Type :: Contract | Posted :: 06/12/2022, 00:31:08 | <a href="https://www.jobcrypt.com/pages/app/job_detail_template.html?postingAddress=0x3c43C2469BF75C43b81937C7147A3b5aaBEcd808">more...</a></p>
            </div>
          </div>
*/

function populateJob(
  jobTitle,
  //   paragraph,
  //   hiringCompany,
  //   hiringCompanyLogo,
  //   jobDetailLinkDestination,
  postingAddress
) {
  // ======= START CONTRACT WORK =====
  console.log("posting address :- " + postingAddress);
  var postingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);

  postingContract.methods
    .getFeatureSTR("JOB_TITLE")
    .call({ from: account })
    .then(function (response) {
      console.log("building title");
      console.log(response);
      var title = response;
      var titleText = document.createTextNode(title);
      jobTitle.appendChild(titleText);
    })
    .catch(function (err) {
      console.log(err);
    });

  //   postingContract.methods
  //     .getFeatureSTR("COMPANY_NAME")
  //     .call({ from: account })
  //     .then(function (response) {
  //       console.log(response);
  //       var companyName = response;
  //       postingContract.methods
  //         .getFeatureSTR("COMPANY_LINK")
  //         .call({ from: account })
  //         .then(function (response) {
  //           console.log(response);
  //           var companyLink = response;
  //           var cLink = createLink(companyLink, companyName);
  //           cLink.setAttribute("style", "color: cadetblue;");
  //           cLink.setAttribute("target", "_blank");
  //           hiringCompany.appendChild(cLink);
  //         });
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });

  //   setCompanyLogo(postingContract, hiringCompanyLogo);

  //   postingContract.methods
  //     .getFeatureSTR("JOB_WORK_TYPE")
  //     .call({ from: account })
  //     .then(function (response) {
  //       var workType = response;
  //       postingContract.methods
  //         .getFeatureSTR("JOB_LOCATION_TYPE")
  //         .call({ from: account })
  //         .then(function (response) {
  //           console.log(response);
  //           var locationType = response;
  //           postingContract.methods
  //             .getFeatureUINT("POSTING_DATE_FEATURE")
  //             .call({ from: account })
  //             .then(function (response) {
  //               console.log(response);
  //               var postingDate = response;
  //               var jobSummaryText =
  //                 " | Location :: " +
  //                 locationType +
  //                 " | Work Type :: " +
  //                 workType +
  //                 " | Posted ::  " +
  //                 formatDate(new Date(postingDate * 1000)) +
  //                 " | ";
  //               var jsText = document.createTextNode(jobSummaryText);

  //               paragraph.appendChild(jsText);

  //               var moreLink = createLink(jobDetailLinkDestination, "more...");
  //               paragraph.appendChild(moreLink);
  //             });
  //         })
  //         .catch(function (err) {
  //           console.log(err);
  //         });
  //     });
  // }

  // function setCompanyLogo(postingContract, hiringCompanyLogo) {
  //   postingContract.methods
  //     .getFeatureSTR("COMPANY_LOGO")
  //     .call({ from: account })
  //     .then(function (response) {
  //       console.log(response);
  //       var logoCid = response;
  //       if (response != "") {
  //         url = "https://jobcrypt.infura-ipfs.io/ipfs/" + logoCid;
  //         hiringCompanyLogo.setAttribute("src", url);
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
}
