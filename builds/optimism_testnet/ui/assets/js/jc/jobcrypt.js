// initialise JobCrypt Core
var jcPaymentManagerContract;
var jcVSPaymentManagerContract;
var jcJobCryptContract;
var jcFactoryFacadeContract;
var jcStakeManagerContract;
var openProductCoreContract;

var jcPaymentManagerAddress;
var jcVSPaymentManagerAddress;
var jcJobCryptAddress;
var jcFactoryFacadeAddress;
var jcStakeManagerAddress;
var openProductCoreAddress;

// const openRegisterAddress = "0xB5fC104567DC63E6D9cde372c518E6CCadfD3C32"; /* LIVE */
const openRegisterAddress =
  "0xEfdeAC0C0778DED8eA0a72be3D93258F44Ff9627"; /*  SEPOLIA TESTNET */

const openRegistryContract = new web3.eth.Contract(
  iOpenRegisterAbi,
  openRegisterAddress
);

async function configureContracts(requiredContracts) {
  console.log("registry contract");
  console.log(openRegistryContract);

  console.log(requiredContracts);

  if (requiredContracts.includes("OPEN_PRODUCT")) {
    openRegistryContract.methods
      .getAddress("RESERVED_OPEN_PRODUCT_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        openProductCoreAddress = response;
        openProductCoreContract = getContract(
          iOpenProductCoreAbi,
          openProductCoreAddress
        );
        console.log("OPEN_PRODUCT");
        console.log(openProductCoreContract);

        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (requiredContracts.includes("OPEN_RANKING")) {
    console.log(account + "");
    openRegistryContract.methods
      .getAddress("RESERVED_OPEN_RANKING_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        openRankingCoreAddress = response;
        openRankingCoreContract = getContract(
          iOpenRankingCoreAbi,
          openRankingCoreAddress
        );
        console.log("OPEN_RANKING");
        console.log(openRankingCoreContract);
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (requiredContracts.includes("PAYMENT_MANAGER")) {
    openRegistryContract.methods
      .getAddress("RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log("PAYMENT MANAGER ADDRESS");
        console.log(response);
        jcPaymentManagerAddress = response;
        jcPaymentManagerContract = getContract(
          iJCPaymentManagerAbi,
          jcPaymentManagerAddress
        );
        console.log("PAYMENT_MANAGER");
        console.log(jcPaymentManagerContract);
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  if (requiredContracts.includes("JOBCRYPT_CORE")) {
    openRegistryContract.methods
      .getAddress("RESERVED_JOBCRYPT_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        jcJobCryptAddress = response;
        jcJobCryptContract = getContract(iJCJobCryptAbi, jcJobCryptAddress);
        console.log("JOBCRYPT_CORE");
        console.log(jcJobCryptContract);
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  if (requiredContracts.includes("FACTORY_FACADE")) {
    openRegistryContract.methods
      .getAddress("RESERVED_JOBCRYPT_FACTORY_FACADE_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        jcFactoryFacadeAddress = response;
        console.log(iJCFactoryFacadeAbi);
        jcFactoryFacadeContract = getContract(
          iJCFactoryFacadeAbi,
          jcFactoryFacadeAddress
        );
        console.log("FACTORY_FACADE");
        console.log(jcFactoryFacadeContract);
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (requiredContracts.includes("STAKE_MANAGER")) {
    openRegistryContract.methods
      .getAddress("RESERVED_JOBCRYPT_STAKE_MANAGER_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        jcStakeManagerAddress = response;
        jcStakeManagerContract = getContract(
          iJCStakeManagerAbi,
          jcStakeManagerAddress
        );
        console.log("STAKE_MANAGER");
        console.log(jcStakeManagerContract);
        initStakeValues();
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (requiredContracts.includes("VS_PAYMENT_MANAGER")) {
    openRegistryContract.methods
      .getAddress("RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE")
      .call({ from: account })
      .then(function (response) {
        console.log(response);
        jcVSPaymentManagerAddress = response;
        console.log(iJCVSPaymentManagerAbi);
        jcVSPaymentManagerContract = getContract(
          iJCVSPaymentManagerAbi,
          jcVSPaymentManagerAddress
        );
        console.log(
          "RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE"
        );
        console.log(jcVSPaymentManagerContract);
        loadCount++;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

var stakeCurrencyAddress;
var stakeCurrencySymbol;
var minStakeAmount;
var stakeCurrencySymbol;
var stakeErc20CurrencyContract;

async function initStakeValues() {
  getStakeErc20Currency();
}

async function getStakeErc20Currency() {
  console.log(jcStakeManagerContract);
  jcStakeManagerContract.methods
    .getStakeErc20Address()
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      stakeCurrencyAddress = response;
      stakeErc20CurrencyContract = new web3.eth.Contract(
        ierc20MetadataAbi,
        stakeCurrencyAddress
      );
      getStakeCurrencySymbol();
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function getStakeCurrencySymbol() {
  stakeErc20CurrencyContract.methods
    .symbol()
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      stakeCurrencySymbol = response;
      getMinStakeAmount();
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function getMinStakeAmount() {
  console.log(jcStakeManagerContract);
  jcStakeManagerContract.methods
    .getMinimumStakeAmount()
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      minStakeAmount = response;
      console.log("minStakeAmount" + minStakeAmount);
      getStakeStatus();
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function getStakeStatus() {
  console.log(jcStakeManagerContract);
  jcStakeManagerContract.methods
    .isStaked(account)
    .call({ from: account })
    .then(function (response) {
      console.log("checking stake");
      var stakeApproveSpan = ge("stake_approve_span");
      stakeApproveSpan.innerHTML = "";
      console.log(stakeApproveSpan);
      var stakeButtonSpan = ge("stake_button_span");
      console.log(stakeButtonSpan);
      var stakeStatusSpan = ge("stake_status_span");
      stakeStatusSpan.innerHTML = "";
      console.log(stakeStatusSpan);
      console.log(response);
      var staked = response;
      stakeButtonSpan.innerHTML = "";
      var small = ce("small");
      if (staked === true) {
        var font = ce("font");
        font.setAttribute("color", "green");
        var a = ce("a");
        a.setAttribute("type", "submit");
        a.setAttribute("id", "unstake_button");
        a.setAttribute("onclick", "unstake()");
        a.setAttribute(
          "class",
          "ui-component-button ui-component-button-small"
        );
        a.setAttribute("style", "color:green");
        a.append(text("Un-stake"));
        font.append(a);
        small.append(font);
        stakeButtonSpan.append(font);

        getStakedAmount();
        stakeApproveSpan.innerHTML = "";
      } else {
        var font = ce("font");
        font.setAttribute("color", "red");
        font.append(text("  Approve FIRST to Stake"));
        small.append(font);
        stakeButtonSpan.append(small);
        var b = ce("b");
        var bFont = ce("font");
        bFont.setAttribute("color", "red");
        var i = ce("i");
        i.setAttribute("class", "bx bx:lock-open-alt");
        bFont.append(i);
        bFont.append(
          text(
            "NOT STAKED - To Apply for jobs, please Stake :: " +
              formatCurrency(minStakeAmount) +
              " " +
              stakeCurrencySymbol
          )
        );
        b.append(bFont);
        stakeStatusSpan.append(b);
        var aSmall = ce("small");
        var aA = ce("a");
        aA.setAttribute("type", "submit");
        aA.setAttribute("id", "stake_approve_button");
        aA.setAttribute("onclick", "approveStake()");
        aA.setAttribute("class", "btn btn-outline-primary");
        var aFont = ce("font");

        aFont.append(
          text(
            "Approve " +
              formatCurrency(minStakeAmount) +
              " " +
              stakeCurrencySymbol
          )
        );
        aA.append(aFont);
        aSmall.append(aA);
        stakeApproveSpan.append(aSmall);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function getStakedAmount() {
  console.log(jcStakeManagerContract);
  jcStakeManagerContract.methods
    .getStakedAmount()
    .call({ from: account })
    .then(function (response) {
      console.log(response);
      var stakeStatusSpan = ge("stake_status_span");
      stakeStatusSpan.innerHTML =
        '<b><font color="green"><i class="bx bx:lock-alt"></i> STAKED (' +
        formatCurrency(response) +
        " " +
        stakeCurrencySymbol +
        ")</font> </b>";
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function approveStake() {
  jcStakeManagerContract.methods
    .getStakeErc20Address()
    .call({ from: account })
    .then(function (response) {
      console.log("Stake Currency " + response);
      stakeCurrencyAddress = response;
      var stakeCurrencyContract = new web3.eth.Contract(
        ierc20MetadataAbi,
        stakeCurrencyAddress
      );
      stakeCurrencyContract.methods
        .approve(jcStakeManagerAddress, minStakeAmount)
        .send({ from: account })
        .then(function (response) {
          var stakeApproveSpan = ge("stake_approve_span");
          var stakeButtonSpan = ge("stake_button_span");
          console.log(response);
          stakeApproveSpan.innerHTML = "<small>Approved NOW Stake</small>";
          stakeButtonSpan.innerHTML =
            '<small><a type="submit" id="stake_button" onclick="stake()" class="btn btn-outline-success">Stake</a></small></span>';
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function stake() {
  jcStakeManagerContract.methods
    .stake(minStakeAmount)
    .send({ from: account })
    .then(function (response) {
      console.log(response);
      var stakeStatusSpan = ge("stake_status_span");
      stakeStatusSpan.innerHTML =
        '<small style="color:green"> STAKED ○ ' +
        formatCurrency(response) +
        "</small>";
      getStakeStatus();
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function unstake() {
  jcStakeManagerContract.methods
    .unstake()
    .send({ from: account })
    .then(function (response) {
      console.log(response);
      var stakeStatusSpan = ge("stake_status_span");
      stakeStatusSpan.innerHTML =
        '<small style="color:orange"> UNSTAKED ○ ' +
        formatCurrency(response) +
        "</small>";
      getStakeStatus();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function ce(element) {
  return document.createElement(element);
}

function text(txt) {
  return document.createTextNode(txt);
}

function ge(id) {
  return document.getElementById(id);
}

function formatCurrency(number) {
  return number / 1e6;
}

function getContract(abi, address) {
  return new web3.eth.Contract(abi, address);
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

function encryptJSON(data) {
  // Encrypt
  var encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();
  return encrypted;
}

function decryptJSON(data) {
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(data, "secret key 123");
  var decrypted = SON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
}

function getSeparatedList(list) {
  var separatedValues = "";
  var split = list.split(" ");
  for (var x = 0; x < split.length; x++) {
    separatedValues += split[x] + " | ";
  }
  return separatedValues;
}

function getTimeSincePosting(dateSeconds) {
  return "6 hours";
}

function createTextButton(functionDestination, buttonText) {
  var link = document.createElement("a");
  link.setAttribute("onclick", functionDestination);
  link.setAttribute("style", "color: rgb(18, 22, 236);");
  var bt = document.createTextNode(buttonText);
  link.appendChild(bt);
  return link;
}

function createLink(linkDestination, linkText) {
  var link = document.createElement("a");
  link.setAttribute("href", linkDestination);
  linkText = document.createTextNode(linkText);
  link.appendChild(linkText);
  return link;
}

function getTextNode(str) {
  return document.createTextNode(str);
}

function clearSelect(select) {
  var len = select.childNodes.length;
  for (var x = 0; x < len; x++) {
    select.remove(0);
  }
}

function clearTableNoHeader(table) {
  var len = table.childNodes.length;
  for (var x = 0; x < len; x++) {
    table.remove(0);
  }
}
