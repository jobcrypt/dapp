const data = [
  {
    career: "front-end developer",
    date: "12/03/23",
    image: "../assets/images/jclogo.svg",
  },
];

const newArray = Array(20).fill([...data]);
console.log(newArray);

function getJobs() {
  document.getElementById("jc_jobs").innerHTML = newArray
    .flat()
    .map(
      (job) =>
        `<div class=" rounded-xl bg-[#D9D9D9] p-2 text-xs"> <span class="flex items-center gap-2 justify-center"><img src="../assets/images/jclogosmall.svg"> <p>JobCrypt</p></span>  <p class="font-bold text-center">${job.career}</p>  <p class="text-center">${job.date}</p></div>`
    );
}
getJobs();

const latestArray = Array(30).fill([...data]);
console.log(newArray);

function getLatestJobs() {
  document.getElementById("jc_latest_jobs").innerHTML = latestArray
    .flat()
    .map(
      (job) =>
        `<div class=" rounded-xl bg-[#D9D9D9] p-2 text-xs"> <span class="flex items-center gap-2 justify-center"><img src="../assets/images/jclogosmall.svg"> <p>JobCrypt</p></span>  <p class="font-bold text-center">${job.career}</p>  <p class="text-center">${job.date}</p></div>`
    );
}
getLatestJobs();

const popularArray = Array(10).fill([...data]);
console.log(newArray);

function getPopularJobs() {
  document.getElementById("jc_popular_jobs").innerHTML = popularArray
    .flat()
    .map(
      (job) =>
        `<div class=" rounded-xl bg-[#D9D9D9] p-2 text-xs"> <span class="flex items-center gap-2 justify-center"><img src="../assets/images/jclogosmall.svg"> <p>JobCrypt</p></span>  <p class="font-bold text-center">${job.career}</p>  <p class="text-center">${job.date}</p></div>`
    );
}
getPopularJobs();
