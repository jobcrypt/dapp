const popularJobsView = document.getElementById("popular_jobs_view");
const popularJobsTitle = document.getElementById("popular_jobs_title");
const popularJobsSubtitle = document.getElementById("popular_jobs_subtitle");

async function getPopularJobs() {
  openRankingCoreContract.methods
    .getRanking("POPULAR_JOBS_RANKING_LIST", 20)
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var jcSortableAddresses = response;
      getPostingAddresses(jcSortableAddresses);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getPostingAddresses(jcSortableAddresses) {
  popularJobsView.innerHTML = "";
  popularJobsTitle.innerHTML = "Popular Jobs";
  popularJobsTitle.setAttribute(
    "class",
    " text-white text-center text-2xl font-bold"
  );

  popularJobsSubtitle.innerHTML =
    "Check out our popular jobs constantly updated on-chain ";
  popularJobsSubtitle.setAttribute(
    "class",
    " text-white text-center text-lg my-3 "
  );

  for (var x = 0; x < jcSortableAddresses.length; x++) {
    buildPopularJobs(jcSortableAddresses[x]);
  }
}

function buildPopularJobs(sortableAddress) {
  console.log(sortableAddress);
  console.log("sortable : " + sortableAddress);
  var iJCSortableContract = new web3.eth.Contract(
    iJCSortableAbi,
    sortableAddress
  );
  console.log(iJCSortableContract);
  iJCSortableContract.methods
    .getJobPostingAddress()
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var postingAddress = response;

      iJobPostingContract = new web3.eth.Contract(
        iJCJobPostingAbi,
        postingAddress
      );
      buildPopularEntry(iJobPostingContract);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function buildPopularEntry(iJobPostingContract) {
  iJobPostingContract.methods
    .getFeatureSTR("JOB_TITLE")
    .call({
      from: account,
    })
    .then(function (response) {
      console.log(response);
      var title = response;
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
      var holder = ce("div");
      popularJobsView.append(holder);
      holder.setAttribute(
        "class",
        "text-center text-white border border-white px-2 py-2 whitespace-normal text-xs lg:text-sm rounded-xl text-xs"
      );
      holder.setAttribute("data-aos", "zoom-in");
      holder.setAttribute("data-aos-delay", "100");

      var img = ce("img");
      img.setAttribute("class", "mb-2 mx-auto");
      img.src = "/assets/images/joblogo.svg";
      holder.append(img);

      var box = ce("div");
      box.setAttribute("class", "icon-box");
      holder.append(box);

      var h4 = ce("h4");
      h4.setAttribute("style", "word-wrap: break-word;");

      box.append(h4);
      var a = ahref();
      a.setAttribute(
        "href",
        pageRoot +
          "job_search_results.html?search=POSTING_TITLE_SEARCH_FIELD&value=" +
          title
      );
      a.append(text(title));
      h4.append(a);
    })
    .catch(function (err) {
      console.log(err);
    });
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
